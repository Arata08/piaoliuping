<template>
	<view class="container">
		<!--由远到近5个层次星空-->
		<div class="layer1"></div>
		<div class="layer2"></div>
		<div class="layer3"></div>
		<div class="layer4"></div>
		<div class="layer5"></div>
		<div class="meteor"></div>
		<view class="list-item" v-for="(item,index) in msgList" :key="index" @click="connect(item,index)">
			<view class="avatar" @click.stop="showModal(item)">
				<view class="round" v-if="item.read"></view>
				<image :src="item.avatar" mode="widthFix"></image>
			</view>
			<view class="content">
				<view class="title">
					<text class="name">{{ item.nickName }}</text>
					<text class="time">{{ item.saveTime }}</text>
				</view>
				<view class="txt">{{ item.lastMsg }}</view>
			</view>
		</view>
		<UserInfoModal :userInfo="selectedUser" :visible="isModalVisible" @close="closeModal"
			:windowWidth="windowWidth" />
	</view>
</template>

<script>
	import UserInfoModal from '@/components/user-detail/user-detail'
	import webSocketManager from '@/common/websocketManager'
	import config from "@/common/config";
	import {
		getOfflineMessageList,
		getUserInfo,
    delOfflineMessage,
    getOffChatList,
    delOffChatList
	} from "@/common/api/piaoliupingApi";
  import EventBus from '@/common/utils/eventBus';//事件总线

	export default {
		components: {
			UserInfoModal
		},
		data() {
			return {
				msgList: [],
				selectedUser: {},
				isModalVisible: false,
				windowWidth: 0,
				socket: null,
        get: true,
			};
		},
    onLoad() {
        this.msgList = uni.getStorageSync("msgList") || [];
        webSocketManager.connectWebSocket();
        EventBus.on('updateMsgList', this.updateMsgList); // 在组件创建时监听消息更新事件
        EventBus.on('updateReadStatus', this.updateReadStatus); // 监听 read 状态更新事件
    },
    onUnload() {
        webSocketManager.closeWebSocket(); // 使用 WebSocketManager 的方法关闭连接
        document.removeEventListener('keydown', this.handleKeydown);
        EventBus.off('updateMsgList', this.updateMsgList); // 在组件销毁时移除事件监听
        EventBus.off('updateReadStatus', this.updateReadStatus); // 移除 read 状态更新事件监听
    },
		onShow() {
			if (!uni.getStorageSync('User')) {
				//返回主页
				uni.switchTab({
					url: '/pages/index/index',
				});
			} else {
				this.windowWidth = uni.getSystemInfoSync().windowWidth * 0.8;
        //获取离线消息列表
        if (this.get){
          this.getOfflineMessage();
          this.getOffChatList();
          this.get = false;
        }
			}
		},
		methods: {
      //获取更新聊天记录
      getOffChatList() {
        getOffChatList().then(res => {
          let data = JSON.parse(res.data);
          // 遍历消息列表:"data":"{\"28\":[{\"content\":\"1\",\"createdAt\":1742040288069,\"type\":\"text\"},{\"content\":\"2\",\"createdAt\":1742040953982,\"type\":\"text\"},{\"content\":\"32\",\"createdAt\":1742040957991,\"type\":\"text\"},{\"content\":\"32\",\"createdAt\":1742041440075,\"type\":\"text\"},{\"content\":\"5\",\"createdAt\":1742041507898,\"type\":\"text\"},{\"content\":\"0\",\"createdAt\":1742041839319,\"type\":\"text\"}]}放入本地缓存
          for (let key in data) {
            let chatList = uni.getStorageSync('chatList'+key) || [];
            for (let i = 0; i < data[key].length; i++){
              let chatData = {
                content: data[key][i].content,
                type: data[key][i].type,
                userType: 'friend',
                read: 0
              };
              if(data[key][i].type === 'voice'){
                chatData.duration = data[key][i].duration;
                chatData.audioSrc = chatData.content
                chatData.content = '语音 '+chatData.duration+"''"
              }
              chatList.push(chatData);
              uni.setStorageSync('chatList'+key, chatList);
              delOffChatList();
            }
          }
        })
			},
			updateMsgList(data) {
				let res = JSON.parse(data);
				let id = res.senderId;
				let msgList = this.msgList
        let chatList = uni.getStorageSync('chatList'+id) || [];
        let chatData = {
          content: res.content,
          type: res.type,
          userType: 'friend',
          read: 0
        };
				// 遍历判断消息中是否已经有该用户的聊天记录
				let found = false;
        let saveTime = this.getSaveTime(new Date());
        let lastMsg;
        if (res.type === 'image'){
          lastMsg = '[图片]';
        }else if(res.type === 'voice'){
          lastMsg = '[语音 '+res.duration+']';
          chatData.duration = res.duration;
          chatData.audioSrc = chatData.content
          chatData.content = '语音 '+chatData.duration+"''"
        }else{
          lastMsg = res.content;
        }
				for (let i = 0; i < msgList.length; i++) {
					if (msgList[i].id === id) {
						//如果有就直接更新新消息和未读状态
						msgList[i].read = 1;
						msgList[i].lastMsg = lastMsg;
						msgList[i].saveTime = saveTime;
						found = true;
						break;
					}
				}
				if (!found) {
					// 如果没有找到该用户的聊天记录，则获取用户信息
          this.setUserInfoMsgList(id, saveTime, lastMsg);
				}
        this.msgList = msgList;
        chatList.push(chatData);
        uni.setStorageSync('chatList'+id, chatList);
        // 发布事件通知 message.vue 刷新聊天记录
        EventBus.emit('refreshChatList', id);
			},
      getOfflineMessage() {
        console.log('getOfflineMessage');
        getOfflineMessageList().then(data => {
          let jsonData = JSON.parse(data.data);
          let map = new Map(Object.entries(jsonData));
          if (this.msgList.length===0){
            this.msgList.unshift({
              id: 1,
              nickName: '漂流瓶',
              avatar: 'https://free4.yunpng.top/2024/12/02/674d2d2380346.png',
              lastMsg: '欢迎使用小程序！',
              saveTime: 'forever',
              read: 1,
            });
          }
          // 遍历 map 更新或添加聊天记录
          map.forEach((value, key) => {
            let saveTime = this.getSaveTime(value.createdAt);
            let lastMsg;
            if (value.type === 'image') {
              lastMsg = '[图片]';
            }else if(value.type === 'voice'){
              lastMsg = '[语音 '+value.duration+'秒]';
            }else{
              lastMsg = value.content;
            }
            // 查找 msgList 中是否存在该用户的聊天记录
            let index = this.msgList.findIndex(item => item.id === key);
            if (index !== -1) {
              // 如果存在，则更新新消息和未读状态
              this.msgList[index].read = 1;
              this.msgList[index].lastMsg = lastMsg;
              this.msgList[index].saveTime = saveTime;
              uni.setStorageSync('msgList', this.msgList);
              delOfflineMessage();
            } else {
              // 如果不存在，则获取用户信息并添加新的聊天记录
              this.setUserInfoMsgList(key, saveTime, lastMsg);
              //删除redis中的离线记录
              delOfflineMessage();
            }
          });
        });
      },
			updateReadStatus(friendId) {
        console.log('updateReadStatus', friendId);
            let msgList = this.msgList;
            for (let i = 0; i < msgList.length; i++) {
                if (msgList[i].id === friendId) {
                    msgList[i].read = 0;
                    break;
                }
            }
            uni.setStorageSync('msgList', msgList);
            this.msgList = msgList;
        },
			connect(item, index) {
				this.msgList[index].read = 0;
				uni.setStorageSync("msgList", this.msgList);
				uni.navigateTo({
					url: `/pages/message/message?nickName=${item.nickName}&avatar=${item.avatar}&friendId=${item.id}`
				});
			},
			showModal(user) {
        getUserInfo(user.id).then(data => {
          if (data.code !== 200) {
            uni.showToast({
              title: data.msg,
              icon: 'none',
              duration: 2000,
            });
            return;
          }
          let user1 = data.data;
          let offline;
          if (user1.offlineTime===0){
            offline = "在线"
          }else{
            //根据时间戳user.offlineTime（单位为毫秒）计算多久前在线offline
            let offlineTime = new Date().getTime() - user1.offlineTime;
            if (offlineTime < 60 * 1000) {
              offline = "刚刚在线";
            } else if (offlineTime < 60 * 60 * 1000) {
              offline = Math.floor(offlineTime / (60 * 1000)) + "分钟前在线";
            } else if (offlineTime < 24 * 60 * 60 * 1000) {
              offline = Math.floor(offlineTime / (60 * 60 * 1000))+ "小时前在线";
            }
          }
          user.offline = offline;
          user.createTime = user1.createTime;
					user.avatar = config.staticUrl + user1.avatar;
					user.address = user1.city + ' ' + user1.area;
        });
				this.selectedUser = user;
				this.isModalVisible = true;
			},
			closeModal() {
				this.isModalVisible = false;
			},
			handleKeydown(event) {
				if (event.key === 'Escape') {
					this.closeModal();
				}
			},
			getSaveTime(data) {
				let date = new Date(data);
				return (date.getMonth() + 1) + '月' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() +
					':' + date.getSeconds();
			},
      setUserInfoMsgList(id, saveTime, lastMsg){
        getUserInfo(id).then(data => {
          if (data.code !== 200) {
            uni.showToast({
              title: data.msg,
              icon: 'none',
              duration: 2000,
            });
            return;
          }
          let user = data.data;
          this.msgList.unshift({
            id: id,
            nickName: user.nickName,
            avatar: config.staticUrl + user.avatar,
            lastMsg: lastMsg,
            saveTime: saveTime,
            read: 1
          });
          uni.setStorageSync('msgList', this.msgList);
        });
		  },
    }
  }
</script>


<style>
	page {
		height: 100%;
		width: 100%;
		background: linear-gradient(180deg, #000000 5%, #a3a3a3 50.06%, #000000 95%);
		background-attachment: fixed;
	}
</style>

<style lang="scss" scoped>
	.icon-con {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 5px 10px;
	}

	.icon {
		width: 60px;
		height: 60px;
	}

	.icon-item {
		display: flex;
		flex-direction: column;
	}

	.container {
		padding: 0 32rpx;
		color: #DCA51D;
	}

	//背景------------------------------------------------
	//根据数量来生成shadows
	@function getShadows($n) {
		//每一个shadow对应一个小星星
		$shadows: unquote('#{random(100)}vw #{random(100)}vh #fff');

		@for $i from 2 through $n {
			$shadows: '#{$shadows}, #{random(100)}vw #{random(100)}vh #fff';
		}

		//去掉逗号
		@return unquote($shadows)
	}

	$duration: 400s; //小星星运动的动画时间
	$count: 600; //每层星空的小星星数，为保证性能，这里建议设置不超过1000

	//通过for循环来生成5层星空
	@for $i from 1 through 5 {
		$duration: $duration / 2; //离屏幕越近，运动越快
		$count: floor($count / $i); //离屏幕越近，星星数越少

		.layer#{$i} {
			$size: #{$i}px; //离屏幕越近星星越大
			position: fixed;
			width: $size;
			height: $size;
			border-radius: 50%;
			left: 0;
			top: 0;
			//通过多个shadow来达到生层本层星空星星
			box-shadow: getShadows($count);
			animation: moveUp $duration linear infinite;

			//通过伪类在屏幕下方放置一个一样的星空层，防止循环播放的时候闪屏
			&::after {
				content: '';
				position: fixed;
				left: 0;
				top: 100vh;
				border-radius: inherit;
				width: inherit;
				height: inherit;
				box-shadow: inherit;
			}
		}
	}

	//星星向上运动动画
	@keyframes moveUp {
		to {
			transform: translateY(-100vh);
		}
	}

	$color: orange;

	//流星拖尾
	.meteor {
		width: 3px;
		height: 36px;
		background: linear-gradient(0deg, $color 0, transparent 100%);
		position: absolute;
		top: 70px;
		transform: rotate(45deg);
		right: 70px;
		opacity: 0;
		animation: streak 2s linear infinite;

		//伪类实现发光头部
		&::after {
			content: "";
			position: absolute;
			width: 6px;
			height: 6px;
			border-radius: 50%;
			background: $color;
			filter: blur(1.8px);
			box-shadow: 0px -1px -1px 5px transparent;
			bottom: -4px;
			left: 50%;
			transform: translate(-50%);
		}
	}

	@keyframes streak {
		0% {
			transform: rotate(50deg) translateY(-100px) scale(0.5);
			opacity: 0;
		}

		70% {
			opacity: 1;
			transform: rotate(50deg) translateY(120px) scale(1.1);
		}

		100% {
			transform: rotate(50deg) translateY(220px) scale(0.5);
			opacity: 0;
		}
	}

	//----------------------end
	@keyframes flowCss {
		0% {
			background-position: 0 0;
		}

		100% {
			background-position: -400% 0;
		}
	}

	.list-item {
		display: flex;
		padding: 30rpx 0;
		border-bottom: 1px none #f7f8f9;

		.avatar {
			width: 90rpx;
			height: 90rpx;
			border-radius: 10rpx;
			margin-right: 20rpx;
			position: relative;

			.round {
				position: absolute;
				width: 14rpx;
				height: 14rpx;
				border-radius: 50%;
				background: #ef5656;
				top: -4rpx;
				right: -4rpx;
				z-index: 1;
			}

			image {
				width: 100%;
				height: 100%;
				border-radius: 10rpx;
			}
		}

		.content {
			flex: 1;

			.title {
				display: flex;
				justify-content: space-between;

				.name {
					font-weight: bold;
				}

				.time {
					color: #55aaff;
					font-size: 24rpx;
				}
			}

			.txt {
				margin-top: 10rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				text-align: left;
				color: #FFFFFF;
				font-size: 26rpx;
			}
		}
	}
</style>
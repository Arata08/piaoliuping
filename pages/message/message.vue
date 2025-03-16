<template>
		<div class="layer2"></div>
		<div class="layer3"></div>
		<div class="layer4"></div>
		<div class="layer5"></div>
		<div class="meteor"></div>
		<scroll-view class="scroll-view" scroll-y scroll-with-animation :scroll-top="top">
			<view style="padding: 30rpx 30rpx 240rpx;">
				<view class="message" :class="[item.userType]" v-for="(item,index) in list" :key="index"
					@click="msgClick(item)">
					<image :src="this[item.userType]" v-if="item.userType === 'friend'" class="avatar" mode="widthFix"></image>
					<view class="content" v-if="item.type === 'image'">
						<image :src="item.content" mode="widthFix"></image>
					</view>
          <view v-else>
            <!--未读状态-->
            <view v-show="!item.read && item.userType === 'self'">
              <text style="color: #dcdcdc;font-size: 10px">未读</text>
            </view>
            <view class="content">
              {{ item.content }}
            </view>
          </view>
					<image :src="this[item.userType]" v-if="item.userType === 'self'" class="avatar" mode="widthFix"></image>
				</view>
			</view>
		</scroll-view>

		<view class="tool">
			<block v-if="type === 'text'">
				<image src="../../static/voice.png" style="margin-top: 8rpx;margin-left: -20rpx;" mode="widthFix" class="left-icon" @click="type='voice'"></image>
				<input type="text" v-model="content" class="input" @confirm="send" />
				<image src="../../static/thumb.png" style="margin-top: 5rpx;margin-left: -10rpx;" mode="widthFix" class="thumb" @click="chooseImage"></image>
			</block>
			<block v-else-if="type === 'voice'">
				<image src="../../static/text.png" style="margin-top: 8rpx;margin-left: -20rpx;" mode="widthFix" class="left-icon" @click="type='text'"></image>
				<text class="voice-crl" @touchstart="touchstart" @touchend="touchend">{{ recordStart ? '松开 发送' : '按住 说话' }}</text>
			</block>
		</view>

		<view v-if="recordStart" class="audio-animation">
			<view class="audio-wave">
				<text class="audio-wave-text" v-for="item in 10" :style="{'animation-delay': `${item/10}s`}"></text>
				<view class="text">松开 发送</view>
			</view>
		</view>
</template>

<script>
	const recorderManager = wx.getRecorderManager()
  import webSocketManager from '@/common/websocketManager'
  import {
    uploadFile
  } from "@/common/api/uploadApi";
  import EventBus from '@/common/utils/eventBus';//事件总线

	export default {
		data() {
			return {
				content: '',
				list: [],
				top: 0,
				type: 'voice', // text 发送文本；voice 发送语音
				recordStart: false,
        friend: '',
        friendId: '',
        self: '',
			};
		},
		onLoad(options) {
			uni.setNavigationBarTitle({
				title: options.nickName
			})
      this.friendId = options.friendId
			this.friend = options.avatar
			this.self = uni.getStorageSync("User").avatar
      this.list = uni.getStorageSync('chatList'+this.friendId) || [];
			this.scrollToBottom()
		},
    created () {
      // 订阅事件
      EventBus.on('refreshChatList', this.refreshChatList);
    },
    beforeUnmount () {
      // 移除事件监听器
      EventBus.off('refreshChatList', this.refreshChatList);
      if (this._innerAudioContext) {
        this._innerAudioContext.stop()
      }
      // 发送事件通知 meslist.vue 更新 read 状态
      EventBus.emit('updateReadStatus', this.friendId);
    },
		methods: {
      refreshChatList(senderId) {
        console.log('refreshChatList', senderId);
        if (senderId === this.friendId) {
          this.list = uni.getStorageSync('chatList' + this.friendId);
          this.scrollToBottom();
        }
      },
			send() {
        let data = {
          websocketType:"chatList",
          content: this.content,
          receiverId: this.friendId,
          senderId: uni.getStorageSync("User").id,
          type: 'text',
        }
				this.list.push({
					content: this.content,
					userType: 'self',
          type: 'text',
          read: false,
				})
        webSocketManager.sendChatMessage(data);
        uni.setStorageSync('chatList'+this.friendId, this.list)
				this.content = ''
				this.scrollToBottom()
				// 模拟对方回复
				setTimeout(() => {
					this.list.push({
						content: '好的',
						userType: 'friend',
						avatar: this.friend
					})
					this.scrollToBottom()
				}, 1500)
			},

			chooseImage() {
				uni.chooseImage({
					success: (res) => {
            console.log(res)
						this.list.push({
							content: res.tempFilePaths[0],
							userType: 'self',
							type: 'image',
							avatar: this.self
						})
            //把图片上传至服务器
            uploadFile(res.tempFilePaths[0])
                .then(response => {
                  let data = {
                    websocketType:"chatList",
                    content: response.data.url,
                    receiverId: this.friendId,
                    senderId: uni.getStorageSync("User").id,
                    type: 'image',
                  }
                  webSocketManager.sendChatMessage(data);
                  console.log('上传成功:', response);
              })
              .catch(error => {
                uni.showToast({
                  title: error.data.msg || '发送失败，请稍后再试',
                  icon: 'error',
                });
              console.error('上传失败:', error);
            });
						this.scrollToBottom()
						// 模拟对方回复
						setTimeout(() => {
							this.list.push({
								content: '风景好漂亮啊~',
								userType: 'friend',
								avatar: this.friend
							})
							this.scrollToBottom()
						}, 1500)
					}
				})
			},

      touchend() {
        if (!this._recordAuth || !this.recordStart) return
        //停止录音
        recorderManager.stop();
        recorderManager.onStop((res) => {
          console.log('结束录音', res)
          const { duration, tempFilePath } = res
          this.recordStart = false

          this.list.push({
            content: tempFilePath,
            userType: 'self',
            avatar: this.self,
            type: 'voice'
          });

          //把语音上传至服务器
          uploadFile(tempFilePath)
              .then(response => {
                let data = {
                  websocketType:"chatList",
                  content: response.data.url,
                  receiverId: this.friendId,
                  senderId: uni.getStorageSync("User").id,
                  duration: Math.round(duration/1000),
                  type: 'voice',
                }
                webSocketManager.sendChatMessage(data);
                uni.setStorageSync('chatList'+this.friendId, this.list)
              })
              .catch(error => {
                uni.showToast({
                  title: error.data.msg || '发送失败，请稍后再试',
                  icon: 'error',
                });
                console.error('上传失败:', error);
              });
          this.scrollToBottom();
        });
      },

			scrollToBottom() {
				this.top = this.list.length * 1000
			},

			msgClick(data) {
				if (data.type === 'voice') {
					if (this._innerAudioContext) {
						this._innerAudioContext.stop()
						this._innerAudioContext.src = data.audioSrc
						this._innerAudioContext.play()
						return
					}
					this.play(data.audioSrc)
				}
			},

			authTips() {
				uni.showModal({
					title: '提示',
					content: '您拒绝了麦克风权限，将导致功能不能正常使用，去设置权限？',
					confirmText: '去设置',
					cancelText: '取消',
					success: (res) => {
						if (res.confirm) {
							uni.openSetting({
								success: (res) => {
									if (res.authSetting['scope.record']) {
										console.log("已授权麦克风");
										this._recordAuth = true
									} else {
										// 未授权
										wx.showModal({
											title: '提示',
											content: '您未授权麦克风，功能将无法使用',
											showCancel: false,
											confirmText: '知道了'
										})
									}
								}
							})
						}
					}
				})
			},

			touchstart() {
				//开始录音
				const _permission = 'scope.record'
				uni.getSetting({
					success: (res) => {
						// 判断是否有相关权限属性
						if (res.authSetting.hasOwnProperty(_permission)) {
							// 属性存在，且为false，用户拒绝过权限
							if (!res.authSetting[_permission]) {
								this.authTips()
							} else {
								// 已授权
								this._recordAuth = true
								// 开始录音
								recorderManager.start()
								recorderManager.onStart(() => {
									this.recordStart = true
								})

								// 错误回调
								recorderManager.onError((res) => {
									console.log('recorder error', res)
									uni.showToast({
										icon: 'none',
										title: '系统出错，请重试'
									})
									this.recordStart = false
								})
							}
						} else {
							// 属性不存在，需要授权
							uni.authorize({
								scope: _permission,
								success: () => {
									// 授权成功
									this._recordAuth = true
								},
								fail: (res) => {
									/**
									 * 104 未授权隐私协议
									 * 用户可能拒绝官方隐私授权弹窗，为了避免过度弹窗打扰用户，开发者再次调用隐私相关接口时，
									 * 若距上次用户拒绝不足10秒，将不再触发弹窗，直接给到开发者用户拒绝隐私授权弹窗的报错
									 */
									if (res.errno === 104) {
										uni.showModal({
											title: '温馨提示',
											content: '您拒绝了隐私协议，请稍后再试',
											confirmText: '知道了',
											showCancel: false,
											success: () => {}
										})
									} else {
										// 用户拒绝授权
										this.authTips()
									}
								}
							})
						}
					}
				})
			},


			//播放声音
			play(src) {
				this._innerAudioContext = wx.createInnerAudioContext()
				this._innerAudioContext.src = src
				this._innerAudioContext.play()
				this._innerAudioContext.onPlay(() => {
					console.log('开始播放')
				})
				this._innerAudioContext.onEnded(() => {
					// 播放完毕，清除音频链接
					console.log('播放完毕');
				})
				this._innerAudioContext.onError((res) => {
					console.log('audio play error', res)
				})
			},
		},
  }
</script>

<style>
	page {
		height: 100%;
		width: 100%;
		background: linear-gradient(180deg,#000000 5%,#45333B 53%,#000000 95%); 
		background-attachment: fixed;
	}
</style>
<style lang="scss" scoped>
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
	.scroll-view {
		/* #ifdef H5 */
		height: calc(100vh - 44px);
		/* #endif */
		/* #ifndef H5 */
		height: 100vh;
		/* #endif */
		box-sizing: border-box;
	}

	.message {
		display: flex;
		align-items: flex-start;
		margin-bottom: 30rpx;

		.avatar {
			width: 80rpx;
			height: 80rpx;
			border-radius: 10rpx;
			margin-right: 30rpx;
		}

		.content {
			min-height: 80rpx;
			max-width: 60vw;
			box-sizing: border-box;
			font-size: 28rpx;
			line-height: 1.3;
			padding: 20rpx;
			border-radius: 10rpx;
			background: #fff;

			image {
				width: 200rpx;
			}
		}

		&.self {
			justify-content: flex-end;

			.avatar {
				margin: 0 0 0 30rpx;
			}

			.content {
				position: relative;

				&::after {
					position: absolute;
					content: '';
					width: 0;
					height: 0;
					border: 16rpx solid transparent;
					border-left: 16rpx solid #fff;
					right: -28rpx;
					top: 24rpx;
				}
			}
		}

		&.friend {
			.content {
				position: relative;

				&::after {
					position: absolute;
					content: '';
					width: 0;
					height: 0;
					border: 16rpx solid transparent;
					border-right: 16rpx solid #fff;
					left: -28rpx;
					top: 24rpx;
				}
			}
		}
	}

	.tool {
		position: fixed;
		width: 100%;
		min-height: 120rpx;
		left: 0;
		bottom: 0;
		background: #000000;
		display: flex;
		align-items: flex-start;
		box-sizing: border-box;
		padding: 20rpx 24rpx 20rpx 40rpx;
		padding-bottom: calc(20rpx + constant(safe-area-inset-bottom)/2) !important;
		padding-bottom: calc(20rpx + env(safe-area-inset-bottom)/2) !important;
		.left-icon {
			width: 56rpx;
			height: 56rpx;
			margin-right: 10rpx;
		}

		.input,
		.voice-crl {
			background: #eee;
			border-radius: 10rpx;
			height: 70rpx;
			margin-right: 30rpx;
			flex: 1;
			padding: 0 20rpx;
			box-sizing: border-box;
			font-size: 28rpx;
		}

		.thumb {
			width: 64rpx;
			height: 64rpx;
		}

		.voice-crl {
			text-align: center;
			line-height: 70rpx;
			font-weight: bold;
		}
	}

	.audio-animation {
		position: fixed;
		// width: 100vw;
		// height: 100vh;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 202410;
		display: flex;
		justify-content: center;
		align-items: center;
		
		.text {
			text-align: center;
			font-size: 28rpx;
			color: #333;
			margin-top: 60rpx;
		}

		.audio-wave {
			padding: 50rpx;

			.audio-wave-text {
				background-color: blue;
				width: 7rpx;
				height: 12rpx;
				margin: 0 6rpx;
				border-radius: 5rpx;
				display: inline-block;
				border: none;
				animation: wave 0.25s ease-in-out;
				animation-iteration-count: infinite;
				animation-direction: alternate;
			}

			/*  声波动画  */
			@keyframes wave {
				from {
					transform: scaleY(1);
				}

				to {
					transform: scaleY(4);
				}
			}
		}
	}
</style>
<template>
	<view class="container">
		<view class="item">
			<view class="avatar">
				<nut-avatar size="large">
					<img :src="staticUrl+letter.avatar" mode="aspectFill" />
				</nut-avatar>
			</view>
			<view class="info">
				<view class="text userdata">
					<view class="nickname">{{ letter.nickName }}</view>
					<nut-tag class="gender-age" :type="(letter.sex==='male' ? 'primary' : 'warning')" round>
						<nut-icon :name="'/static/images/' + letter.sex + '.png'" color="white" />
						{{ letter.age }}
					</nut-tag>
					<image :src="'/static/mailbox/LV' + letter.level +'.png'" style="height: 14px;width: 30px;margin-left: 2px;">
					</image>
				</view>
				<view class="text datetime">{{ letter.creatTime }}</view>
			</view>
			<nut-button @click="reportUser()" custom-color="#410b06">举报</nut-button>
		</view>
		<view class="textCon">
			<text style="color: aliceblue;">{{ letter.content }}</text>
			<image v-if="letter.imagePath" style="height: 250px;margin-top: 5px;" 
			mode="aspectFit" :src="letter.imagePath" @click="preImage()"></image>
		</view>
		<view class="bottomCon">
			<view style="padding: 5px;color: #00aaff;border-radius: 15px;background-color: #444444;font-size: 25rpx;">
				圈子：{{letter.subject}}
			</view>
			<view style="display: flex;flex-direction: row;margin-top: 10rpx;">
				<view>
					<nut-icon name="locationg3" custom-color="#fa2c19"></nut-icon>
				</view>
				<text style="color: azure;">
					{{letter.city}}
				</text>
			</view>
			<nut-button size="normal" @click="conect()" custom-color="#7232dd" v-if="!isMine">私聊</nut-button>
		</view>
	</view>
	<CComment ref="ccRef" v-model:myInfo="myInfo" v-model:userInfo="userInfo" v-model:tableData="tableData"
		v-model:tableTotal="tableTotal" :deleteMode="deleteMode" :letterId="letter.id" @likeFun="likeFun" @replyFun="replyFun"
		@deleteFun="deleteFun"></CComment>
	<view class="btn" @tap="openComment">发表新评论</view>
	<view style="height: 60rpx"></view>
</template>
<script setup>
	import {
		getCommentCount,
		getCommentList,
		getLetterById,
		deleteComment,
		updateCommentState
	} from '@/common/api/piaoliupingApi.js'
	import {
		staticUrl
	} from "@/common/config";
	import CComment from "@/components/cc-comment/cc-comment.vue";
	import {
		ref,
	} from "vue";
	import {
		onLoad
	} from '@dcloudio/uni-app';

	// 唤起新评论弹框
	let ccRef = ref(null);

	function openComment() {
		ccRef.value.newCommentFun();
	}

	// 点赞回调事件
	function likeFun({
		params
	}, callback) {
		console.log("likeFun", params);
		// 当请求失败, 调用callback重置点赞效果;
		// Demo如下:
		// axios.post("http://xxx/like", { id: params }).then((res) => {
		//   if (res.code !== 0) {
		//     callback(res);
		//   }
		// });
	}

	// 评论回调事件
	function replyFun({
		params
	}, callback) {
		console.log("replyFun", params);
		// 当请求成功, 调用callback执行评论插入;
		// Demo如下:
		// axios.post("http://xxx/reply", { ...params }).then((res) => {
		//   if (res.code === 0) {
		//     callback(res);
		//   }
		// });
		const res = {
			id: params.id
		}; // 很重要的回参! 必须拿到后端返回评论id! 删除需要!
		setTimeout(() => callback(res), 500); // 目前为了展示效果, 直接执行callback
	}

	/** 删除回调事件
	 * mode 删除模式
	 * -- bind: 当被删除的一级评论存在回复评论, 那么该用户评论内容变更显示为[当前用户评论内容已被移除]
	 * -- only: 仅删除当前评论(后端删除相关联的回复评论, 否则总数显示不对)
	 * -- all : 删除所有评论包括回复评论
	 */
	const deleteMode = ref("bind");

	function deleteFun({
		params,
		mode
	}, callback) {
		console.log("deleteFun", {
			params,
			mode
		});
		// 当请求成功, 调用callback执行评论删除;
		// Demo如下:
		// axios.post("http://xxx/delete", { ids: params, mode }).then((res) => {
		//   if (res.code === 0) {
		//     callback(res);
		//   }
		// });
		switch (mode) {
			case "bind":
				// 逻辑: 调用接口进行用户评论内容修改 update
				console.log(params);
				updateCommentState(params[0]).then(res => {
					if (res.code === 200) {
						callback();
					}
				})
				setTimeout(() => callback(), 500); // 目前为了展示效果, 直接执行callback
				break;
			case "only":
				// 逻辑: 调用接口删除一个评论 delete
				setTimeout(() => callback(), 500); // 目前为了展示效果, 直接执行callback
				break;
			default:
				// all
				// 逻辑: 调用接口删除多个评论 [delete]
				setTimeout(() => callback(), 500); // 目前为了展示效果, 直接执行callback
				break;
		}
	}

	// ----模拟数据------模拟数据------模拟数据----
	// 当前登录用户信息(提示: 一般来自localstorage, 如果是实时获取的话, 那么获取到数据后再v-if显示评论组件)
	let myInfo = ref({
		user_id: 1, // 用户id
		user_name: "cc", // 用户名
		user_avatar: "https://img0.baidu.com/it/u=2836960144,3650263035&fm=253&fmt=auto&app=138&f=JPEG?w=474&h=474", // 用户头像地址
	});
	// 文章作者信息(提示: 一般来自localstorage, 如果是实时获取的话, 那么获取到数据后再v-if显示评论组件)
	let userInfo = ref({
		user_id: 2, // 用户id
		user_name: "ikun", // 用户名
		user_avatar: "https://pic1.zhimg.com/80/v2-a79071a705f55c5d88f6c74e6111fe84_720w.webp", // 用户头像地址
	});
	let tableTotal = ref(0); // 评论总数
	let tableData = ref([]); // 评论表
	const female = "/static/images/female.png";
	const male = "/static/images/male.png";
	const letter = ref({});
	let isMine = ref(false);
const processLetterData = (letterData, user) => {
  letter.value = { ...letterData };
	console.log(letter.value)

  if (letter.value.imagePath) {
    letter.value.imagePath = staticUrl + letter.value.imagePath;
  }

  isMine.value = letter.value.userId === user.id;

  // 设置作者信息
  userInfo.value = {
    user_id: letter.value.userId,
    user_name: letter.value.nickName,
    user_avatar: staticUrl + letter.value.avatar
  };
	console.log(userInfo.value)
};

const fetchCommentData = (letterId) => {
  getCommentCount(letterId).then(res => {
    if (res.code === 200 && res.data > 0) {
      tableTotal.value = res.data;
      getCommentList(letterId).then(resList => {
        if (resList.code === 200) {
          tableData.value = resList.data;
        }
      });
    }
  });
};

onLoad((options) => {
  const user = uni.getStorageSync("User");
  myInfo.value = {
    user_id: user.id,
    user_name: user.nickName,
    user_avatar: staticUrl + user.avatar
  };

  const letterId = options.letterId;

  if (letterId) {
    getLetterById(letterId).then(res => {
      if (res.code === 200) {
        processLetterData(res.data, user);
        fetchCommentData(letter.value.id);
      }
    });
  } else {
    const cachedLetter = uni.getStorageSync('letter');
    processLetterData(cachedLetter, user);
    fetchCommentData(letter.value.id);
  }
});

	function conect() {
		if (!letter.value.avatar.startsWith('http')) {
			uni.navigateTo({
				url: `/pages/message/message?nickName=${letter.value.nickName}&avatar=${staticUrl + letter.value.avatar}&friendId=${letter.value.userId}`
			});
		} else {
			uni.navigateTo({
				url: `/pages/message/message?nickName=${letter.value.nickName}&avatar=${letter.value.avatar}&friendId=${letter.value.userId}`
			});
		}
	}

	function reportUser() {
		uni.navigateTo({
			url: '/pages/message/accusation?userId=' + letter.value.userId + '&nickName=' + letter.value.nickName + '&isL=true',
		});
		emit('close');
	}
	function preImage(){
		uni.previewImage({
				urls: [letter.value.imagePath]
		});
	}
</script>
<style lang="scss" scoped>
	.btn {
		position: fixed;
		/* 固定位置 */
		bottom: 20rpx;
		/* 距离底部的距离 */
		left: 50%;
		/* 水平居中 */
		transform: translateX(-50%);
		/* 水平居中调整 */
		text-align: center;
		color: #fff;
		padding: 20rpx;
		border-radius: 20rpx;
		background-color: #2979ff;
		z-index: 2;
	}

	$space: 8rpx;
	$contentFontSize: 25rpx;

	:root,
	page {
		--nut-tag-height: 15px;
		background-color: #000;
	}

	.container {
		background-color: #000;
		padding: 10px;
		box-shadow: 0px 0px 5px #ccc;
	}

	.item {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.avatar {
		margin: $space * 2;
	}

	.info {
		color: #ffffff;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;

		.text1 {
			color: #808080;
			margin: $space;
		}
	}

	.userdata {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-size: $contentFontSize * 1.2;

		.gender-age {
			margin-left: $space;
		}
	}

	.textCon {
		border-radius: 15px;
		padding: 10px;
		background-color: #1e1e1e;
	}

	.bottomCon {
		margin-top: 10rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
</style>
<!-- UserInfoModal.vue -->
<template>
	<view class="modal" v-if="visible" @click="closeModal">
		<view class="modal-content" @click.stop>
			<view class="user-info" :style="{width:windowWidth+'px'}">
				<image :src="userInfo.avatar" class="avatar" mode="aspectFill"></image>
				<view class="info">
					<text>注册时间：{{userInfo.createTime}}</text>
					<text style="color: #33CCFF;">最近登录：{{userInfo.offline}}</text>
					<text>{{userInfo.address}}</text>
					<text v-if="userInfo.birthday">生日：{{userInfo.birthday}}</text>
				</view>
			</view>
			<view class="actions">
				<button @click="blockUser">拉黑</button>
				<button @click="reportUser">举报</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		black
	} from "@/common/api/piaoliupingApi";
	export default {
		props: {
			userInfo: {
				type: Object,
				required: true
			},
			visible: {
				type: Boolean,
				required: true
			},
			windowWidth: {
				type: Number,
				required: true,
				default: 350,
			}
		},
		data() {
			return {}
		},
		onLoad() {},
		onShow() {
			this.getUser();
			console.log('show');
		},
		methods: {
			blockUser() {
				black(this.userInfo.id).then(res => {
					uni.showToast({
						title: res.data,
						icon: 'none',
						duration: 2000,
					});
				});
				this.$emit('close');
			},
			reportUser() {
				uni.navigateTo({
						url: '/pages/message/accusation?userId=' + this.userInfo.id + '&nickName=' + this.userInfo.nickName,
				});
				this.$emit('close');
			},
			closeModal() {
				this.$emit('close');
			}
		}
	}
</script>
<style scoped>
	.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.modal-content {
		background: #dbdbdbe6;
		padding: 20px;
		border-radius: 10px;
		text-align: center;
	}

	.user-info {
		display: flex;
	}

	.info {
		margin-left: 10px;
		border-radius: 15px;
		border: 1px solid #ccc;
		width: 70%;
		padding: 10px;
		display: flex;
		flex-direction: column;
		color: #ff3b00;
	}

	.avatar {
		width: 70px;
		height: 70px;
		margin-top: 5%;
		border-radius: 50%;
	}

	.actions {
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin-top: 20px;
	}

	button {
		width: 40%;
		margin: 5px;
		padding: 5px 10px;
		border: none;
		border-radius: 20px;
		cursor: pointer;
		font-size: 15px;
	}
</style>
<!-- UserInfoModal.vue -->
<template>
	<view class="modal" v-if="visible" @click="closeModal">
		<view class="modal-content" @click.stop>
			<view class="user-info" :style="{width:windowWidth+'px'}">
				<image :src="userInfo.avatar" class="avatar"></image>
				<view class="info">
					<text class="time-reg">注册时间：2025-01-01</text>
					<text class="time-login">最近登录：一天前</text>
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
		methods: {
			blockUser() {
				console.log('拉黑用户:', this.userInfo.name);
				// 实现拉黑逻辑
				this.$emit('close');
			},
			reportUser() {
				console.log('举报用户:', this.userInfo.name);
				// 实现举报逻辑
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
		background: #e4e4e4e6;
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
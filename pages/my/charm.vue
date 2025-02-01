<template>
	<view class="charge">
		<view style="margin-left: 43%;">
			<text>魅力值</text>
			<br />
			<text>&nbsp;&nbsp;&nbsp;{{charm}}</text>
		</view>
		<view style="margin-top: 15px;">
			<nut-button custom-color="linear-gradient(to right, #ff6ac6, #8b2ce0)" type="primary" size="large"
				@click="goduihuan">兑换星币</nut-button>
			<view style="margin-top: 15px;">
				<nut-button custom-color="linear-gradient(to right, #ff6ac6, #ffff00)" type="primary" size="large"
					@click="gotixian">申请提现</nut-button>
			</view>
		</view>
		<view style="font-size: 12px;margin-top: 10px;margin-left: 76%;" @click="tipsClick">什么是魅力值？</view>
	</view>
	<view class="list-item" v-for="(item,index) in maobi" :key="index">
		<view class="content">
			<view class="title">
				<text class="desc">{{ item.desc }}</text>
				<text class="number">{{ item.number }}</text>
			</view>
			<view class="time">{{ item.time }}</view>
			<view class="divider"></view>
		</view>
	</view>
	<nut-dialog no-cancel-btn title="什么是魅力值?" content="收到其他用户送的礼物可以转化成魅力值，魅力值可以兑换成猫币，也可以提现。" v-model:visible="visible3" />
</template>

<script>
	export default {
		data() {
			return {
				charm: 10,
				maobi: [{
					desc: '兑换',
					time: '2025-01-24 09:14:11',
					number: -1
				}, {
					desc: '体现',
					time: '2025-01-24 09:14:22',
					number: -1
				}, ],
				visible3: false,
			}
		},
		methods: {
			goduihuan() {
				uni.navigateTo({
					url: '/pages/my/duihuan'
				})
			},
			gotixian() {
				uni.navigateTo({
					url: '/pages/my/tixian'
				})
			},
			tipsClick() {
				this.visible3 = true
			},
		}
	}
</script>

<style>
	page {
		background: linear-gradient(180deg, #000000 0%, #8b2ce0 49.98%, #000000 100%);
	}
</style>

<style lang="scss" scoped>
	.charge {
		color: #7bbbff;
		margin: 30rpx;
		padding: 30rpx 30rpx 10rpx 30rpx;
		border-radius: 20px;
		background: linear-gradient(90deg, #FFF1EB 0%, #ACE0F9 100%);
	}

	.list-item {
		display: flex;
		padding: 10rpx 30rpx;

		.content {
			flex: 1;

			.title {
				display: flex;
				justify-content: space-between;

				.desc {
					font-size: 30rpx;
					color: #ffffff;
					font-weight: bold;
				}

				.number {
					color: #55bbff;
					font-size: 35rpx;
				}
			}

			.time {
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				text-align: left;
				color: #e8e8e8;
				font-size: 26rpx;
			}
		}
	}

	/* 分割线 */
	.divider {
		height: 1px;
		background-color: #55ffff;
		margin: 10px 0;
	}
</style>
<template>
	<view class="charge">
		<view style="margin-left: 10%;">
			<text>猫币余额</text>
			<br />
			<text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{balance}}</text>
		</view>
		<view style="margin-left: 50%;margin-top: 3px;">
			<nut-button custom-color="linear-gradient(to right, #aaffff, #15fcff)" type="primary">充值</nut-button>
		</view>
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
</template>

<script>
	export default {
		data() {
			return {
				balance: 10,
				maobi: [{
					desc: 'aaa',
					time: '2025-01-24 09:14:11',
					number: -1
				}, {
					desc: '哈哈哈',
					time: '2025-01-24 09:14:22',
					number: -1
				}, ]
			}
		},
	}
</script>

<style>
	page {
		background: linear-gradient(180deg, #000000 0%, #55557f 49.98%, #000000 100%);
	}
</style>

<style lang="scss" scoped>
	.charge {
		color: #7bbbff;
		display: flex;
		margin: 30rpx;
		padding: 30rpx;
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
	    background-color: #c1fffb;
	    margin: 10px 0;
	}
</style>
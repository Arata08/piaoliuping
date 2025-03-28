<template>
	<div class='tool_box'>
		<!-- 功能栏过多的话使用 scroller 去渲染 增加滚动效果-->
		<block v-for="(item,index) in toolList" :key="index">
			<view class="tool_list" @click="toolItem(item,index)">
				<image class="tool_img" :src="item.img" mode=""></image>
				<text class="tool_text">{{item.name}}</text>
			</view>
		</block>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				toolList: [{
						name: '相册',
						img: '/static/temp/xiangce.png',
						type: 0
					},
					{
						name: '拍摄',
						img: '/static/temp/paishe.png',
						type: 1
					}
				]
			}
		},
		methods: {
			toolItem(item, index) {
				this.$emit('toolItem', item, index)
			}
		}
	}
</script>

<style scoped>
	.tool_box {
		padding-top: 20rpx;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.tool_list {
		align-items: center;
		width: 187.5rpx;
		height: 180rpx;
		margin-bottom: 20rpx;
	}

	.tool_img {
		width: 129rpx;
		height: 128rpx;
		border-radius: 16rpx;
		margin-bottom: 12rpx;
	}

	.tool_text {
		font-size: 24rpx;
		font-weight: 400;
		color: #999999;
		line-height: 33rpx;
	}
</style>

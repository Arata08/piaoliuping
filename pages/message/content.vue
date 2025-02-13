<template>
	<view>
		<view class="u-content">
			<text>{{this.content}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: `我是HTML代码测试
	adada
	adadadd`
			}
		},
		onLoad(option) {
			// let id = option.id
			// let url = "/api/notice/getNotice/"+id;
			// this.$u.get(url).then(res => {
			// 	this.title = res.data.noticeTitle
			// 	this.content = res.data.noticeContent
			// });
		},
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
	}
</style>
<style lang="scss" scoped>
	.u-content {
		margin: 0 10rpx;
		padding: 24rpx;
		font-size: 34rpx;
		color: $uni-color-primary;
		line-height: 1.8;
		white-space: pre-wrap !important;
	}
</style>
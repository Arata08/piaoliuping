<template>
	<view>
		<text style="margin-left: 45%;">{{time}}后关闭</text>
		<image :src="imgUrl" style="height: 200px;" mode='widthFix'></image>
		<txv-video vid='h355723vic1' playerid="txv1" enablePlayGesture enableProgressGesture
			autoPauseIfOpenNative autoPauseIfNavigate show-mute-btn></txv-video>
	</view>
</template>

<script lang="ts">
	let timer: ReturnType<typeof setTimeout> | null = null;
	export default {
		data() {
			return {
				imgUrl: '',
				time: 3
			}
		},
		onLoad: function (option) {
			this.imgUrl = option.url;
			//计时，改变time的值
			timer = setInterval(() => {
				this.time--;
				if (this.time == 0) {
					timer = null;
					// uni.navigateBack({
					// 	delta: 1,
					// })
					clearInterval(timer);
				}
			}, 1000);
		},
		beforeUnmount() {
			clearInterval(timer);
		},
	}
</script>

<style>

</style>

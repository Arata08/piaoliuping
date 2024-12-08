<template>
	<view class="login-box">
		<view class="video-background">
			<video src="https://mp-56351f42-ba58-4baf-bbc7-144b70e6e6eb.cdn.bspapp.com/video/00068.mp4"
				object-fit="cover"
				:autoplay="true" 
				:controls="false" 
				:muted="true" 
				:loop="true" 
				id="videoRef"
				class="video">
			</video>
		</view>
	</view>
	
</template>
 
<script>
	export default {
		data(){
			return {
				VideoContext: {}
			}
		},
		onShow() {
            // 当app切到后台再切回前台的时候会触发onShow这个时候视频应该继续播放，不这样做视频会暂停的
			this.$nextTick(() => {
				this.VideoContext = uni.createVideoContext('videoRef');
				this.VideoContext.play()
			})
		},
	}
</script>
 
<style lang="scss">
	.login-box{
		position: relative;
		height: 100vh;
		overflow: hidden;
		.video-background{
			position: absolute;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			z-index: -1;
			.video{
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
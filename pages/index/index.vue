<template>
	<view class="index-box">
		<view class="video-background">
			<video src="https://lilihouse.oss-cn-hangzhou.aliyuncs.com/%E6%98%9F%E4%BA%911.0.mp4" object-fit="cover" :autoplay="true"
				:controls="false" :muted="true" :loop="true" id="videoRef" class="video">
			</video>
		</view>
		<view class="index">
			<view>缘分天注定,七分靠打拼</view>
			<view>在这里遇到同频的TA</view>
		</view>
    <view class="btns">
      <nut-animate type="jump" :loop="true">
        <image src="/static/index/in.png" style="height: 80px;width: 80px;" @click="toBox()"/>
      </nut-animate>
      <image src="/static/index/see.png" style="height: 100px;width: 114px;margin-top: -80px" @click="onSearch()"/>
      <nut-animate type="ripple" :loop="true">
        <image src="/static/index/out.png" style="height: 80px;width: 80px;" @click="toSend()"/>
      </nut-animate>
    </view>
	</view>
	<nut-popup position="bottom" round v-model:visible="showRound" closeable>
		<view style="text-align: center;margin-top: 60px;margin-bottom: 40px;">
			<login></login>
		</view>
	</nut-popup>
</template>

<script>
	import login from '../../components/login/login.vue'
	import {baseUrl} from "@/common/config";
	export default {
		data() {
			return {
				VideoContext: {},
				tabbarValue: 1,
				tabValue: 0,
				penImage: "/static/images/plus.png",
				star1: "/static/images/star2.png",
				inbox: "/static/images/inbox.png",
				outbox: "/static/images/outbox.png",
				showRound: false
			}
		},
		onLoad() {
			uni.setStorageSync("SystemInfoSync",uni.getSystemInfoSync())
      if (!uni.getStorageSync('token')) {
        this.showRound = true
      }else{
				uni.getLocation({
					type: 'wgs84',
					success: function (res) {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
						uni.request({
							url: baseUrl + '/user/setUserLocation',
								method: 'POST',
								data: {
									latitude: res.latitude,
									longitude: res.longitude,
									userId: uni.getStorageSync('User').id
								},
								header: {
									'token': uni.getStorageSync('token')
								}
						})
					},
					fail: function (err) {
						console.log(err)
					}
				});
			}
			uni.getWindowInfo({
				success: function (res) {
					uni.setStorageSync('windowInfo', res)
				}
			});
		},
		onShow() {
			// 当app切到后台再切回前台的时候会触发onShow这个时候视频应该继续播放，不这样做视频会暂停的
			this.$nextTick(() => {
				this.VideoContext = uni.createVideoContext('videoRef');
				this.VideoContext.play()
			})
		},
		methods: {
			onSearch() {
				uni.showToast({
					title: "搜索中...",
					icon: "loading",
					duration: 2000,
					mask: true,
					success() {
						console.log(1);
					},
				})
			},
			toBox() {
				const url = "/pages/mailbox/mailbox";
				uni.navigateTo({
					url
				})
			},
			toSend() {
				const url = "/pages/send/send";
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss">
	.index-box {
		position: relative;
		height: 100vh;
		overflow: hidden;

		.video-background {
			position: absolute;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			z-index: -1;

			.video {
				width: 100%;
				height: 100%;
			}
		}
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	.rotate {
		animation: spin 2s linear infinite;
	}

	.index {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		height: 70vh;
		width: 100%;
		overflow: hidden;
    margin-top: -100px;
    color: #c497f3;
	}

	.tab {
		width: 100%;
	}

	.tab-bar {
		position: fixed;
		bottom: 0;
		width: 100%;
	}

	.star {
		width: 500rpx;
		height: 500rpx;
	}

	.btns {
		width: 100%;
		text-align: center;
		position: fixed;
		bottom: 100rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		color: var(--nut-dark-color);
	}

	.desc {
		text-align: center;
	}

	.nut-tabbar-item_icon-box_icon .nut-icon__img {
		width: 75rpx;
		height: 75rpx;
	}
</style>
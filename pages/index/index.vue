<template>
	<view class="index-box">
		<view class="video-background">
			<video src="https://47.106.182.219:29382/down/NGVSgxGFyx5t.mp4"
				object-fit="cover"
				:autoplay="true" 
				:controls="false" 
				:muted="true" 
				:loop="true" 
				id="videoRef"
				class="video">
			</video>
		</view>
		<view class="index">
			<view>缘分天注定,七分靠打拼</view>
			<view>在这里遇到同频的TA</view>
			<nut-animate type="ripple" action="click">
				<nut-animate type="jump" :loop="true">
					<image class="star" mode="aspectFill" :src="star4" />
				</nut-animate>
			</nut-animate>
		</view>
		<view class="btns">
			<nut-button type="info" size="mini" class="mail" @click="toBox('inbox')">
				<template #icon>
					<nut-icon :name="inbox"></nut-icon>
				</template>
				收件箱
			</nut-button>
			<nut-animate type="ripple" action="click">
				<nut-animate type="flicker" :loop="true">
					<nut-button type="primary" @click="onSearch">
						<template #icon>
							<nut-icon name="search"></nut-icon>
						</template>
						发现星球故事
					</nut-button>
				</nut-animate>
			</nut-animate>
			<nut-button type="info" size="mini" class="mail" @click="toBox('outbox')">
				<template #icon>
					<nut-icon :name="outbox"></nut-icon>
				</template>
				发件箱
			</nut-button>
		</view>
    </view>
    <nut-tabbar bottom v-model="tabbarValue" @tab-switch="tabSwitch">
        <nut-tabbar-item tab-title="消息">
            <template #icon>
                <nut-icon name="message"></nut-icon>
            </template>
        </nut-tabbar-item>
        <nut-tabbar-item tab-title="" class="plus-image">
            <template #icon>
                <nut-icon :name="penImage" size="100" />
            </template>
        </nut-tabbar-item>
        <nut-tabbar-item tab-title="我的">
            <template #icon>
                <nut-icon name="my2"></nut-icon>
            </template>
        </nut-tabbar-item>
    </nut-tabbar>
</template>

<script>
    export default {
        data() {
            return {
				VideoContext: {},
                tabbarValue: 1,
                tabValue: 0,
                penImage: "/static/images/plus.png",
                star4: "/static/images/star4.png",
                inbox: "/static/images/inbox.png",
                outbox: "/static/images/outbox.png",
            }
        },
        onLoad() {},
		onShow() {
			// 当app切到后台再切回前台的时候会触发onShow这个时候视频应该继续播放，不这样做视频会暂停的
			this.$nextTick(() => {
				this.VideoContext = uni.createVideoContext('videoRef');
				this.VideoContext.play()
			})
		},
        methods: {
            tabSwitch(item, index) {
                let s = this
                const tabUrl = ["/pages/message/message", "/pages/send/send", "/pages/my/my"];
                const url = tabUrl[index];
                uni.navigateTo({
                    url,
                    complete() {
                        s.tabbarValue = 1;
                    },
                });
            },
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
            toBox(name) {
                const url = `/pages/mailbox/mailbox?type=${name}`;
                uni.navigateTo({
                    url
                })
            },
        }
    }
</script>

<style lang="scss">
	.index-box{
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
        bottom: 180rpx;
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
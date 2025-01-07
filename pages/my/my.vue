<template>
    <view class="container">
        <view class="userdata">
            <nut-avatar size="large" class="headimage">
                <img :src="img" />
            </nut-avatar>
            <view class="userinfo">
                <view class="nicknametags">
                    <view class="nickname"> 沧海一舟 </view>
                    <nut-tag type="primary" round>
                        <nut-icon :name="male" color="white" />
                        32
                    </nut-tag>
                    <nut-tag type="primary" round>
                        <nut-icon name="star-fill-n" />
                        11
                    </nut-tag>
                </view>
                <view class="userid"> ID 1234567 </view>
                <view class="progress">
                    <view class="leveltext"> Lv1 </view>
                    <nut-progress percentage="30" :show-text="false" />
                </view>
            </view>
        </view>
        <view class="userext">
            <view class="statics">
                <view class="statitem">
                    <view class="number"> 100 </view>
                    <view class="name"> 星币 </view>
                </view>
                <view class="statitem">
                    <view class="number" style="color: darkorchid;"> 200 </view>
                    <view class="name"> 魅力值 </view>
                </view>
                <view class="statitem" style="color: gold">
                    <view class="number"> 200 </view>
                    <view class="name"> 剩余会员 </view>
                </view>
                <view class="statitem">
                    <view class="number"> 200 </view>
                    <view class="name"> 关注 </view>
                </view>
            </view>
        </view>
        <view class="btns">
            <nut-cell-group>
                <nut-cell title="看广告领奖励" desc="+10猫币" is-link >
					<template #icon>
						<image class="nut-icon" src="../../static/my/奖励.png"></image>
					</template>
				</nut-cell>
                <nut-cell title="每日签到" is-link>
					<template #icon>
						<image class="nut-icon" src="../../static/my/已签到.png"></image>
					</template>
				</nut-cell>
                <nut-cell title="分享给好友" is-link @click="showShare">
					<template #icon>
						<image class="nut-icon" src="../../static/my/分享.png"></image>
					</template>
				</nut-cell>
                <nut-cell title="性别认证" is-link>
					<template #icon>
						<image class="nut-icon" src="../../static/my/性别.png"></image>
					</template>
				</nut-cell>
            </nut-cell-group>
            <nut-cell-group>
                <nut-cell title="实名认证" is-link @click="contactUs">
					<template #icon>
						<image class="nut-icon" src="../../static/my/认证.png"></image>
					</template>
				</nut-cell>
                <nut-cell title="设置" is-link @click="toSettings">
					<template #icon>
						<image class="nut-icon" src="../../static/my/set-up.png"></image>
					</template>
				</nut-cell>
            </nut-cell-group>
			<button type="default" open-type="contact" style="margin-top: 20rpx;background-color: #0B1430;color: #fff">在线咨询</button>
        </view>
    </view>

</template>

<script>
    export default {
        data() {
            return {
                male: "/static/images/male.png",
                img: 'https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png',
            };
        },
        methods: {
            showShare() {},
            contactUs() {
                uni.previewImage({
                    urls: [this.img]
                })
            },
            toSettings() {
                uni.openSetting()
            }
        },
    };
</script>

<style lang="scss">
    $containerPadding: 25rpx;
    $fontSizeSmall: 25rpx;
    $fontSizeBig: 35rpx;
	
:root, page {
	--nut-cell-background: #0e1b41;
	--nut-cell-padding:18px 20px;
	--nut-cell-group-title-color: #ffffff;
}
    .container {
        box-sizing: border-box;
        padding: 0 $containerPadding $containerPadding;
        width: 100%;
        height: 100vh;
        background-image: url("https://free4.yunpng.top/2025/01/04/6778edaf19792.jpg");
  background-size: cover; /* 调整背景图像的大小以覆盖整个容器 */
		color: #ffffff;
    }

    .userdata {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }

    .userinfo {
        flex: 1;
        margin-left: $containerPadding * 2;
        padding-right: 60rpx;
        display: flex;
        flex-direction: column;
        gap: 10rpx;
    }

    .nicknametags {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: $uni-font-size-lg * 1.2;
        gap: 15rpx;

        .nickname {
            font-weight: bold;
            font-size: $fontSizeBig;
        }
    }

    .progress {
        display: flex;
    }

    .progress .nut-progress-outer {
        background-color: rgb(220, 220, 220) !important;
    }

    .leveltext {
        margin-right: 15rpx;
        font-size: $fontSizeSmall;
        color: $uni-color-subtitle;
    }

    .userext {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
        margin-top: 20rpx;
    }

    .statics {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
    }

    .statitem {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .number {
            font-weight: bold;
        }

        .name {
            font-size: $fontSizeSmall;
        }
    }

    .userid {
        font-size: $fontSizeSmall;
        color: $uni-color-subtitle;
    }

    .btns {
        margin-top: 60rpx;
    }
</style>
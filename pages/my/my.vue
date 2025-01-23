<template>
    <view class="container">
        <view class="userdata">
            <nut-avatar size="large" class="headimage">
                <img :src="img" />
            </nut-avatar>
            <view class="userinfo">
                <view class="nicknametags">
                    <view class="nickname"> 我是大帅哥 </view>
                    <nut-tag type="success" round>
                        <nut-icon :name="male" color="white" />
                        32
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
                <nut-cell title="看广告领奖励" desc="+10猫币" is-link>
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
		/* global 94%+ browsers support */
		background: linear-gradient(180deg,#000000 0%,#ACE0F9 49.98%,#000000 100%); 
		
		/* safari 5.1+,chrome 10+ */
		background: -webkit-linear-gradient(180deg,#000000 0%,#ACE0F9 49.98%,#000000 100%);
		
		/* ff 3.6+ */
		background: -moz-linear-gradient(180deg,#000000 0%,#ACE0F9 49.98%,#000000 100%);
		
		/* opera 11.10+ */ 
		background: -o-linear-gradient(180deg,#000000 0%,#ACE0F9 49.98%,#000000 100%);
		
		/* ie 10+ */
		background: -ms-linear-gradient(180deg,#000000 0%,#ACE0F9 49.98%,#000000 100%);
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
        color: #FFFF66;
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
            background: -webkit-linear-gradient(135deg,
                    #0eaf6d,
                    #ff6ac6 25%,
                    #147b96 50%,
                    #e6d205 55%,
                    #2cc4e0 60%,
                    #8b2ce0 80%,
                    #ff6384 95%,
                    #08dfb4);
            /* 文字颜色填充设置为透明 */
            -webkit-text-fill-color: transparent;
            /* 背景裁剪，即让文字使用背景色 */
            -webkit-background-clip: text;
            /* 背景图放大一下，看着柔和一些 */
            -webkit-background-size: 200% 100%;
            /* 应用动画flowCss 12秒速度 无限循环 线性匀速动画*/
            -webkit-animation: flowCss 12s infinite linear;
            font-size: $fontSizeSmall;
        }
        .name:hover {
            -webkit-animation: flowCss 4s infinite linear;
        }
    }

    .userid {
        font-size: $fontSizeSmall;
        color: $uni-color-subtitle;
    }

    .btns {
		color: #EE9613;
		margin-top: 60rpx;
    }


    @keyframes flowCss {
      0% {
        background-position: 0 0;
      }
      100% {
        background-position: -400% 0;
      }
    }
</style>
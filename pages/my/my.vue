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
                    <view class="number"> 200 </view>
                    <view class="name"> 魅力值 </view>
                </view>
            </view>
        </view>
        <view class="btns">
            <nut-cell-group>
                <nut-cell title="看广告领奖励" is-link></nut-cell>
                <nut-cell title="每日签到" is-link></nut-cell>
                <nut-cell title="星币充值" is-link></nut-cell>
            </nut-cell-group>
            <nut-cell-group>
                <nut-cell title="创作人计划" is-link></nut-cell>
                <nut-cell title="推广人计划" is-link></nut-cell>
                <nut-cell title="分享给好友" is-link @click="showShare"></nut-cell>
            </nut-cell-group>
            <nut-cell-group>
                <nut-cell title="联系我们" is-link @click="contactUs"></nut-cell>
            </nut-cell-group>
            <nut-cell-group>
                <nut-cell title="设置" is-link @click="toSettings"></nut-cell>
            </nut-cell-group>
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

    .container {
        box-sizing: border-box;
        padding: 0 $containerPadding $containerPadding;
        width: 100%;
        height: 100vh;
        background: #f7f8fa;
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
            color: $uni-color-subtitle;
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
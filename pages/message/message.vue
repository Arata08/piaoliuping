<template>
    <view class="index">
        <view class="item">
            <view class="avatar">
                <nut-avatar size="large">
                    <img
                        src="https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png" />
                </nut-avatar>
            </view>
            <view class="info">
                <view class="text userdata">
                    <view class="nickname">明月几时有</view>
                    <nut-tag class="gender-age" type="danger" round>
                        <nul-icon :name="male" color="white" />
                        32
                    </nut-tag>
                </view>
                <view class="text content">
                    回复评论: 蜀道之难难于上青天蜀道之难难于上青天蜀道之难难于上青天
                </view>
                <view class="text datetime">12月5日</view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                female: "/static/images/female.png",
                male: "/static/images/male.png",
            }
        },
        methods: {

        }
    }
</script>

<style lang="scss">
    $space: 8rpx;
    $contentFontSize : 25rpx;

    .index {
        box-sizing: border-box;
        padding: $space;
        overflow: hidden;
    }

    .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .avatar {
        margin: $space * 2;
    }

    .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;

        .text {
            margin: $space;
        }
    }

    .userdata {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: $contentFontSize * 1.2;

        .gender-age {
            margin-left: $space;
        }
    }

    .content {
        font-size: $contentFontSize;
        color: #808080;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 550rpx;
    }

    .datetime {
        font-size: $contentFontSize;
        color: #808080;
    }
</style>
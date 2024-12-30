<template>
    <view class="index">
        <nut-form>
            <nut-form-item label="">
                <nut-textarea placeholder="在这里分享你的思绪,心情和秘密" />
            </nut-form-item>
            <nut-form-item label="谁可以看">
                <nut-radio-group direction="horizontal">
                    <nut-radio shape="button" label="1" icon-size="12">
                        不限
                    </nut-radio>
                    <nut-radio shape="button" label="2" icon-size="12">
                        男
                    </nut-radio>
                    <nut-radio shape="button" label="2" icon-size="12">
                        女
                    </nut-radio>
                </nut-radio-group>
            </nut-form-item>

            <nut-form-item label="显示所在城市">
                <nut-switch v-model="checked" />
            </nut-form-item>
            <nut-cell>
                <nut-button size="large" type="primary">
                    发布
                </nut-button>
            </nut-cell>
        </nut-form>
    </view>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        methods: {

        }
    }
</script>

<style lang="scss">
    .index {
        background: #f7f8fa;
        box-sizing: border-box;
        min-height: 100vh;
        overflow-x: hidden;
        overflow-y: auto;
        padding: 0 10px 10px 10px;
    }

    .nut-form-item {
        align-items: baseline;
    }
</style>
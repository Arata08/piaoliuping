<template>
	<view class="container">
		<view style="margin-left: 40%;">
			<text style="color: #8b2ce0;font-size: 25px;">魅力值</text>
			<br />
			<text style="color: #00ffff;font-size: 20px;">&nbsp;&nbsp;&nbsp;&nbsp;{{balance}}</text>
		</view>
		<nut-config-provider theme="dark">
			<nut-form>
				<nut-form-item label="魅力值">
					<nut-input v-model="basicData.meili" class="nut-input-text" placeholder="请输入要兑换的魅力值" type="number"
						@update:model-value="handleMeiliChange" />
				</nut-form-item>
				<nut-form-item label="可兑换星币">
					<nut-input v-model="basicData.xingbi" class="nut-input-text" type="number" disabled />
				</nut-form-item>
			</nut-form>
		</nut-config-provider>
		<view style="margin-top: 40rpx;">
			<nut-button type="primary" @click="goduihuan" size="large">兑换</nut-button>
		</view>
	</view>
</template>

<script>
	import {
		ref,
		reactive,
		watch
	} from 'vue';
	export default {
		setup() {
			const basicData = reactive({
				meili: null,
				xingbi: 0,
			});

			// 监听 meili 的变化
			watch(
				() => basicData.meili,
				(newVal) => {
					// 根据业务逻辑计算 xingbi 的值
					// 例如：xingbi = meili * 10
					basicData.xingbi = newVal ? newVal * 1 : 0;
				}
			);

			// 处理输入框内容变化
			const handleMeiliChange = (value, event) => {
				basicData.meili = value;
			};

			return {
				basicData,
				handleMeiliChange,
			};
		},
		data() {
			return {
				balance: 10,
			}
		},
		methods: {
			goduihuan() {
				uni.navigateTo({
					url: '/pages/my/duihuan'
				})
			},
		},
		computed: {},
	}
</script>

<style>
	page {
		background: linear-gradient(180deg, #000000 0%, #8b2ce0 49.98%, #000000 100%);
	}
</style>
<style lang="scss">
	:root,
	page {
		--nut-input-limit-font-size: 25px;
		--nut-input-disabled-color: #00007f;
	}

	.container {
		padding: 30rpx;
		border-radius: 20px;
	}
</style>
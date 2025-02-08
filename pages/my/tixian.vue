<template>
	<view style="margin-top: 30%;">
		<view style="margin-left: 43%;font-size: 22px;color: #55ffff;">
			<text>魅力值</text>
			<br />
			<text>&nbsp;&nbsp;&nbsp;{{charm}}</text>
		</view>
			<nut-form>
				<nut-form-item label="魅力值">
					<nut-input v-model="basicData.meili" class="nut-input-text" type="number" placeholder="请输入要兑换的魅力值(50:1)"
						@update:model-value="handleMeiliChange" />
				</nut-form-item>
				<nut-form-item label="可兑换现金">
					<nut-input v-model="basicData.money" class="nut-input-text" type="number" disabled />
				</nut-form-item>
				<nut-form-item label="开户行">
					<nut-input v-model="basicData.bank" class="nut-input-text" type="number" placeholder="请输入开户行"/>
				</nut-form-item>
				<nut-form-item label="卡号">
					<nut-input v-model="basicData.bankno" class="nut-input-text" type="number"  placeholder="请输入卡号" />
				</nut-form-item>
				<nut-form-item label="姓名">
					<nut-input v-model="basicData.name" class="nut-input-text" type="text" placeholder="请输入姓名"/>
				</nut-form-item>
			</nut-form>
	</view>
		<view style="margin-top: 40rpx;">
			<nut-button type="primary" @click="goduihuan" size="large">兑换</nut-button>
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
				money: 0,
				bank: null,
				bankno: null,
				name: null,
			});
			watch(
				() => basicData.meili,
				(newVal) => {
					basicData.money = newVal ? newVal * 0.02 : 0;
			});

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
				charm: 10,
			};
		}
	}
</script>

<style>
	:root, page {
		background: linear-gradient(180deg, #000000 0%, #8b2ce0 49.98%, #000000 100%);
	}
</style>

<style lang="scss">
	:root, page {
		--nut-cell-background: #c5c9ff;
		--nut-cell-padding: 18px 20px;
		--nut-cell-color: #14c8ff;
		--nut-input-disabled-color: #5500ff
	}
</style>

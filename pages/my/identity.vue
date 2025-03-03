<template>
	<view>
		<view class="iden">
			您的手机号：<input class="input1" type="text" v-model="phone" disabled="true" />
			<input class="content" type="text" placeholder="请输入您的身份证号" v-model="idCard" />
		</view>
		<view class="save" v-if="!idCard">
			<view class="btn" style="background:red" @click="save">保存</view>
		</view>
		<nut-dialog no-cancel-btn title="温馨提示" :content="content" v-model:visible="visible" />
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		DialogInst
	} from 'nutui-uniapp'
	import {
		editUser
	} from "@/common/api/piaoliupingApi"; // 全局配置文件

	const idCard = ref('')
	const visible = ref(false);
	const content = ref('');
	const phone = ref('');

	let User = uni.getStorageSync('User')
	const setUpload = () => {
		if (User.idCard) {
			content.value = '只能认证一次哦！'
			visible.value = true;
			setTimeout(() => {
				uni.navigateBack({
					delta: 1
				});
			}, 2000);
		} else {
			content.value = '谨慎填写，只能认证一次哦！'
			visible.value = true;
		}
		setData();
	};

	const save = () => {
		User.idCard = idCard.value
		//判断身份证号是否符合规范
		if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idCard.value))) {
			content.value = '请输入正确的身份证号！'
			visible.value = true;
			return
		}
		let idCardNumber = idCard.value;
		let sexCode = parseInt(idCardNumber.substr(16, 1), 10);

		User.sex = sexCode % 2 === 1 ? 'male' : 'female';
		editUser(User).then(res => {
			if (res.code === 200) {
				content.value = '身份认证成功,您的性别为：' + (User.sex === 'male' ? '男!' : '女!');
				visible.value = true;
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					});
				}, 2000);
			} else {
				content.value = '身份证保存失败！'
				visible.value = true;
			}
		});
	};

	const setData = () => {
		idCard.value = User.idCard;
		phone.value = User.phoneNumber;
	}

	setUpload();
</script>

<style>
	page {
		background: linear-gradient(180deg, #d5d5d5 5%, #fff 50.06%, #d5d5d5 95%);
	}

	.iden {
		font-size: 40upx;
		margin: 100px 20px;
		padding: 15px;
		border: 2px solid #444444;
		border-radius: 15px;
	}

	.save {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 120upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.save view {
		display: flex;
	}

	.save .btn {
		box-shadow: 0upx 5upx 10upx rgba(0, 0, 0, 0.4);
		width: 70%;
		height: 80upx;
		border-radius: 80upx;
		border: 1px solid #444444;
		background-color: #f23a3a;
		color: #fff;
		justify-content: center;
		align-items: center;
		font-size: 30upx;
		margin-bottom: 160px;
	}

	.content {
		margin-top: 20px;
	}
</style>
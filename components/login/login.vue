<template>
	<nut-notify></nut-notify>
	<view>
		<checkbox-group @change="checkboxChange">
			<label>
				<checkbox :checked="isChecked" value="cb" style="transform:scale(0.7);" /><text
					style=" font-size: 86%;">我已阅读并同意</text>
				<text @click="showAgreement1"
					style="color: coral; white-space: nowrap; font-size: 86%;">《丽丽租好房用户协议》</text>
				<web-view v-if="showWebview1" src="https://ht.lilihouse.cn/user.html"></web-view>
				<text style="white-space: nowrap;">和</text>
				<text @click="showAgreement2" style="color: coral;white-space: nowrap; font-size: 86%;">《隐私政策》</text>
				<web-view v-if="showWebview2" src="https://ht.lilihouse.cn/privacy.html"></web-view>
			</label>
			<button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class="clearBtn">
				<view class="login">
					手机号快捷登录
				</view>
			</button>
		</checkbox-group>
	</view>
</template>

<script>
	import config from "@/common/config.js"; // 全局配置文件
  import {
		ref
	} from 'vue';
	import {
		useNotify
	} from "nutui-uniapp/composables";
	import {
		registerUser
	} from "@/common/api/piaoliupingApi"; // 全局配置文件

	export default {
		setup() {
			const notify = useNotify();
			const isChecked = ref(false);
			const showWebview1 = ref(false);
			const showWebview2 = ref(false);

			function checkboxChange(e) {
				isChecked.value = e.detail.value.includes('cb');
			}

			return {
				isChecked,
				showWebview1,
				showWebview2,
				checkboxChange,
				showAgreement1() {
					showWebview1.value = true; // 点击按钮后允许显示web-view
				},
				showAgreement2() {
					showWebview2.value = true; // 点击按钮后允许显示web-view
				},

				getPhoneNumber(e) {
					console.log(e.detail.code) // 动态令牌

					// 检查是否同意用户协议
					if (!isChecked.value) {
						notify.warning("请先同意用户协议");
					} else {
						let code = e.detail.code;
						if (code) {
							console.log(code);
							this.handleRegister(code);
						} else {
							notify.warning("登陆失败");
						}
					}
				},
				async handleRegister(code) {
					const Data = {
						code: code,
					};

					try {
						const response = await registerUser(Data);
						if (response.code === 200) {
							// 登录成功初始化token与用户信息
							const User = response.data.User;
							//用户第一次登录没有头像，默认头像
							if (!User.avatar) {
								User.avatar = 'https://free4.yunpng.top/2025/02/19/67b587e227050.jpg'
							}else if(!User.avatar.startsWith('http')){
								User.avatar = config.baseURL + User.avatar
							}
							//根据生日计算年龄
							const birthday = new Date(User.birthday);
							const today = new Date();
							const age = today.getFullYear() - birthday.getFullYear();
							//存入User
							User.age = age;
							uni.setStorageSync('token', response.data.token);
							uni.setStorageSync('User', User);
							notify.success("登录成功!");
							//1秒后跳转
							if (User.newUser) {
								setTimeout(() => {
									uni.redirectTo({
										url: '/pages/my/set'
									})
								}, 1000);
							}
						} else {
							notify.warning(response.message);
						}
					} catch (error) {
						console.error(error);
					}
				}
			};
		},
		methods: {
			async handleRegister() {
				const userData = {
					userName: '123456',
					password: '123456',
				};

				try {
					const response = await registerUser(userData);
					console.log(response); // 这里可以获取到后端返回的数据
				} catch (error) {
					console.error(error); // 处理错误（即使你不需要处理错误，保留这个块是个好习惯）
				}
			}
		},
	};
</script>

<style>
	page {
		background-color: #ffffff;
	}
</style>
<style>
	.clearBtn {
		margin-top: 20px;
		background-color: rgb(83, 194, 64);
		width: 70%;
	}
</style>
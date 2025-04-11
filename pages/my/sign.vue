<template>
	<view style="margin-top: 30px;">
		<nut-steps :current="checkinDays+1">
			<nut-step title="+10">
				1
			</nut-step>
			<nut-step title="+12">
				2
			</nut-step>
			<nut-step title="+15">
				3
			</nut-step>
			<nut-step title="+10">
				4
			</nut-step>
			<nut-step title="+20">
				5
			</nut-step>
			<nut-step title="+15">
				6
			</nut-step>
			<nut-step title="+20">
				7
			</nut-step>
		</nut-steps>
	</view>
	<view>
		<youlanSignIn @shift="shift" :integral="integral" :isIntegral="isIntegral" :checkinDays="checkinDays"
			:is_day_signin="is_day_signin" :already="data" :supplementary="true" bgday="#5baa30" :checkDate="true"
			type="calendar" lang="zh" @changeMonth="historysign" @change="signDate" />
	</view>
	<nut-toast></nut-toast>
</template>

<script>
	import config from "@/common/config.js" // 全局配置文件
	import youlanSignIn from '@/components/youlan-SignIn/youlan-SignIn.vue'
	import {
		useToast
	} from '@/uni_modules/nutui-uni/components/composables'
	import { 
		sign,
		getSignedDate } from "@/common/api/piaoliupingApi";
	let baseUrl = config.baseUrl;
	export default {
		components: {
			youlanSignIn
		},
		setup() {
			const toast = useToast();

			function shift() {
				toast.success("暂时不可以补签哦", {
					duration: 0,
					cover: true,
					coverColor: "rgba(0, 0, 0, 0.5)",
					closeOnClickOverlay: true
				});
			}
			return {
				toast,
				shift
			};
		},
		data() {
			return {
				data: [],
				checkinDays: 0, // 签到天数
				integral: 3, // 本次签到获取的积分
				isIntegral: true, // 是否显示签到积分模块
				is_day_signin: false,
				userId: 27
			}
		},
		onLoad() {
			this.userId = uni.getStorageSync('User').id;
			this.historysign();
			// 	if (wx.createRewardedVideoAd) {
			// 		rewardedVideoAd = wx.createRewardedVideoAd({
			// 			adUnitId: 'adunit-306e4c568861fb24'
			// 		});
			// 		rewardedVideoAd.onLoad(() => {
			// 			console.log('onLoad event emit');
			// 		});
			// 		rewardedVideoAd.onError((err) => {
			// 			console.log('onError event emit', err);
			// 		});
			// 	}
		},
		methods: {
			historysign() {
				getSignedDate().then(res => {
					console.log(res);
					res.forEach(date => {
						// 需要换成时间戳
						this.data.push(new Date(date).getTime())
					});
					this.checkinDays = this.calculateRecentContinuousCheckinDays(res);
					this.setIntegralBasedOnCheckinDays();
				});

				// this.data = []
				// uni.request({
				// 		url: baseUrl + '/api/houseApi/getSignedDate/' + this.userId,
				// 		method: 'GET',
				// 	})
				// 	.then((response) => {
				// 		// 请求成功时执行
				// 		const datesArray = response[1].data;
				// 		datesArray.forEach(el => {
				// 			// 需要换成时间戳
				// 			this.data.push(new Date(el).getTime())
				// 		});
				// 		this.checkinDays = this.calculateRecentContinuousCheckinDays(datesArray);
				// 		this.setIntegralBasedOnCheckinDays();
				// 	})
				// 	.catch((error) => {
				// 		return this.$mytip.toast('暂无签到信息')
				// 		// 请求失败时执行
				// 		console.error('Error:', error);
				// 	});
			},
			async signDate(v) {
				let data = {
					description: "签到赠送",
					number: this.integral
				}
				sign(data);
				this.checkinDays = this.checkinDays + 1;
				this.is_day_signin = true
			},
			setIntegralBasedOnCheckinDays() {
				switch (this.checkinDays) {
					//现在是连续签到了2天，
					case 1:
						//第三天能获得多少天会员：2
						this.integral = 12;
						break;
					case 2:
						this.integral = 15;
						break;
					case 3:
						this.integral = 20;
						break;
					case 5:
						this.integral = 15;
						break;
					case 6:
						this.integral = 20;
						break;
					default:
						this.integral = 10;
				}
			},
			calculateRecentContinuousCheckinDays(dateStrings, currentDate = new Date()) {
				// 将字符串数组转换为Date对象数组
				let dates = dateStrings.map(str => new Date(str));

				// 获取今天的日期和昨天的日期
				let today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
				let yesterday = new Date(today);
				yesterday.setDate(today.getDate() - 1);

				// 初始化连续签到天数
				let continuousDays = 0;

				// 检查昨天是否签到了
				if (dateStrings.some(str => new Date(str).toDateString() === yesterday.toDateString())) {
					// 昨天签到了，开始计算连续签到天数
					continuousDays = 1;

					// 从最近的签到日期（不包括今天）开始向前遍历，直到不是连续的或者遍历结束
					for (let i = 0; i < dates.length; i++) {
						let currentCheckinDate = new Date(dates[i].getFullYear(), dates[i].getMonth(), dates[i].getDate());

						// 如果当前签到日期是昨天，继续检查前一个日期
						if (currentCheckinDate.toDateString() === yesterday.toDateString()) {
							// 从昨天的前一天开始检查连续性
							for (let j = i + 1; j < dates.length; j++) {
								let diffInDays = (dates[j - 1] - dates[j]) / (1000 * 60 * 60 * 24);

								// 如果差值正好是一天，则认为是连续签到
								if (diffInDays === 1) {
									continuousDays++;
								} else {
									break;
								}
							}
							break; // 已经找到了昨天及之前的连续签到序列，可以停止循环
						}
					}
				}

				// 最后检查今天是否签到了
				if (dateStrings.some(str => new Date(str).toDateString() === today.toDateString())) {
					continuousDays += 1;
					this.is_day_signin = true
				}

				return continuousDays;
			}
		}
	}
</script>

<style>
	:root,
	page{
		background: linear-gradient(180deg, #dcdcdc 5%, #696969 50.06%, #dcdcdc 95%);
		--nut-steps-base-line-color: #ffffff;
		--nut-steps-base-title-color: #55aa00;
		--nut-steps-wait-icon-bg-color: #55aaff;
	}
</style>
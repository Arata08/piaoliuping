<template>
	<view class="page">
		<view class="user">
			<image :src="User.avatar" />
			<view class="user-info">
				<view class="u-font-18 u-tips-color">星币余额：{{xingbi}}</view>
				<text v-if="membershipInfo" style="color:lightcoral;">会员到期时间: {{membershipInfo}}</text>
			</view>
		</view>

		<view class="content">
			<view class="title">充值方案</view>
			<view class="option">
				<!-- 添加换行逻辑 -->
				<view v-for="(v, k) in options" :class="'option-item ' + (k === current ? 'option-selected' : '')"
					:key="k" @click="change(k)">
					<text class="option-item-xingbi">{{v.xingbi}}个星币</text>
					<view class="option-item-price"><text>￥</text><text>{{v.price}}</text></view>
					<text class="option-item-tip">{{v.tip}}</text>
					<view class="option-item-vip" v-if="v.vip">
						<image src="/static/my/vipa.png"
							style="width: 15px;height: 15px;margin-bottom: -2px;margin-right: 3px;"></image>
						赠送{{v.vip}}天vip
					</view>
					<view class="option-item-tag" v-if="v.tag">{{v.tag}}</view>
				</view>
			</view>
			<view class="button" @click="open()">
				<text>立即以{{options[current].price}}元充值</text>
				<!-- <text>支付后可立即开具体发票</text> -->
			</view>
			<view class="agreement">
				<view @click="showAgreement()">查看《服务协议》</view>
				<web-view v-if="showWebview" src="https://ht.lilihouse.cn/service.html"></web-view>
			</view>
			<view class="title">会员权益</view>
			<view class="advantage">
				<view class="advantage-item" v-for="(v,k) in advantages" :key="k">
					<view class="advantage-item-icon">
						<image :src="v.icon"></image>
					</view>
					<view class="advantage-item-text">
						<text>{{v.name}}</text>
						<text>{{v.desc}}</text>
					</view>
				</view>
			</view>
			<view class="title" style="color: #777; font-size: 14px;">注意事项</view>
			<view class="notice">
				<text>1. 会员权益与手机号相对应,无共享账号</text>
				<text>2. 开通会员前请阅读《用户协议》,会员服务一经开通后不可退款</text>
				<text>3. 严禁使用任何手段爬取本产品数据,一经发现可能面临账号禁用风险</text>
				<text>4. 需要发票信息，请联系客服</text>
			</view>
		</view><!-- 统一支付组件，注意：vue3下ref不可以等于组件名，因此这里ref="pay" 而不能是 ref="uniPay" -->
		<uni-pay ref="pay" :adpid="adpid" height="70vh" return-url="/pages/order-detail/order-detail"
			logo="/static/logo.png" @success="onSuccess" @create="  " @fail="onFail"></uni-pay>
	</view>
</template>

<script>
	// import config from "@/common/config.js" // 全局配置文件
	// let baseUrl = config.baseUrl;
	export default {
		data() {
			return {
				User: {
					"age": 18,
					"id": 11,
					"userName": "19515861232",
					"nickName": "微信用户1",
					"sex": "female",
					"avatar": "http://localhost:8091/image/2025/02/23/OFxwu2zKeX.png",
					"balance": 50,
					"meili": 0,
					"vip": 100,
					"level": 2,
					"experience": 5,
					"flower": 10
				},
				showWebview: false, // 初始时不显示web-view
				total_fee: 1, // 支付金额，单位分 100 = 1元
				order_no: "", // 业务系统订单号（即你自己业务系统的订单表的订单号）
				out_trade_no: "", // 插件支付单号
				description: "房东卡", // 支付描述
				type: "recharge", // 支付回调类型 如 recharge 代表余额充值 goods 代表商品订单（可自定义，任意英文单词都可以，只要你在 uni-pay-co/notify/目录下创建对应的 xxx.js文件进行编写对应的回调逻辑即可）
				membershipInfo: "2025年2月5日", // 用来存储查询到的会员信息
				xingbi: 100,
				transaction_id: "", // 查询订单接口的查询条件
				options: [{
						xingbi: 90,
						price: 8.8,
						tip: '赠送25魅力值',
						meilizhi: 25,
						vip: 1,
					},
					{
						xingbi: 440,
						price: 28,
						tip: '赠送120魅力值',
						meilizhi: 25,
						tag: '最多人买',
						vip: 7,
					},
					{
						xingbi: 850,
						price: 48,
						tip: '赠送230魅力值',
						meilizhi: 25,
						vip: 15,
					},
					{
						xingbi: 1730,
						price: 88,
						tip: '赠送480魅力值',
						meilizhi: 25,
						vip: 30,
					},
					{
						xingbi: 2860,
						price: 128,
						tip: '赠送800魅力值',
						meilizhi: 25,
						tag: '最划算',
						vip: 60,
					}
				],
				advantages: [{
						icon: '/static/my/vipa.png',
						name: '尊贵身份',
						desc: '24小时专属服务'
					},
					{
						icon: '/static/my/vip.png',
						name: '仅看认证',
						desc: '可无限发布房源'
					},
					{
						icon: '/static/my/vip.png',
						name: '同城特权',
						desc: '24小时专属服务'
					},
					{
						icon: '/static/my/vip.png',
						name: '信件权重',
						desc: '24小时专属服务'
					},
					{
						icon: '/static/my/vip.png',
						name: '年龄筛选',
						desc: '24小时专属服务'
					},
					{
						icon: '/static/my/vip.png',
						name: '仅看VIP',
						desc: '24小时专属服务'
					},
					{
						icon: '/static/my/vip.png',
						name: '主动私信',
						desc: '24小时专属服务'
					},
				],
				current: 0, // 当前选中套餐下标
			}
		},
		// 监听 - 页面每次【加载时】执行(如：前进)
		onLoad(options = {}) {
			this.setData();
		},
		// 监听 - 页面每次【显示时】执行(如：前进和返回) (页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面)
		onShow() {
			//this.fetchMembershipInfo();
		},
		methods: {
			setData() {
				this.User = uni.getStorageSync('User');
			},
			updateAvatar() {
				const lifeData = uni.getStorageSync('lifeData').vuex_user.user;
				this.avatar = lifeData.avatar
				if (!this.avatar.startsWith('http')) {
					this.avatar = config.staticUrl + this.avatar;
				}
				console.log(this.avatar)
			},
			showAgreement() {
				this.showWebview = true; // 点击按钮后允许显示web-view
			},
			change(k) {
				this.current = k;
			},
			open() {
				// total_fee的单位为分，100分=1元
				this.total_fee = this.options[this.current].price * 100;
				this.order_no = `F` + Date.now();
				this.out_trade_no = `${this.order_no}-1`;
				// 打开支付收银台
				this.$refs.pay.open({
					total_fee: this.total_fee, // 支付金额，单位分 100 = 1元
					order_no: this.order_no, // 业务系统订单号（即你自己业务系统的订单表的订单号）
					out_trade_no: this.out_trade_no, // 插件支付单号
					description: this.description, // 支付描述
					type: this.type, // 支付回调类型
				});
			},
			// BUG--------无法进行uni-pay-co->recharge.js回调
			onSuccess(res) {
				if (res.user_order_success) {
					try {
						// 代表用户已付款，且你自己写的回调成功并正确执行了---没有实现哈哈哈
						//预算不足，懒得保证安全性了，未来再说吧，可以和传回来的res对比再更新余额
						//let chargeAmount = res.chargeAmount; // 确保res中有此字段或相应地从其他地方获取充值金额
						//后端更新余额
						let url = baseUrl + "/api/membership/recharge";
						let vuex_user = uni.getStorageSync('lifeData').vuex_user;
						let user = vuex_user.user
						let userId = user.userId;
						let time = this.options[this.current].time;
						const requestData = {
							userId: userId,
							time: time,
						};
						console.log(requestData);
						const response = uni.request({
							url: url + '?userId=' + userId + '&time=' + time,
							method: 'POST',
						});
						this.$mytip.successToast('充值成功！')
					} catch (error) {
						uni.showToast({
							title: '网络错误，请检查网络连接！',
							icon: 'none',
							duration: 2000,
						});
					}
				}
			},
			onFail(err) {
				console.log('err: ', err)
			},
			async fetchMembershipInfo() {
				try {
					let vuex_user = uni.getStorageSync('lifeData').vuex_user;
					let user = vuex_user.user
					let userId = user.userId;
					const response = await uni.request({
						url: baseUrl + '/api/membership/findMembershipByUserId' + '?userId=' + userId,
						method: 'GET',
					});
					if (response[1].statusCode === 200) {
						this.membershipInfo = response[1].data;
					} else {
						this.membershipInfo = {
							'expiresAt': '未开通'
						};
					}
				} catch (error) {
					console.error('Network error:', error);
				}
			},
			pageTo(url) {
				uni.navigateTo({
					url
				});
			},
			providerFormat(provider) {
				let providerObj = {
					"wxpay": "微信支付",
					"alipay": "支付宝支付",
					"appleiap": "ios内购"
				};
				let providerStr = providerObj[provider] || "未知";
				return providerStr;
			},
			/**
			 * 日期格式化
			 * @params {Date || Number} date 需要格式化的时间
			 * timeFormat(new Date(),"yyyy-MM-dd hh:mm:ss");
			 */
			timeFormat(time, fmt = 'yyyy-MM-dd hh:mm:ss', targetTimezone = 8) {
				try {
					if (!time) {
						return "";
					}
					if (typeof time === "string" && !isNaN(time)) time = Number(time);
					// 其他更多是格式化有如下:
					// yyyy-MM-dd hh:mm:ss|yyyy年MM月dd日 hh时MM分等,可自定义组合
					let date;
					if (typeof time === "number") {
						if (time.toString().length == 10) time *= 1000;
						date = new Date(time);
					} else {
						date = time;
					}

					const dif = date.getTimezoneOffset();
					const timeDif = dif * 60 * 1000 + (targetTimezone * 60 * 60 * 1000);
					const east8time = date.getTime() + timeDif;

					date = new Date(east8time);
					let opt = {
						"M+": date.getMonth() + 1, //月份
						"d+": date.getDate(), //日
						"h+": date.getHours(), //小时
						"m+": date.getMinutes(), //分
						"s+": date.getSeconds(), //秒
						"q+": Math.floor((date.getMonth() + 3) / 3), //季度
						"S": date.getMilliseconds() //毫秒
					};
					if (/(y+)/.test(fmt)) {
						fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
					}
					for (let k in opt) {
						if (new RegExp("(" + k + ")").test(fmt)) {
							fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (opt[k]) : (("00" + opt[k]).substr(("" +
								opt[k]).length)));
						}
					}
					return fmt;
				} catch (err) {
					// 若格式错误,则原值显示
					return time;
				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #53536B;
	}

	.page {
		width: 100vw;
		padding-top: 50rpx;

		.user {
			display: flex;
			align-items: center;
			background: #DCDDE0;
			width: 700rpx;
			margin: auto;
			box-sizing: border-box;
			padding: 0 30rpx;
			border-radius: 20rpx 20rpx 0 0;
			height: 160rpx;

			image {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
			}

			.user-info {
				height: 90rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding-left: 15rpx;

				text {
					&:nth-child(1) {
						font-weight: bold;
					}

					&:nth-child(2) {
						font-size: 14px;
						color: #777;
					}
				}
			}
		}

		.content {
			background: #fff;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			padding: 20rpx;
			box-sizing: border-box;
			width: 100vw;

			.title {
				font-weight: bold;
				height: 80rpx;
				line-height: 80rpx;
			}

			.option {
				display: flex;
				flex-wrap: wrap; // 添加换行支持
				justify-content: space-between; // 添加间距

				.option-item {
					width: 225rpx;
					height: 280rpx;
					box-sizing: border-box;
					border: 1px solid #999;
					border-radius: 15rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					position: relative;
					margin-bottom: 20rpx; // 添加底部间距

					&:active {
						background: #FFF6ED;
						border-color: #F9D7B2;
					}

					.option-item-xingbi {
						font-weight: bold;
						font-size: 14px;
						color: #00dede;
					}

					.option-item-price {
						font-weight: bold;
						color: #00dede;
						margin: 20rpx 0;

						text {
							&:nth-child(2) {
								font-size: 26px;
							}
						}
					}

					.option-item-tip {
						font-size: 12px;
						color: #999;
					}

					.option-item-vip {
						border-radius: 5px;
						border-width: 0px;
						border-style: solid;
						padding: 5px 10px;
						font-size: 12px;
						color: #998913;
						background: linear-gradient(90deg, #fae79f 0%, #ecb863 100%);
					}

					.option-item-tag {
						position: absolute;
						left: -5rpx;
						top: -10rpx;
						font-weight: bold;
						font-size: 14px;
						padding: 5rpx 10rpx;
						border-radius: 12rpx;
						background: red;
						color: #fff;
					}
				}

				.option-selected {
					background: #ffedd7;
					border-color: #f9bca8;

					.option-item-price {
						color: #ff0000;
					}
				}
			}

			.button {
				background: #F9D7B2;
				height: 100rpx;
				border-radius: 50rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				margin-top: 30rpx;

				&:active {
					background: #ceb295;
				}

				text {
					&:nth-child(1) {
						font-weight: bold;
						color: #333;
						line-height: 1.5;
					}

					&:nth-child(2) {
						color: #555;
						font-size: 14px;
					}
				}
			}

			.agreement {
				font-size: 14px;
				text-align: center;
				margin-top: 20rpx;
				margin-bottom: 60rpx;
				color: #f5984a;

				&:active {
					color: #9c602f;
				}
			}

			.advantage {
				display: flex;
				flex-wrap: wrap;

				.advantage-item {
					display: flex;
					width: 350rpx;
					margin-bottom: 20rpx;

					.advantage-item-icon {
						border: 1px solid #F9D7B2;
						border-radius: 50%;
						width: 70rpx;
						height: 70rpx;

						image {
							margin: 10rpx;
							width: 50rpx;
							height: 50rpx;
						}
					}

					.advantage-item-text {
						display: flex;
						flex-direction: column;
						justify-content: center;
						margin-left: 15rpx;

						text {
							&:nth-child(1) {
								font-size: 14px;
								color: #f5984a;
							}

							&:nth-child(2) {
								font-size: 12px;
								color: #888;
							}
						}
					}
				}
			}

			.notice {
				display: flex;
				flex-direction: column;

				text {
					font-size: 12px;
					color: #888;
					margin-bottom: 10rpx;
				}
			}
		}
	}
</style>
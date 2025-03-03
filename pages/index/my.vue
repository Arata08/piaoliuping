<template>
	<view class="container">
		<div class="layer2"></div>
		<div class="layer3"></div>
		<div class="meteor"></div>
		<view class="userdata">
			<nut-avatar size="large" class="headimage">
				<img :src="User.avatar" @click="goToPage('set')" />
			</nut-avatar>
			<view class="userinfo">
				<view class="nicknametags">
					<view class="nickname">{{User.nickName}}</view>
					<nut-tag :type="User.sex==='man'?'primary':'danger'" round>
						<nut-icon :name="'/static/images/'+ User.sex +'.png'" color="white" />
						{{User.age}}
					</nut-tag>
				</view>
				<view class="userid"> ID {{User.id}} </view>
				<view class="progress">
					<view class="leveltext"> Lv{{User.level}} </view>
					<nut-progress :percentage="User.experience" :show-text="false" />
				</view>
			</view>
		</view>
		<view class="userext">
			<view class="statics">
				<view class="statitem" @click="goToPage('xb')">
					<view class="number">{{User.balance}}</view>
					<view class="name"> 星币 </view>
				</view>
				<view class="statitem" @click="goToPage('charm')">
					<view class="number" style="color: darkorchid;"> {{User.meili}} </view>
					<view class="name"> 魅力值 </view>
				</view>
				<view class="statitem" @click="goToPage('vip')" style="color: gold">
					<view class="number"> {{User.vip}} </view>
					<view class="name"> 剩余会员 </view>
				</view>
				<view class="statitem" @click="goToPage('follow')">
					<view class="number"> {{User.flower}}</view>
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
				<nut-cell title="每日签到" is-link @click="goToPage('sign')">
					<template #icon>
						<image class="nut-icon" src="../../static/my/已签到.png"></image>
					</template>
				</nut-cell>
				<nut-cell title="分享给好友" is-link @click="goToPage('sign')">
					<template #icon>
						<image class="nut-icon" src="../../static/my/分享.png"></image>
					</template>
				</nut-cell>
				<nut-cell title="性别认证" is-link @click="goToPage('identity')">
					<template #icon>
						<image class="nut-icon" src="../../static/my/性别.png"></image>
					</template>
				</nut-cell>
			</nut-cell-group>
			<nut-cell-group>
				<nut-cell title="设置" is-link @click="toSettings">
					<template #icon>
						<image class="nut-icon" src="../../static/my/set-up.png"></image>
					</template>
				</nut-cell>
			</nut-cell-group>
			<button type="default" open-type="contact"
				style="margin-top: 20rpx;background-color: #0B1430;color: #fff">在线咨询</button>
		</view>
	</view>

</template>

<script>
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
				}
			};
		},
		onShow() {
			this.setData();
		},
		methods: {
			setData() {
				let user = uni.getStorageSync('User');
				if (user) {
					Object.assign(this.User, user); // 使用 Object.assign 更新属性而不是直接赋值
				}else{
					//返回主页
					uni.switchTab({
						url: '/pages/index/index',
					});
				}
			},
			showShare() {},
			contactUs() {
				uni.previewImage({
					urls: [this.img]
				})
			},
			toSettings() {
				uni.openSetting()
			},

			goToPage(type) {
				let url = '';
				switch (type) {
					case 'xb':
						url = '/pages/my/xb';
						break;
					case 'charm':
						url = '/pages/my/charm';
						break;
					case 'vip':
						url = '/pages/my/vip';
						break;
					case 'follow':
						url = '/pages/my/follow';
						break;
					case 'set':
						url = '/pages/my/set';
						break;
					case 'sign':
						url = '/pages/my/sign';
						break;
					case 'identity':
						url = '/pages/my/identity';
						break;
					default:
						console.error('未知的页面类型');
						return;
				}
				uni.navigateTo({
					url: url,
				});
			},
		},
	};
</script>

<style>
	page {
		background: linear-gradient(180deg, #000000 0%, #2b3977 49.98%, #000000 100%);
	}
</style>

<style lang="scss">
	$containerPadding: 25rpx;
	$fontSizeSmall: 25rpx;
	$fontSizeBig: 35rpx;

	:root,
	page {
		--nut-cell-background: #151c39;
		--nut-cell-padding: 18px 20px;
		--nut-cell-color: #ffffff;
	}

	//----------------------------------
	//根据数量来生成shadows
	@function getShadows($n) {
		//每一个shadow对应一个小星星
		$shadows: unquote('#{random(100)}vw #{random(100)}vh #fff');

		@for $i from 2 through $n {
			$shadows: '#{$shadows}, #{random(100)}vw #{random(100)}vh #fff';
		}

		//去掉逗号
		@return unquote($shadows)
	}

	$duration: 400s; //小星星运动的动画时间
	$count: 600; //每层星空的小星星数，为保证性能，这里建议设置不超过1000

	//通过for循环来生成5层星空
	@for $i from 1 through 5 {
		$duration: $duration / 2; //离屏幕越近，运动越快
		$count: floor($count / $i); //离屏幕越近，星星数越少

		.layer#{$i} {
			$size: #{$i}px; //离屏幕越近星星越大
			position: fixed;
			width: $size;
			height: $size;
			border-radius: 50%;
			left: 0;
			top: 0;
			//通过多个shadow来达到生层本层星空星星
			box-shadow: getShadows($count);
			animation: moveUp $duration linear infinite;

			//通过伪类在屏幕下方放置一个一样的星空层，防止循环播放的时候闪屏
			&::after {
				content: '';
				position: fixed;
				left: 0;
				top: 100vh;
				border-radius: inherit;
				width: inherit;
				height: inherit;
				box-shadow: inherit;
			}
		}
	}

	//星星向上运动动画
	@keyframes moveUp {
		to {
			transform: translateY(-100vh);
		}
	}

	$color: orange;

	//流星拖尾
	.meteor {
		width: 3px;
		height: 36px;
		background: linear-gradient(0deg, $color 0, transparent 100%);
		position: absolute;
		top: 70px;
		transform: rotate(45deg);
		right: 70px;
		opacity: 0;
		animation: streak 2s linear infinite;

		//伪类实现发光头部
		&::after {
			content: "";
			position: absolute;
			width: 6px;
			height: 6px;
			border-radius: 50%;
			background: $color;
			filter: blur(1.8px);
			box-shadow: 0px -1px -1px 5px transparent;
			bottom: -4px;
			left: 50%;
			transform: translate(-50%);
		}
	}

	@keyframes streak {
		0% {
			transform: rotate(50deg) translateY(-100px) scale(0.5);
			opacity: 0;
		}

		70% {
			opacity: 1;
			transform: rotate(50deg) translateY(120px) scale(1.1);
		}

		100% {
			transform: rotate(50deg) translateY(220px) scale(0.5);
			opacity: 0;
		}
	}

	//---------------------------
	.container {
		box-sizing: border-box;
		padding: 0 $containerPadding $containerPadding;
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
		color: #ffffff;
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
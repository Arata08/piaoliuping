<template>
	<view class="index-box">
		<nut-dialog title="温馨提示" content="高级筛选仅vip可选" v-model:visible="visible1" @ok="onOk" ok-text="立即开通" cancel-text="稍后再去"/>
		<view :style="{ marginTop: statusBarHeight+10 + 'px' }" class="nav" @click="showBasic = true">
			<nut-icon custom-color="#ffffff" name="horizontal-n"></nut-icon>
			<text style="color: #fff;margin-left: 5rpx; font-size: 32rpx;">筛选</text>
		</view>
		<nut-config-provider theme="dark">
			<nut-popup :custom-style="{ padding: '20px 3px'}" v-model:visible="showBasic" :round="true" duration="600"
				click-overlay="quxiao()">
				<view style="text-align: center;color: #fff;">
					<text>信件筛选</text>
				</view>
				<view style="margin-left: 5px;margin-top: 15px;">
					<nut-radio-group direction="horizontal" v-model="formData2.sex">
						<nut-radio label="">不限</nut-radio>
						<nut-radio label="male">男</nut-radio>
						<nut-radio label="female">女</nut-radio>
					</nut-radio-group>
				</view>
				<nut-cell title="圈子" desc="信件圈子" is-link @click="showRound1 = true"></nut-cell>
				<nut-cell title="年代" :desc="ageRangeDesc" is-link @click="showRightPop()"></nut-cell>
				<nut-form-item label="仅vip">
					<nut-switch v-model="formData2.isVip" @change="handleChange()"></nut-switch>
				</nut-form-item>
				<nut-form-item label="仅认证">
					<nut-switch v-model="formData2.isAut" @change="handleChange()"></nut-switch>
				</nut-form-item>
				<nut-form-item label="仅同城">
					<nut-switch v-model="formData2.isCity" @change="handleChange()"></nut-switch>
				</nut-form-item>
				<nut-button plain type="info" @click="quxiao()">&nbsp;&nbsp;&nbsp;取消&nbsp;&nbsp;</nut-button>
				<nut-button type="info" @click="submit()">&nbsp;&nbsp;确定&nbsp;&nbsp;&nbsp;</nut-button>
			</nut-popup>
		</nut-config-provider>
		<view class="video-background">
			<video src="https://lilihouse.oss-cn-hangzhou.aliyuncs.com/%E6%98%9F%E4%BA%911.0.mp4" object-fit="cover"
				:autoplay="true" :controls="false" :muted="true" :loop="true" id="videoRef" class="video">
			</video>
		</view>
		<view class="index">
			<view>缘分天注定,七分靠打拼</view>
			<view>在这里遇到同频的TA</view>
		</view>
		<view class="btns">
			<nut-animate type="jump" :loop="true">
				<image src="/static/index/in.png" style="height: 80px;width: 80px;" @click="toBox()" />
			</nut-animate>
			<image src="/static/index/see.png" style="height: 100px;width: 114px;margin-top: -80px" @click="onSearch()" />
			<nut-animate type="ripple" :loop="true">
				<image src="/static/index/out.png" style="height: 80px;width: 80px;" @click="toSend()" />
			</nut-animate>
		</view>
	</view>
	<nut-popup position="bottom" round v-model:visible="showRound" closeable>
		<view style="text-align: center;margin-top: 60px;margin-bottom: 40px;">
			<login></login>
		</view>
	</nut-popup>
	<nut-popup position="bottom" round v-model:visible="showRound1" closeable>
		<view style="text-align: center;margin-top: 20px;margin-bottom: 40px;">
			<view style="display: flex;flex-direction: column;margin-top: -20px">
				<nut-cell-group title="筛选条件">
					<nut-checkbox-group v-model="filter" shape="button">
						<nut-checkbox v-for="(item, index) in filterOptions" :key="index" :label="item.value" shape="button">
							{{ item.label }}
						</nut-checkbox>
					</nut-checkbox-group>
				</nut-cell-group>
			</view>
			<nut-button size="large" custom-color="linear-gradient(to right, #a1a1a1, #585858)" @click="submit2()">取消选择(圈子不限)</nut-button>
			<nut-button size="large" custom-color="linear-gradient(to right, #8FE6EE, #00D1FF)" @click="submit1()">确定</nut-button>
		</view>
	</nut-popup>
	<nut-popup position="left" :custom-style="{ width: '30%', height: '80%', marginTop: '100rpx' }" v-model:visible="showRight" round closeable>
		<nut-range range v-model="ageRound" :vertical="true" min='18' max='70'></nut-range>
	</nut-popup>
</template>

<script lang="ts">
	import {
		getLetter
	} from "@/common/api/piaoliupingApi";
	import { reactive, toRefs,ref, computed } from 'vue';
	import login from '../../components/login/login.vue'
	export default {
		components: {
			login
		},
		props: {},
		setup() {
			const showRight = ref(false);
			const ageRound = ref([18,50]);
			const filter = ref([])
			const visible1 = ref(false);
			const formData2 = reactive({
				isVip: false,
				isAut: false,
				isCity: false,
				sex: 0,
				ageRound: [],
				subject: [],
			});
			const filterOptions = ref([
				{ label: '出轨', value: '出轨' },
				{ label: '吐槽', value: '吐槽' },
				{ label: '离异', value: '离异' },
				{ label: '百合', value: '百合' },
				{ label: '婚姻', value: '婚姻' },
				{ label: '腐女', value: '腐女' },
				{ label: '大叔', value: '大叔' },
				{ label: '剧情杀', value: '剧情杀' },
				{ label: '聊完删', value: '聊完删' },
				{ label: '自驾游', value: '自驾游' },
				{ label: '同城交友', value: '同城交友' },
				{ label: '单身交友', value: '单身交友' },
				{ label: '游戏陪玩', value: '游戏陪玩' },
				{ label: '你问我答', value: '你问我答' },
				{ label: '婆媳关系', value: '婆媳关系' },
				{ label: '闺蜜话语', value: '闺蜜话语' },
				{ label: '秘密分享', value: '秘密分享' },
				{ label: '两性话题', value: '两性话题' },
				{ label: '禁两性话题', value: '禁两性话题' }
			]);
			const onOk = () => {
				//前往充值
				uni.navigateTo({
						url: '/pages/my/vip'
					})
			};
			const state = reactive({
				showBasic: false
			});
			function submit1() {
				formData2.subject = filter.value
			}
			function submit2() {
				filter.value = []
				formData2.subject = []
			}
			function showRightPop() {
				this.showRight = true
			}
      const ageRangeDesc = computed(() => {
        return `${ageRound.value[0]}到${ageRound.value[1]}`;
      });
			return {
        ageRangeDesc,
				showRightPop,
				ageRound,
				showRight,
				submit1,
				submit2,
				filter,
				filterOptions,
				onOk,
				visible1,
				formData2,
				...toRefs(state)
			};
		},
		data() {
			return {
				statusBarHeight: 40,
				VideoContext: {},
				tabbarValue: 1,
				tabValue: 0,
				penImage: "/static/images/plus.png",
				star1: "/static/images/star2.png",
				inbox: "/static/images/inbox.png",
				outbox: "/static/images/outbox.png",
				showRound: false,
				showRound1:false
			}
		},
		onLoad() {
			this.statusBarHeight = uni.getStorageSync("SystemInfoSync").statusBarHeight
			uni.setStorageSync("SystemInfoSync", uni.getSystemInfoSync())
			if (!uni.getStorageSync('token')) {
				this.showRound = true
			}
		},
		onShow() {
			// 当app切到后台再切回前台的时候会触发onShow这个时候视频应该继续播放，不这样做视频会暂停的
			this.$nextTick(() => {
				this.VideoContext = uni.createVideoContext('videoRef');
				this.VideoContext.play()
			})
		},
		methods: {
			handleChange() {
				// if (uni.getStorageSync("User").vip < 1) {
				// 	this.visible1 = true
				// 	this.$set(this.formData2, 'isVip', false);
				// 	this.$set(this.formData2, 'isAut', false);
				// 	this.$set(this.formData2, 'isCity', false);
				// }
			},
			quxiao() {
				this.$set(this.formData2, 'isVip', false);
				this.$set(this.formData2, 'isAut', false);
				this.$set(this.formData2, 'isCity', false);
				this.$set(this.formData2, 'sex', '');
				this.showBasic = false;
			},
			submit() {
				this.showBasic = false
				this.formData2.ageRound = this.ageRound;
				console.log(this.formData2)
			},
			onSearch() {
				if (this.formData2.isCity) {
					this.formData2.city = uni.getStorageSync("User").city
				}
				getLetter(this.formData2).then(res => {
					console.log(res)
				})
				//跳转到inbox
				uni.navigateTo({
						url: '/pages/mailbox/inbox'
					})
			},
			toBox() {
				const url = "/pages/mailbox/mailbox";
				uni.navigateTo({
					url
				})
			},
			toSend() {
				const url = "/pages/send/send";
				uni.navigateTo({
					url
				})
			}
		},
	}
</script>

<style lang="scss">
	:root,
	page {
		--nut-dark-background: #0000ff;
	}

	.nav {
		padding: 5rpx 0 0 14rpx;
		display: flex;
		flex-direction: row;
	}

	.index-box {
		position: relative;
		height: 100vh;
		overflow: hidden;

		.video-background {
			position: absolute;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			z-index: -1;

			.video {
				width: 100%;
				height: 100%;
			}
		}
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	.rotate {
		animation: spin 2s linear infinite;
	}

	.index {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 70vh;
		width: 100%;
		overflow: hidden;
		margin-top: -400rpx;
		color: #c497f3;
	}

	.tab {
		width: 100%;
	}

	.tab-bar {
		position: fixed;
		bottom: 0;
		width: 100%;
	}

	.star {
		width: 500rpx;
		height: 500rpx;
	}

	.btns {
		width: 100%;
		text-align: center;
		position: fixed;
		bottom: 100rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		color: var(--nut-dark-color);
	}

	.desc {
		text-align: center;
	}

	.nut-tabbar-item_icon-box_icon .nut-icon__img {
		width: 75rpx;
		height: 75rpx;
	}
</style>
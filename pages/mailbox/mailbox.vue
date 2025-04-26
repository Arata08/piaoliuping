<template>
	<nut-tabs background="#00s0" v-model="state.tab2value" :auto-height="true" type="smile" swipeable @click="load">
		<nut-tab-pane title="收件箱" pane-key="0">
			<nut-empty ifdescription="无数据" v-if="isList1Empty"></nut-empty>
			<view class="container" v-for="(item, index) in list1" :key="index">
				<view class="item">
					<view class="avatar">
						<nut-avatar size="large">
							<img :src="item.Avatar" />
						</nut-avatar>
					</view>
					<view class="info">
						<view class="text userdata">
							<view class="nickname">{{ item.Nickname }}</view>
							<nut-tag class="gender-age" :type="(item.Gender==='male' ? 'primary' : 'warning')" round>
								<nut-icon :name="'/static/images/' + item.Gender + '.png'" color="white" />
								{{ item.Age }}岁
							</nut-tag>
							<image :src="'/static/mailbox/LV' + item.Level +'.png'"
								style="height: 20px;width: 43px;margin-left: 2px;">
							</image>
						</view>
						<view class="text datetime">{{ item.Datetime }}</view>
					</view>
					<nut-icon name="more-s" size="25" custom-color="#fff" style="align-self: flex-end;"
						@click="show(item.UserId)"></nut-icon>
				</view>
				<view class="text content">
					{{ item.content }}
					<image v-if="item.ContentImage" style="height: 250px;margin-top: 5px;" mode="aspectFit" :src="item.imagePath"></image>
				</view>
			</view>
		</nut-tab-pane>
		<nut-tab-pane title="发件箱" pane-key="1">
			<nut-empty ifdescription="无数据" v-if="isList2Empty"></nut-empty>
			<view v-for="(item, index) in list2" :key="index">
				<view class="container">
					<view class="text content">
						<text style="color: #fff;">{{ item.content }}</text>
						<image v-if="item.imagePath" style="height: 250px;margin-top: 5px;" mode="aspectFit" :src="item.imagePath"></image>
					</view>
					<view style="display: flex; justify-content: flex-end;font-size: 20rpx;">
						<text style="color: #eeeeee;">{{item.creatTime}}</text>
					</view>
				</view>
				<view style="height: 15rpx;"></view>
			</view>
		</nut-tab-pane>
	</nut-tabs>
	<nut-popup position="bottom" round v-model:visible="showRound" closeable>
		<view style="text-align: center;margin-top: 60px;margin-bottom: 40px;">
			<button @click="jubao">举报</button>
			<button>拉黑</button>
			<button>删除</button>
		</view>
	</nut-popup>
</template>

<script>
	import { staticUrl } from "@/common/config.js"; // 全局配置文件
	import { mapState } from 'vuex';
	import {
		reactive
	} from 'vue';
	import {
		getMyLetter
	} from "@/common/api/piaoliupingApi";
	export default {
		setup() {
			const state = reactive({
				tab2value: '0',
			});
			return {
				state
			};
		},
		data() {
			return {
				User:{},
				isList1Empty: false,
				isList2Empty: false,
				female: "/static/images/female.png",
				male: "/static/images/male.png",
				scrollHeight: "100px",
				showRound: false,
				list1: [{
					id:1,
					userId: 1,
					Avatar: 'https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png',
					Nickname: '明月几时有',
					content: '蜀道难难于上青天',
					imagePath: '../../static/test.png',
					Gender: 'male',
					Age: 32,
					Level: 4,
					Datetime: '12月5日',
				}],
				list2: [],
				id: 0
			}
		},
		onLoad(res) {
			let s = this
			uni.getSystemInfo({
				success(res) {
					s.scrollHeight = res.windowHeight + "px";
				},
			});
			this.isList1Empty = this.list1.length<1;
			this.isList2Empty = this.list2.length<1;
			getMyLetter().then(res => {
					this.list2 = res.data
					this.list2.forEach(item => {
						if (item.imagePath) {
							item.imagePath = staticUrl + item.imagePath
						}
					})
					this.isList2Empty = this.list2.length<1;
				})
		},
		methods: {
			toBox(name) {
				const url = `/pages/mailbox/index?type=${name}`;
				uni.navigateTo({
					url
				})
			},
			show(id) {
				this.showRound = true
				this.id = id
			},
			load(t) {
				uni.setNavigationBarTitle({
					title: t.title
				})
			},
			jubao() {
				console.log("举报" + this.id)
				this.showRound = false
				uni.navigateTo({
						url: '/pages/message/accusation?userId=' + this.userInfo.id + '&nickName=' + this.userInfo.nickName,
				});
				this.$emit('close');
			}
		}
	}
</script>

<style lang="scss">
	$space: 8rpx;
	$contentFontSize: 25rpx;

	:root,
	page {
		background-color: #000;
		--nut-tab-pane-background: #000;
		--nut-tabs-titles-item-font-size: 25;
		--nut-tabs-titles-item-color: #ffffff;
		--nut-tabs-titles-background-color: #000;
		--nut-tabs-titles-item-active-color: #55aaff;
	}

	button {
		background-color: #ffffff;
		border: 0 none #ffffff;
		font-size: 20px;
	}

	.container {
		background-color: #000;
		padding: 10px;
		box-shadow: 0px 0px 5px #ccc;
		border-radius: 31px;
		border-width: 0px;
		border-style: solid;
		border-color: #ccc;
	}

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
		color: #ffffff;
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
		display: flex;
		flex-direction: column;
		margin: $space * 2;
		font-size: $contentFontSize;
		color: #808080;
		overflow: hidden;
		padding: 10px;
		box-shadow: 0px 0px 0px #00afee;
		border-radius: 31px;
		border: 1px solid #00afee;
	}

	.datetime {
		font-size: $contentFontSize;
		color: #808080;
	}
</style>
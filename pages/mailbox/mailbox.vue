<template>
	<nut-tabs background="#00s0" v-model="state.tab2value" :auto-height="true" type="smile" swipeable @click="load">
		<nut-tab-pane title="收件箱" pane-key="0">
			<nut-empty ifdescription="无数据" v-if="isList1Empty"></nut-empty>
			<view class="container" v-for="(item, index) in list1" :key="index">
				<view class="item">
					<view class="avatar">
						<nut-avatar size="large">
							<img :src="staticUrl+item.avatar" mode="aspectFill"/>
						</nut-avatar>
					</view>
					<view class="info">
						<view class="text userdata">
							<view class="nickname">{{ item.nickName }}</view>
							<nut-tag class="gender-age" :type="(item.sex==='male' ? 'primary' : 'warning')" round>
								<nut-icon :name="'/static/images/' + item.sex + '.png'" color="white" />
								{{ item.age }}岁
							</nut-tag>
							<image :src="'/static/mailbox/LV' + item.level +'.png'"
								style="height: 14px;width: 30px;margin-left: 2px;">
							</image>
						</view>
						<view class="text datetime">{{ item.creatTime }}</view>
					</view>
					<nut-icon name="more-s" size="25" custom-color="#fff" style="align-self: flex-end;"
						@click="show(item.userId,item.id,index)"></nut-icon>
				</view>
				<view class="text content" @click="toInbox1(item)">
					<text style="color: #fff;">{{ item.content }}</text>
					<image v-if="item.imagePath" style="height: 200px;margin-top: 5px;" mode="aspectFit" :src="staticUrl+item.imagePath"></image>
				</view>
			</view>
		</nut-tab-pane>
		<nut-tab-pane title="发件箱" pane-key="1">
			<nut-empty ifdescription="无数据" v-if="isList2Empty"></nut-empty>
			<view v-for="(item, index) in list2" :key="index">
				<view class="container" @click="toInbox(item.id)">
					<view class="text content">
						<text style="color: #fff;">{{ item.content }}</text>
						<image v-if="item.imagePath" style="height: 200px;margin-top: 5px;" mode="aspectFit" :src="staticUrl+item.imagePath"></image>
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
			<button @click="blockUser()">拉黑</button>
			<button @click="deleteLetter()">删除</button>
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
		black,
		getMyLetter,
		getInLetter,
		deleteInLetter
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
				staticUrl: staticUrl,
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
					avatar: 'https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png',
					nickName: '明月几时有',
					content: '蜀道难难于上青天',
					imagePath: '../../static/test.png',
					sex: 'male',
					age: 32,
					level: 4,
					creatTime: '12月5日',
				}],
				list2: [],
				userId: 0,
				letterId: 0,
				index: 0,
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
				this.isList2Empty = this.list2.length<1;
			})
			getInLetter().then(res => {
				this.list1 = res.data
				this.isList1Empty = this.list1.length<1;
			})
		},
		methods: {
			deleteLetter(){
				//删除此信件
				deleteInLetter(this.letterId).then(res => {
					if(res.code === 200) {
						uni.showToast({
							title: "删除成功",
							icon: 'none',
							duration: 2000,
						});
						this.list1.splice(this.index,1)
						this.showRound = false
					}else{
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000,
						});
					}
				})
			},
			toBox(name) {
				const url = `/pages/mailbox/index?type=${name}`;
				uni.navigateTo({
					url
				})
			},
			show(userId,letterId,index) {
				this.showRound = true
				this.userId = userId
				this.letterId = letterId
				this.index = index
			},
			load(t) {
				uni.setNavigationBarTitle({
					title: t.title
				})
			},
			blockUser() {
				black(this.userId).then(res => {
					uni.showToast({
						title: res.data,
						icon: 'none',
						duration: 2000,
					});
				});
				this.showRound = false
			},
			toInbox(letterId){
				uni.navigateTo({
						url: '/pages/mailbox/inbox?letterId=' + letterId,
				});
			},
			toInbox1(letter){
				uni.setStorageSync("letter",letter)
				uni.navigateTo({
						url: '/pages/mailbox/inbox',
				});
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
		--nut-tag-height: 15px;
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
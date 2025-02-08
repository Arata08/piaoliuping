<template>
	<nut-tabs background="#00s0" v-model="state.tab2value" :auto-height="true" type="smile" swipeable="true">
		<nut-tab-pane title="收件箱" pane-key="0">
			<view class="container">
				<view class="item">
					<view class="avatar">
						<nut-avatar size="large">
							<img
								src="https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png" />
						</nut-avatar>
					</view>
					<view class="info">
						<view class="text userdata">
							<view class="nickname">明月几时有</view>
							<nut-tag class="gender-age" type="primary" round>
								<nut-icon :name="male" color="white" />
								32
							</nut-tag>
							<image src="/static/mailbox/LV1.png" style="height: 23px;width: 47px;margin-left: 2px;">
							</image>
						</view>
						<view class="text datetime">12月5日</view>
					</view>
					<nut-icon name="more-s" size="25" custom-color="#fff" style="align-self: flex-end;"
						@click="showRound = true"></nut-icon>
				</view>
				<view class="text content">
					蜀道之难难于上青天
				</view>
			</view>
		</nut-tab-pane>
		<nut-tab-pane title="发件箱" pane-key="1"> Tab 2 </nut-tab-pane>
	</nut-tabs>
	<nut-popup position="bottom" round v-model:visible="showRound">
		<view style="text-align: center;margin-top: 15px;">
			<text>举报</text>
			<nut-divider :custom-style="{ color: '#e7e7e7', borderColor: '#e7e7e7'}" />
			<text>拉黑</text>
			<nut-divider :custom-style="{ color: '#e7e7e7', borderColor: '#e7e7e7'}" />
			<text>删除</text>
		</view>
	</nut-popup>
</template>

<script>
	import {
		reactive
	} from 'vue';
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
				female: "/static/images/female.png",
				male: "/static/images/male.png",
				scrollHeight: "100px",
				showRound: false
			}
		},
		onLoad(res) {
			let s = this
			uni.getSystemInfo({
				success(res) {
					s.scrollHeight = res.windowHeight + "px";
				},
			});
		},
		methods: {
			toBox(name) {
				const url = `/pages/mailbox/index?type=${name}`;
				uni.navigateTo({
					url
				})
			},
		}
	}
</script>

<style lang="scss">
	$space: 8rpx;
	$contentFontSize : 25rpx;

	:root,
	page {
		background-color: #000;
		--nut-tab-pane-background: #000;
		--nut-tabs-titles-item-font-size: 25;
		--nut-tabs-titles-item-color: #ffffff;
		--nut-tabs-titles-background-color: #000;
		--nut-tabs-titles-item-active-color: #55aaff;
	}

	.container {
		background-color: #000;
		padding: 10px;
		box-shadow: 0px 0px 11px #ccc;
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
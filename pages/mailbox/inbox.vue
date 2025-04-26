<template>
	<view class="container">
		<view class="item">
			<view class="avatar">
				<nut-avatar size="large">
					<img :src="this.letter.avatar" />
				</nut-avatar>
			</view>
			<view class="info">
				<view class="text userdata">
					<view class="nickname">{{ this.letter.nickName }}</view>
					<nut-tag class="gender-age" :type="(this.letter.sex==='male' ? 'primary' : 'warning')" round>
						<nut-icon :name="'/static/images/' + this.letter.sex + '.png'" color="white" />
						{{ this.letter.age }}岁
					</nut-tag>
					<image :src="'/static/mailbox/LV' + this.letter.level +'.png'"
						style="height: 20px;width: 43px;margin-left: 2px;">
					</image>
				</view>
				<view class="text datetime">{{ this.letter.creatTime }}</view>
			</view>
			<nut-button @click="reportUser()" custom-color="#410b06">举报</nut-button>
		</view>
		<view class="textCon">
			<text style="color: aliceblue;">{{ this.letter.content }}</text>
			<image v-if="this.letter.imagePath" style="height: 250px;margin-top: 5px;" mode="aspectFit" :src="this.letter.imagePath"></image>
		</view>
		<view class="bottomCon">
			<view style="padding: 5px;color: aqua;border-radius: 15px;background-color: #1e1e1e;font-size: 25rpx;">
				圈子：{{this.letter.subject}}
			</view>
			<view style="display: flex;flex-direction: row;margin-top: 10rpx;">
				<view>
					<nut-icon name="locationg3" custom-color="#fa2c19"></nut-icon>
				</view>
				<text style="color: azure;">
					{{this.letter.city}}
				</text>
			</view>
			<nut-button size="normal" @click="conect()" custom-color="#7232dd">私聊</nut-button>
		</view>
	</view>
</template>

<script>
	export default {
		setup() {
			return {
			};
		},
		data() {
			return {
				female: "/static/images/female.png",
				male: "/static/images/male.png",
				letter: {
					id:1,
					userId: 1,
					avatar: 'https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png',
					nickName: '明月几时有',
					content: '蜀道难难于上青天',
					subject: "啊啊啊啊嘻嘻嘻",
					imagePath: 'https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png',
					sex: 'male',
					age: 32,
					level: 4,
					city:"南京",
					creatTime: '2025-04-26 14:38:24',
				}
			}
		},
		onLoad(res) {
		},
		methods: {
			conect(){
				if (!this.letter.avatar.startsWith('http')) {
					uni.navigateTo({
						url: `/pages/message/message?nickName=${this.letter.nickName}&avatar=${staticUrl + this.letter.avatar}&friendId=${this.letter.userId}`
					});
				} else {
					uni.navigateTo({
						url: `/pages/message/message?nickName=${this.letter.nickName}&avatar=${this.letter.avatar}&friendId=${this.letter.userId}`
					})
				}
			},
			reportUser() {
				uni.navigateTo({
						url: '/pages/message/accusation?userId=' + this.letter.userId + '&nickName=' + this.letter.nickName,
				});
				this.$emit('close');
			},
		}
	}
</script>

<style lang="scss">
	$space: 8rpx;
	$contentFontSize: 25rpx;
	:root,
	page {
		background-color: #000;
	}
	.container {
		background-color: #000;
		padding: 10px;
		box-shadow: 0px 0px 5px #ccc;
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

		.text1 {
			color: #808080;
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
	.textCon{
		border-radius: 15px;
		padding: 10px;
		background-color: #1e1e1e;
	}
	.bottomCon{
    margin-top: 10rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
	}
</style>
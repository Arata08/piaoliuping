<template>
	<view>
		<scroll-view scroll-y="true">
			<view v-for="(item,index) in list" :key="index">
				<view class="container">
					<view style="display: flex;flex-direction: row">
						<view class="nickname">{{ item.nickName }}</view>
						<view class="gender-age">
							<nut-tag :type="(item.sex==='male' ? 'primary' : 'warning')" round>
								<nut-icon :name="'/static/images/' + item.sex + '.png'" color="white" />
								{{ item.age }}
							</nut-tag>
						</view>
						<image v-if="item.vip" src="/static/my/vipa.png" style="height: 20px;width: 20px;margin-left: 5px"></image>
					</view>

					<view style="display: flex;flex-direction: row;margin-top: 5px">
						<nut-icon name="message" class="nut-icon-am-shake nut-icon-am-infinite"></nut-icon>
						<text style="margin-left: 5px;color: #00d1ff">{{item.offline}}</text>
						<text style="margin-left: 20px;">{{item.area}}</text>
					</view>


					<view style="display: flex;margin-top: 5px">
						粉丝数：{{item.fan}}
						<text style="margin-left: 20px;">注册天数：{{item.loginDays}}</text>
					</view>
					<view class="dazhaohu">
						<nut-avatar size="large">
							<image
								src="https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png" />
						</nut-avatar>
						<button class="but"><text style="font-size: 27rpx;color: #ebebeb;">私聊</text></button>
					</view>

				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import {getFollowList} from "@/common/api/piaoliupingApi";
	let list = ref([{
		id: 1,
		nickName: '张三',
		age: 18,
		sex: 'male',
		offline: "3秒前在线",
		area: '北京',
		fan: 200,
		loginDays: 30,
		vip: true,
	}, {
		id: 2,
		nickName: '李四',
		age: 20,
		sex: 'female',
		offline: "3秒前在线",
		area: '上海',
		fan: 100,
		loginDays: 20,
		vip: false,
	}])
	//获取关注列表
		getFollowList().then(res=>{
			list.value=res.data
		console.log(list.value)
		})
</script>

<style>
	page {
		background-color: #0d142e;
		color: aliceblue;
	}

	:root,
	page {
		--nut-tag-height: 16px;
		--nut-cell-group-title-font-size: 20px;
		--nut-cell-group-title-color: #000000;
	}

	.dazhaohu {
		display: flex;
		position: absolute;
		right: 30px;
		margin-top: 10rpx;
	}

	.but {
		height: 70rpx;
		background-color: #23bbd4;
		border-radius: 15px;
		margin-top: 20rpx;
		margin-left: 5rpx;
		display: flex;
	}

	.container {
		padding: 10px 20px;
		display: flex;
		flex-direction: column;
		margin: 10px 20px;
		background-color: #151c39;
		border-radius: 15px;
		border: rgba(158, 190, 255, 0) 1px solid;
	}

	.gender-age {
		margin-left: 10px;
		margin-top: 2px;
	}
</style>
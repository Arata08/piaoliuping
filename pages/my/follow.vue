<template>
	<view>
		<nut-tabs background="#00s0" v-model="state.tab2value" :auto-height="true" type="smile" swipeable @click="load">
			<nut-tab-pane title="关注" pane-key="0">
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
								<image v-if="item.vip" src="/static/my/vipa.png" style="height: 20px;width: 20px;margin-left: 5px">
								</image>
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
									<image :src="staticUrl + item.avatar" @click="showModal(item)"/>
								</nut-avatar>
							</view>

						</view>
					</view>
				</scroll-view>
			</nut-tab-pane>
			<nut-tab-pane title="拉黑" pane-key="1">
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
								<image v-if="item.vip" src="/static/my/vipa.png" style="height: 20px;width: 20px;margin-left: 5px">
								</image>
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
									<image :src="staticUrl + item.avatar" />
								</nut-avatar>
								<button class="but"><text style="font-size: 27rpx;color: #ebebeb;">私聊</text></button>
							</view>

						</view>
					</view>
				</scroll-view>
			</nut-tab-pane>
		</nut-tabs>
		<UserInfoModal :userInfo="selectedUser" :visible="isModalVisible" @close="closeModal"
			:windowWidth="windowWidth" />
	</view>
</template>

<script setup lang="ts">
	import UserInfoModal from '@/components/user-detail/user-detail'
	import { Ref, reactive, ref } from 'vue'
	import { staticUrl } from "@/common/config.js"; // 全局配置文件
	import { getFollowList } from "@/common/api/piaoliupingApi";
	import method from '../../uni_modules/tuniaoui-vue3/libs/async-validator/validator/method';
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
		createTime: "2022-01-01 00:00:00",
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
		createTime: "2022-01-01 00:00:00",
	}])
	let windowWidth = ref(uni.getSystemInfoSync().windowWidth * 0.8);
	const state = reactive({
		tab2value: '0',
	});
	let selectedUser = ref(null);
	let isModalVisible = ref(false);
	//获取关注列表
	getFollowList().then(res => {
		list.value = res.data
		console.log(list.value)
	})
	const load = (t) => {
		console.log('Title:', t);
		const length = list.length;
		uni.setNavigationBarTitle({
		title: t.title
		})
		if (t.paneKey === 1 && length < 1) {
		
		}
		// 添加你的逻辑
	}
  const showModal = (user: Ref<any>) => {
    let user1 = Object.assign({}, user); // 创建 user 对象的浅拷贝
    user1.avatar = staticUrl + user1.avatar; // 修改副本的 avatar 属性
		console.log(user1)
    selectedUser.value = user1;
    isModalVisible.value = true;
  }
	const closeModal = () => {
		isModalVisible.value = false;	
	}
</script>

<style>
	page {
		background-color: #0d142e;
		color: aliceblue;
	}

	:root,
	page {
		--nut-tab-pane-background: #0d142e;
		--nut-tabs-titles-item-font-size: 25;
		--nut-tabs-titles-item-color: #ffffff;
		--nut-tabs-titles-background-color: #000;
		--nut-tabs-titles-item-active-color: #55aaff;
		--nut-tag-height: 16px;
		--nut-cell-group-title-font-size: 20px;
		--nut-cell-group-title-color: #0d142e;
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
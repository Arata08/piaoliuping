<template>
	<view :style="{ marginTop: statusBarHeight + 'px' }">
		<TnNavbar height="45px" back-text=" " bg-color="#000" text-color="#fff"> 看一看 </TnNavbar>
	</view>
  
	<view>
		<view class="serch">
			<TnSearchBox placeholder="查找" border="true" text-color="#ffffff" v-model="searchValue"
				@input="searchInputEvent" @search="searchBtnClickEvent" />
		</view>

		<view style="display: flex;flex-direction: row;margin: 10px 20px;font-size: 15px;" @click="showRound=true">
			<image style="width: 17px;height: 17px;margin-top: 2px;margin-right: 3px;" src="/static/shaixuan.png"></image>
			<text>{{order}}</text>
			<nut-icon name="triangle-down"></nut-icon>
		</view>

		<scroll-view scroll-y="true">
			<nut-empty ifdescription="无数据" v-if="isListEmpty"></nut-empty>
			<view v-for="(item,index) in list" :key="index">
				<view class="container">
					<view style="display: flex;flex-direction: row">
						<view>{{ item.nickName }}</view>
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
						<text style="margin-left: 20px;">{{item.city}}</text>
					</view>


					<view style="display: flex;margin-top: 5px">
						粉丝数：{{item.flower}}
						<text style="margin-left: 20px;">注册天数：{{item.registerDay}}</text>
					</view>

					<button class="dazhaohu" @click="conect(item)">
						<text style="font-size: 12px;color: aliceblue;">打招呼</text>
						<text style="font-size: 10px;margin-top: -12px;color: aliceblue;">-5星币</text>
					</button>
				</view>
			</view>
		</scroll-view>

		<nut-popup position="bottom" round v-model:visible="showRound" closeable>
			<view style="text-align: center;margin-top: 20px;margin-bottom: 40px;">
				<view style="display: flex;flex-direction: column;margin-top: -20px">
					<nut-cell-group title="筛选条件">
						<nut-checkbox-group v-model="filter" shape="button">
							<text>&nbsp;&nbsp;</text>
							<nut-checkbox v-for="(item, index) in filterOptions" :key="index" :label="item.value" shape="button">
								{{ item.label }}
							</nut-checkbox>
						</nut-checkbox-group>
					</nut-cell-group>
					<view style="margin-top: -20px;">
						<nut-cell-group title="排序条件">
							<nut-radio-group v-model="order" direction="horizontal">
								<text>&nbsp;&nbsp;</text>
								<nut-radio v-for="(item, index) in sortOptions" :key="index" :label="item.value" shape="button">
									{{ item.label }}
								</nut-radio>
							</nut-radio-group>
						</nut-cell-group>
					</view>
				</view>

				<nut-button size="large" custom-color="linear-gradient(to right, #8FE6EE, #00D1FF)"
					@click="submit">查找</nut-button>
			</view>
		</nut-popup>
	</view>
</template>

<script setup lang="ts">
	import {baseUrl} from "@/common/config";
	import { onLoad } from '@dcloudio/uni-app'
	import TnNavbar from '@/uni_modules/tuniaoui-vue3/components/navbar/src/navbar.vue'
	import TnSearchBox from '@/uni_modules/tuniaoui-vue3/components/search-box/src/search-box.vue'
	import { computed, ref } from 'vue'
	import {
		getFilterUserList
	} from "@/common/api/piaoliupingApi";
	const statusBarHeight = uni.getStorageSync("SystemInfoSync").statusBarHeight
	const searchValue = ref('')
	const filter = ref([])
	const order = ref('排序')
	const showRound = ref(false)
	const list = ref([{
		id: 1,
		nickName: '张三',
		age: 18,
		sex: 'male',
		offline: "3秒前在线",
		city: '北京',
		flower: 100,
		fan: 200,
		registerDay: 30,
		vip: true,
	}, {
		id: 2,
		nickName: '李四',
		age: 20,
		sex: 'female',
		offline: "3秒前在线",
		city: '上海',
		flower: 200,
		fan: 100,
		registerDay: 20,
		vip: false,
	}])
	const filterOptions = [
		{ label: '在线中', value: '1' },
		{ label: '男生', value: '2' },
		{ label: '女生', value: '3' },
		{ label: 'vip用户', value: '4' },
		{ label: '注册超过3天', value: '5' },
		{ label: '有粉丝', value: '6' },
		{ label: '成年人', value: '7' },
		{ label: '附件50km以内', value: '8' }
	]
	const sortOptions = [
		{ label: '在线时间 由近->远', value: '在线时间 由近->远', },
		{ label: '被关注数 由多->少', value: '被关注数 由多->少', },
		{ label: '注册时间 由近->远', value: '注册时间 由近->远', },
		{ label: '注册时间 由远->近', value: '注册时间 由远->近', }
	];
	onLoad(() => {
	  console.log('页面加载')
		getFilterUserList().then(res => {
			list.value = res.data
		});
		uni.getLocation({
			type: 'wgs84',
			success: function (res) {
				console.log('当前位置的经度：' + res.longitude);
				console.log('当前位置的纬度：' + res.latitude);
				uni.request({
					url: baseUrl + '/user/setUserLocation',
						method: 'POST',
						data: {
							latitude: res.latitude,
							longitude: res.longitude,
							userId: uni.getStorageSync('User').id
						},
						header: {
							'token': uni.getStorageSync('token')
						}
				})
			},
			fail: function (err) {
				console.log(err)
			}
		});
	})
	const searchInputEvent = (value : string) => {
		// eslint-disable-next-line no-console
		console.log('searchInputEvent', value)
	}
	const searchBtnClickEvent = (value : string) => {
		// eslint-disable-next-line no-console
		console.log('searchBtnClickEvent', value)
	}
	function iconClick(type : string) {
		uni.showToast({
			title: `点击了${type === 'prefix' ? '左侧' : '右侧'}的图标`,
			icon: 'none'
		})
	}
	function submit() {
		showRound.value = false
		console.log(filter.value, order.value)
		let data = {
			filter: filter.value,
			order: order.value,
		}
		getFilterUserList(data).then(res => {
			list.value = res.data
		});
		uni.showToast({
			title: '提交成功',
			icon: 'none'
		})
	}
	const conect = (item: { nickName: String; avatar: String; id: number; }) => {
		uni.navigateTo({
			url: `/pages/message/message?nickName=${item.nickName}&avatar=${item.avatar}&friendId=${item.id}`
		})
	}
	const isListEmpty = computed(() => list.value.length === 0);
</script>
<style>
	:root,
	page {
		background-color: #000;
		color: aliceblue;
		--nut-tag-height: 16px;
		--nut-cell-group-title-font-size: 20px;
		--nut-cell-group-title-color: #000000;
		--nut-checkbox-button-font-size: 15px;
		--nut-radio-button-font-size: 15px;
	}
</style>
<style scoped>
	.dazhaohu {
		display: flex;
		flex-direction: column;
		position: absolute;
		margin-top: 17px;
		right: 30px;
		background-color: #23bbd4;
		border-radius: 15px;
	}

	.serch {
		width: 90% !important;
		margin-top: 10px !important;
		margin-left: 5% !important;
	}

	.container {
		padding: 10px 20px;
		display: flex;
		flex-direction: column;
		margin: 10px 20px;
		background-color: #121b40;
		border-radius: 15px;
		border: rgba(158, 190, 255, 0) 1px solid;
	}

	.gender-age {
		margin-left: 10px;
		margin-top: 2px;
	}
</style>
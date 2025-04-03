<template>
	<view>
		<view class="serch">
			<TnSearchBox placeholder="查找" border="false" clearable text-color="#f5f5f5" v-model="searchValue"
				@input="searchInputEvent" @search="searchBtnClickEvent" />
		</view>

		<view style="display: flex;flex-direction: row;margin: 10px 20px;font-size: 15px;" @click="showRound=true">
			<image style="width: 25px;height: 25px;" src="/static/shaixuan.png">
			</image>
			<text>{{order}}</text>
			<view style=""><nut-icon name="triangle-down"></nut-icon></view>
		</view>

		<scroll-view scroll-y="true">
			<view v-for="(item,index) in list" :key="index">
				<view class="container">
					<view style="display: flex;flex-direction: row">
						<view>{{ item.nickName }}</view>
						<view class="gender-age">
							<nut-tag :type="(item.sex==='male' ? 'primary' : 'warning')" round>
								<nut-icon :name="'/static/images/' + item.sex + '.png'" color="white"/>
								{{ item.age }}
							</nut-tag>
						</view>
						<image v-if="item.vip" src="/static/my/vipa.png"
							style="height: 20px;width: 20px;margin-left: 5px"></image>
					</view>

					<view style="display: flex;flex-direction: row;margin-top: 5px">
						<nut-icon name="message" class="nut-icon-am-shake nut-icon-am-infinite"></nut-icon>
						<text style="margin-left: 5px;color: #00d1ff">{{item.offline}}</text>
						<text style="margin-left: 20px;">{{item.city}}</text>
					</view>


					<view style="display: flex;margin-top: 5px">
						粉丝数：{{item.flow}}
						<text style="margin-left: 20px;">注册天数：{{item.loginDays}}</text>
					</view>

					<button class="dazhaohu"><text style="font-size: 12px;">打招呼</text><text
							style="font-size: 10px;margin-top: -12px">-5星币</text></button>
				</view>
			</view>
		</scroll-view>

		<nut-popup position="bottom" round v-model:visible="showRound" closeable>
			<view style="text-align: center;margin-top: 20px;margin-bottom: 40px;">
				<view style="display: flex;flex-direction: column;">
					<nut-cell-group title="筛选条件">
						<nut-cell>
              <nut-checkbox-group v-model="filter" shape="button">
                <nut-checkbox label="1" shape="button">在线中</nut-checkbox>
                <nut-checkbox label="2" shape="button">男生</nut-checkbox>
                <nut-checkbox label="3" shape="button">女生</nut-checkbox>
                <nut-checkbox label="4" shape="button">vip用户</nut-checkbox>
                <nut-checkbox label="5" shape="button">注册超过3天</nut-checkbox>
                <nut-checkbox label="6" shape="button">有粉丝</nut-checkbox>
                <nut-checkbox label="7" shape="button">成年人</nut-checkbox>
                <nut-checkbox label="8" shape="button">附件50km以内</nut-checkbox>
              </nut-checkbox-group>
						</nut-cell>
					</nut-cell-group>
					<view style="margin-top: -30px">
						<nut-cell-group title="排序条件">
							<nut-cell>
								<nut-radio-group v-model="order" direction="horizontal">
									<nut-radio shape="button" label="在线时间 由近->远">在线时间 由近->远</nut-radio>
									<nut-radio shape="button" label="被关注数 由多->少">被关注数 由多->少</nut-radio>
									<nut-radio shape="button" label="注册时间 由近->远">注册时间 由近->远</nut-radio>
									<nut-radio shape="button" label="注册时间 由远->近">注册时间 由远->近</nut-radio>
								</nut-radio-group>
							</nut-cell>
						</nut-cell-group>
					</view>
				</view>

				<nut-button size="large" custom-color="linear-gradient(to right, #8FE6EE, #00D1FF)"
					@click="submit">大号按钮</nut-button>
			</view>
		</nut-popup>
	</view>
</template>

<script setup lang="ts">
	import TnSearchBox from '@/uni_modules/tuniaoui-vue3/components/search-box/src/search-box.vue'
	import { ref } from 'vue'
	const searchValue = ref('')
	const radioVal = ref('')
	const filter = ref([])
	const order = ref('s')
	const showRound = ref(false)
	const list = ref([{
		id: 1,
		nickName: '张三',
		age: 18,
		sex: 'male',
		offline: "3秒前在线",
		city: '北京',
		flow: 100,
		fan: 200,
		loginDays: 30,
		vip: true,
	}, {
		id: 2,
		nickName: '李四',
		age: 20,
		sex: 'female',
		offline: "3秒前在线",
		city: '上海',
		flow: 200,
		fan: 100,
		loginDays: 20,
		vip: false,
	}])
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
		uni.showToast({
			title: '提交成功',
			icon: 'none'
		})
	}
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
		background-color: #151c39;
		border-radius: 15px;
		border: rgba(158, 190, 255, 0) 1px solid;
	}

	.gender-age {
		margin-left: 10px;
		margin-top: 2px;
	}
</style>
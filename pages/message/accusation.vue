<template>
	<view>
		<nut-config-provider theme="dark">
			<view style="border: 1px solid #00001a;border-radius: 15px;margin: 30px 15px 15px 15px;">
				<nut-textarea v-model="content" limit-show max-length="255" />
			</view>
			<view style="margin: 15px;display: flex;">
				<view style="margin-top: -1px;margin-right: 5px;">
					<nut-icon name="eye"></nut-icon>
				</view>
				举报将会默认提供被举报人的聊天信息，请谨慎使用
			</view>
			<view style="margin: 15px;">
				<nut-button block type="primary" @click="submit()">提交</nut-button>
			</view>
		</nut-config-provider>
	</view>
</template>

<script>
	import {
		accusation
	} from "@/common/api/piaoliupingApi";
	export default {
		data() {
			return {
				id: 0,//被举报者id
				content: '',
			}
		},
		onLoad(options) {
			uni.setNavigationBarTitle({
				title: '举报：' + options.nickName
			});
			this.id = options.userId;
		},
		methods: {
			submit() {
				//筛选出是userType: "self"的content的内容加入list中
				let chatList = uni.getStorageSync('chatList'+this.id).filter(item => item.userType === 'friend');
				//将list筛选只保留content字段和type字段
				chatList = chatList.map(item => {
					return {
						content: item.content,
						type: item.type,
					}
				})
				let data = {
					accusationUserId: this.id,
					content: this.content,
					chat: chatList
				}
				accusation(data).then(res => {})
			}
		}
	}
</script>

<style>
	:root,
	page {
		background-color: #00001a;
		color: aliceblue;
	}
</style>

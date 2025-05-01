<template>
	<view>
		<nut-config-provider theme="dark">
			<nut-cell v-if="isL" title="举报信件内容" :desc="letterCon"></nut-cell>
			<view style="border: 1px solid #00001a;border-radius: 15px;margin: 30px 15px 15px 15px;">
				<nut-textarea placeholder="请输入举报理由" v-model="content" limit-show max-length="255" />
			</view>
			<view style="margin: 15px;display: flex;" v-if="!isL">
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
				//是否举报的为信件
				isL: false,
				letterCon: ''
			}
		},
		onLoad(options) {
			uni.setNavigationBarTitle({
				title: '举报：' + options.nickName
			});
			if(options.isL){
				this.isL = true;
				this.letterCon = uni.getStorageSync('letter').content;
			}
			this.id = options.userId;
		},
		methods: {
			submit() {
				if (this.content === '') {
					uni.showToast({
						title: '理由不能为空',
						icon: 'error',
						duration: 2000,
					})
					return;
				}
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
				accusation(data).then(res => {
					if (res.code === 200) {
						uni.showToast({
							title: '举报成功',
							icon: 'success',
							duration: 1500,
						})
						//1.5s后返回上一页
						setTimeout(() => {
							uni.navigateBack({
								delta: 1,
							})
						}, 1500)
					}else{
						uni.showToast({
							title: res.msg,
							icon: 'error',
							duration: 2000,
						})
					}
				})
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

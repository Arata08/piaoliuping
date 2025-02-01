<template>
	<view>
		<view class="editaddress">
			<view class="content">
				<view style="margin: 0 auto;">
					<nut-avatar size="100">
						<image
							src="https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png" />
					</nut-avatar>
					<nut-uploader :url="uploadUrl"></nut-uploader>
				</view>
				<view class="row">
					<view class="nominal">昵称</view>
					<view class="input"><input placeholder="请输入昵称" v-model="nickName" type="text" />
					</view>
				</view>
				<view class="row">
					<view class="nominal">生日</view>
					<view class="input selectcity" @tap="open('birthday')">
						<view class="city">{{birthday}}</view>
					</view>
				</view>
				<view class="row">
					<view class="nominal">所在地区</view>
					<view class="input selectcity" @tap="open('selectcity')">
						<view class="city">{{province}} {{city}} {{area}}</view>
					</view>
				</view>
			</view>
			<view class="save">
				<view class="btn" :style="'background:' + colors">保存</view>
			</view>

			<nut-popup v-model:visible="dateshow" position="bottom" safe-area-inset-bottom>
				<nut-date-picker v-model="currentDate" :min-date="minDate" :max-date="maxDate" is-show-chinese
					@confirm="onConfirm" @cancel="dateshow = false">
				</nut-date-picker>
			</nut-popup>
			<cityPicker :column="column" :default-value="defaultValue" :mask-close-able="maskCloseAble"
				@confirm="confirm" @cancel="cancel" :visible="visible" />
		</view>

	</view>
</template>

<script lang="ts">
	import {
		ref
	} from 'vue';
	import cityPicker from '@/components/piaoyi-cityPicker/components/piaoyi-cityPicker/piaoyi-cityPicker'

	const minDate = new Date(2020, 0, 1)
	const maxDate = new Date(2025, 10, 1)

	const currentDate = ref<Date>(new Date(2022, 4, 10))
	export default {
		components: {
			cityPicker
		},
		data() {
			return {
				nickName: "",
				phone: "",
				baseBirthday: null,
				birthday: "",
				visible: false,
				dateshow: false,
				column: 3,
				province: "江苏省",
				city: "南京市",
				area: "玄武区",
				maskCloseAble: true,
				defaultValue: ['广东省', '广州市', '天河区'],
				colors: "#f23a3a",
			};
		},
		methods: {
			updateAvatar() {
				this.$u.route('/pages/my/avatar')
			},
			open(v : string) {
				if (v == 'selectcity') {
					this.visible = true
				} else if (v == 'birthday') {
					this.dateshow = true
				}
			},
			confirm(val) {
				console.log(val)
				this.province = val.provinceName;
				this.city = val.cityName;
				this.area = val.areaName;
				this.visible = false
			},
			cancel() {
				this.visible = false
			},
			onConfirm(date) {
				let a = new Date(date.date)
				this.baseBirthday = a;
				this.birthday = a.getFullYear() + "年-" + (a.getMonth() + 1) + "月-" + a.getDate() + "日";
				this.dateshow = false
			},
		}
	};
</script>

<style>
	page {
		background: linear-gradient(180deg, #000000 0%, #55ffff 49.98%, #000000 100%);
	}
</style>

<style lang="scss" scoped>
	.save {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 120upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.save view {
		display: flex;
	}

	.save .btn {
		box-shadow: 0upx 5upx 10upx rgba(0, 0, 0, 0.4);
		width: 70%;
		height: 80upx;
		border-radius: 80upx;
		background-color: #f23a3a;
		color: #fff;
		justify-content: center;
		align-items: center;
		font-size: 30upx;
		margin-bottom: 60px;
	}

	.save .btn .icon {
		height: 80upx;
		color: #fff;
		font-size: 30upx;
		justify-content: center;
		align-items: center;
	}

	.content {
		display: flex;
		flex-wrap: wrap;
		margin-top: 40upx;
	}

	.content view {
		display: flex;
	}

	.content .row {
		width: 92%;
		margin: 0 4%;
		border-bottom: solid 1upx #eee;
	}

	.content .row .nominal {
		width: 30%;
		height: 80upx;
		font-size: 28upx;
		font-family: Droid Sans Fallback;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		align-items: center;
	}

	.content .row .input {
		width: 70%;
		padding: 20upx 0;
		align-items: center;
		font-size: 28upx;

	}

	.content .row .input input {
		font-size: 28upx;
		color: #333333;
	}

	.content .row .switch {
		justify-content: flex-end;
	}

	.content .row .input textarea {
		margin-top: 30rpx;
		min-height: 40upx;
		line-height: 40upx;
	}

	.content .del_box {
		width: 100%;
		display: block;
		overflow: hidden;
		margin-right: 30upx;
	}

	.content .del {
		width: 240upx;
		height: 80upx;
		float: right;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		color: #F23A3A;
		margin: 0 auto;
		margin-top: 50upx;
		border-radius: 38upx;
		background-color: rgba(255, 0, 0, 0.05);
		border-bottom: solid 1upx #eee;
	}

	.selectcity input {
		width: 90%;
	}

	.selectcity image {
		width: 40upx;
		height: 40upx;
		float: right;
	}
</style>
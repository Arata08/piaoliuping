<template>
	<view>
		<view class="editaddress">
			<nut-toast></nut-toast>
			<view class="content">
				<view style="margin: 30px auto;">
					<nut-avatar size="100">
						<image :src="User.avatar" mode="aspectFill"/>
					</nut-avatar>
					<nut-uploader @delete="handleUploadDelete" @success="handleUploadSuccess" is-preview="false"
						@failure="handleUploadFailure" :url="uploadUrl" :headers="headers" maximum="1"></nut-uploader>
				</view>
				<view class="row">
					<view class="nominal">昵称</view>
					<view class="input"><input placeholder="请输入昵称" v-model="User.nickName" type="text" /></view>
				</view>
				<view class="row">
					<view class="nominal">生日</view>
					<view class="input selectcity" @tap="open('birthday')">
						<view class="city">{{ localBirth }}</view>
					</view>
				</view>
				<view class="row">
					<view class="nominal">所在地区</view>
					<view class="input selectcity" @tap="open('selectcity')">
						<view class="city">{{ User.province }} {{ User.city }} {{ User.area }}</view>
					</view>
				</view>
				<view class="row">
					<view class="nominal">性别</view>
					<view style="margin: 5px 0;" v-if="User.newUser">
						<wd-radio-group v-model="value" shape="button" @change="change">
							<wd-radio :value="1">男</wd-radio>
							<wd-radio :value="2">女</wd-radio>
						</wd-radio-group>
					</view>
					<view style="margin: 5px 0;" v-else>
						<view class="input">{{ User.sex == 'male' ? '男' : '女' }}</view>
					</view>
				</view>
			</view>
			<view class="save">
				<view class="btn" :style="'background:' + colors" @click="save">保存</view>
			</view>

			<nut-popup v-model:visible="dateshow" position="bottom" safe-area-inset-bottom>
				<nut-date-picker v-model="currentDate" :min-date="minDate" :max-date="maxDate" is-show-chinese
					@confirm="onConfirm" @cancel="dateshow = false"></nut-date-picker>
			</nut-popup>
			<cityPicker :column="column" :default-value="defaultValue" :mask-close-able="maskCloseAble"
				@confirm="confirm" @cancel="cancel" :visible="visible" />
			<nut-dialog no-cancel-btn title="温馨提示" content="保存后性别就不可以更改了哦!" v-model:visible="visible3"/>
		</view>
	</view>
</template>

<script lang="ts">
	import { defineComponent, ref, reactive } from 'vue';
	import { DialogInst } from 'nutui-uniapp'
	import { useToast } from "nutui-uniapp/composables";
	import config from "@/common/config.js"; // 全局配置文件
	import cityPicker from '@/components/piaoyi-cityPicker/components/piaoyi-cityPicker/piaoyi-cityPicker';
	import { editUser } from "@/common/api/piaoliupingApi"; // 全局配置文件

	const minDate = new Date(1900, 0, 1);
	const maxDate = new Date(2100, 11, 31);
	const currentDate = ref<Date>(new Date(2000, 1, 1));

	export default defineComponent({
		components: {
			cityPicker
		},
		setup() {
			const toast = useToast();

			const headers = {
				'Content-Type': 'multipart/form-data',
				'token': ''
			};

			let User = reactive({
				avatar: 'https://free4.yunpng.top/2025/02/19/67b587e227050.jpg',
				birthday: null,
				id: 11,
				nickName: "微信用户Y2kk",
				sex: "0",
				newUser: true,
			});

			const value = ref("");
			const uploadUrl = ref('');
			const visible = ref(false);
			const dateshow = ref(false);
			const column = ref(3);
			const maskCloseAble = ref(true);
			const defaultValue = ref(['广东省', '广州市', '天河区']);
			const colors = ref("#f23a3a");
			const localBirth = ref(null);
			const imgPath = ref('');
			const province = ref("江苏省");
			const city = ref("南京市");
			const area = ref("玄武区");
			const visible3 = ref(false);

			const setUpload = () => {
				uploadUrl.value = config.uploadUrl;
				headers.token = uni.getStorageSync('token');
				setData();
				visible3.value = User.newUser;
			};

			const open = (v : string) => {
				if (v === 'selectcity') {
					visible.value = true;
				} else if (v === 'birthday') {
					dateshow.value = true;
				}
			};

			const confirm = (val : any) => {
				console.log(val);
				province.value = val.provinceName;
				city.value = val.cityName;
				area.value = val.areaName;
				User.province = province.value;
				User.city = city.value;
				User.area = area.value;
				visible.value = false;
			};

			const cancel = () => {
				visible.value = false;
			};

			const onConfirm = (date : any) => {
				localBirth.value = date.date.toLocaleDateString();
				//只保存年月日，保证为2000-02-01格式
				let data = new Date(date.date);
				const year = data.getFullYear();
				const month = String(data.getMonth() + 1).padStart(2, '0');
				const day = String(data.getDate()).padStart(2, '0');

				User.birthday = `${year}-${month}-${day}`;
				//计算年龄
				User.age = new Date().getFullYear() - year;
				dateshow.value = false;
			};

			const change = (e : any) => {
				console.log(e);
				if (e.value === 1) {
					User.sex = "male";
				} else {
					User.sex = "female";
				}
				console.log(User.sex);
			};

			const handleUploadSuccess = (data : any) => {
				console.log(data.data.data);
				const res = JSON.parse(data.data.data);
				console.log('上传成功，文件url:', res.data.url);
				console.log('上传成功，文件路径:', res.data.fileName);
				imgPath.value = res.data.fileName;
				User.avatar = res.data.url + '?t=' + new Date().getTime();
				console.log(User.avatar);
			};

			const handleUploadFailure = (data,option,fileItem) => {
				toast.error("上传失败");
				console.log('上传失败，错误信息:', data);
				console.log('上传失败，错误信息:', uploadUrl.value);
			};

			const handleUploadDelete = (data : any) => {
				imgPath.value = '';
			};

      const save = () => {
        if (User.newUser) {
          if (!imgPath.value) {
            toast.error("请上传头像");
            return;
          }
          if (!User.province) {
            toast.error("请选择地区");
            return;
          }
        }
        // 如果/开头就说明改变上传过头像
        if (imgPath.value.startsWith('/')) {
          User.avatar = imgPath.value;
        }else{
          //去除url前面的baseUrl
          User.avatar = User.avatar.replace(config.staticUrl, '');
        }

        // 比较当前用户信息和原始用户信息
        let hasChanged = false;
        for (let key in User) {
          if (User[key] !== originalUser[key]) {
            hasChanged = true;
            break;
          }
        }

        if (!hasChanged) {
          toast.error("没有修改任何信息");
          return;
        }

        editUser(User).then((res) => {
          if (res.code === 200) {
            toast.success("修改成功！");
            let u = User.newUser;
            User.newUser = false;
            if (User.avatar.startsWith('/')) {
              User.avatar = config.staticUrl + User.avatar;
            }
						console.log(User)
            uni.setStorageSync('User', User);
            if (u) {
              setTimeout(() => {
                uni.switchTab({
                  url: '/pages/index/my',
                });
              }, 2000);
            }
            setTimeout(() => {
              uni.navigateBack({
                delta: 1
              });
            }, 2000);
          } else {
            toast.error("修改失败！" + res.message);
          }
        });
      };

      const originalUser = reactive({
        avatar: '',
        birthday: null,
        id: 0,
        nickName: '',
        sex: '',
        newUser: false,
      });

      const setData = () => {
        let BaseUser = uni.getStorageSync('User');
        Object.assign(User, BaseUser); // 使用 Object.assign 更新属性而不是直接赋值
        Object.assign(originalUser, BaseUser); // 保存原始用户信息
        if (User.avatar.startsWith('/')) {
          User.avatar = config.staticUrl + User.avatar;
        }
        localBirth.value = new Date(User.birthday).toLocaleDateString();
        value.value = User.sex === 'male' ? 1 : 2;
      }

			setUpload();

			return {
				minDate,
				maxDate,
				currentDate,
				headers,
				User,
				value,
				uploadUrl,
				visible,
				visible3,
				dateshow,
				column,
				maskCloseAble,
				defaultValue,
				colors,
				localBirth,
				imgPath,
				province,
				city,
				area,
				open,
				confirm,
				cancel,
				onConfirm,
				change,
				handleUploadSuccess,
				handleUploadFailure,
				handleUploadDelete,
				save
			};
		}
	});
</script>

<style>
	page {
		height: 100%;
		width: 100%;
		background: linear-gradient(180deg, #dcdcdc 5%, #fff 50.06%, #dcdcdc 95%);
		background-attachment: fixed;
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
		margin-top: 30rpx;
		padding: 10px;
		width: 92%;
		margin: 0 4%;
		border: solid 1upx #d5d5d5;
		border-radius: 15px;
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
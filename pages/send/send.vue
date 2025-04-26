<template>
  <nut-config-provider theme="dark">
	<view class="index">
    <nut-notify></nut-notify>
    <view style="margin-top: 50px">
      <nut-form>
        <nut-textarea v-model="value" placeholder="在这里分享你的思绪,心情和秘密"  limit-show max-length="255"/>
				<view style="margin-left: 37%;">
					<nut-uploader @success="handleUploadSuccess" @delete="handleUploadDelete" @failure="handleUploadFailure" is-preview="false" :url="uploadUrl" :headers="headers"
					 maximum="1" maximize="10485760" accept="image"></nut-uploader>
				</view>
        <nut-form-item label="显示所在城市">
          <nut-switch v-model="checked"></nut-switch>
        </nut-form-item>
        <nut-collapse v-model="activeNames" @change="onChange">
          <nut-collapse-item :name="1">
            <template v-slot:title style="margin-left: -10px;">
              {{title1}}
            </template>
            <nut-radio-group v-model="radioVal" direction="horizontal">
              <nut-radio shape="button" label="1">选项1</nut-radio>
              <nut-radio shape="button" label="2">选项2</nut-radio>
              <nut-radio shape="button" label="3">选项3</nut-radio>
            </nut-radio-group>
          </nut-collapse-item>
        </nut-collapse>
      </nut-form>
    </view>
		<nut-button size="large" type="primary" @click="submit()">投信</nut-button>
	</view>
  </nut-config-provider>
</template>

<script lang="ts">
	import {
		reactive,
		ref,
		toRefs
	} from 'vue';
	import config from "@/common/config.js"; // 全局配置文件
  import {useNotify} from "nutui-uniapp/composables";
	import {
		addLetter
	} from "@/common/api/piaoliupingApi";
  export default{
		setup() {
			let headers = {
				'Content-Type': 'multipart/form-data',
				'token': ''
			};
			let User;
			const uploadUrl = ref('');
			const value = ref('');
			const imgPath = ref('');
			const checked = ref(true);
			const activeNames = ref([1, 2]);
			const radioVal = ref('1');
      const notify = useNotify();
			const title = reactive({
				title1: '选择圈子',
			})
			const setUpload = () => {
				showPrimary();
				uploadUrl.value = config.uploadUrl;
				User = uni.getStorageSync('User');
				headers.token = uni.getStorageSync('token');
				console.log(headers);
			};
			const onChange = (modelValue, currName, status) => {
				// currName: 当前操作的 collapse-item 的 name
				// status: true 打开 false 关闭
				console.log(modelValue, currName, status);
			}
      function showPrimary() {
        notify.primary("写一封吗？");
      };
			const handleUploadSuccess = (data : any) => {
				console.log(data.data.data);
				const res = JSON.parse(data.data.data);
				console.log('上传成功，文件url:', res.data.url);
				console.log('上传成功，文件路径:', res.data.fileName);
				imgPath.value = res.data.fileName;
			};
			const handleUploadDelete = (data : any) => {
				imgPath.value = '';
			};
			const handleUploadFailure = (data,option,fileItem) => {
				console.log('上传失败，错误信息:', data);
				console.log('上传失败，错误信息:', uploadUrl);
				console.log('上传失败，错误信息:', headers);
			};
			function submit(){
				if (value.value == '') {
						notify.warning("内容不能为空");
						return;
				}
				let data = {
					content: value.value,
					imagePath: imgPath.value,
					subject: radioVal.value,
					sex:User.sex,
					age:User.age,
					isVip:User.vip>0,
					isAut:0
				}
				if(User.idCard){
					data.isAut = 1
				}else{
					data.isAut = 0
				}
				if (checked.value) {
					data['city'] = User.city;
				}
				addLetter(data).then((res) => {
					if (res.code == 200) {
						imgPath.value = '';
						value.value = '';
						notify.success("投信成功");
						//1.5s后返回
						setTimeout(() => {
							uni.navigateBack({
								delta: 1,
							});
						}, 1500);
					}else {
						notify.warning(res.msg);
					}
				})
			}
			setUpload();
			return { 
        showPrimary,
				value,
				onChange,
				checked,
				activeNames,
				radioVal,
				handleUploadSuccess,
				setUpload,
				headers,
				uploadUrl,
				handleUploadDelete,
				handleUploadFailure,
				submit,
				...toRefs(title)
			};
		}
	}
</script>
<style>
.nut-icon{
  --animate-duration: 2s ;
  --animate-delay: 3s;
}
</style>
<style lang="scss">
	// :root,
	// page {
	// 	--nut-uploader-background: #525252;
	// }
	.index {
/* global 94%+ browsers support */
	background: linear-gradient(180deg,#000000 3%,#FFFFFF 25%,#000000 100%); 

/* ie 10+ */
	background: -ms-linear-gradient(180deg,#000000 3%,#FFFFFF 25%,#000000 100%);
		box-sizing: border-box;
		min-height: 100vh;
		overflow-x: hidden;
		overflow-y: auto;
		padding: 0 10px 10px 10px;
	}

	.nut-form-item {
		align-items: baseline;
	}
	
</style>
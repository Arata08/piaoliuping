<template>
	<view class="index">
    <nut-notify></nut-notify>
		<nut-form>
			<nut-form-item label="">
				<nut-textarea v-model="value" placeholder="在这里分享你的思绪,心情和秘密"  limit-show max-length="50"/>
			</nut-form-item>
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
			<nut-cell>
				<nut-button size="large" type="primary">
          发布
				</nut-button>
			</nut-cell>
	</view>
</template>

<script>
	import {
		reactive,
		ref,
		toRefs
	} from 'vue';
  import {useNotify} from "nutui-uniapp/composables";
  export default {
		setup() {
			const value = ref('');
			const checked = ref(true);
			const activeNames = ref([1, 2]);
			const radioVal = ref('1');
      const notify = useNotify();
			const title = reactive({
				title1: '选择圈子',
			})
			const onChange = (modelValue, currName, status) => {
				// currName: 当前操作的 collapse-item 的 name
				// status: true 打开 false 关闭
				console.log(modelValue, currName, status);
			}
      function showPrimary() {
        notify.primary("写一封吗？");
      }
			return {
        showPrimary,
				value,
				onChange,
				checked,
				activeNames,
				radioVal,
				...toRefs(title)
			};
		},
		data() {
		},
		onLoad() {
      this.showPrimary();
			console.log(this.checked);
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
	.index {
/* global 94%+ browsers support */
background: linear-gradient(180deg,#000000 3%,#FFFFFF 25%,#000000 100%); 

/* safari 5.1+,chrome 10+ */
background: -webkit-linear-gradient(180deg,#000000 3%,#FFFFFF 25%,#000000 100%);

/* ff 3.6+ */
background: -moz-linear-gradient(180deg,#000000 3%,#FFFFFF 25%,#000000 100%);

/* opera 11.10+ */ 
background: -o-linear-gradient(180deg,#000000 3%,#FFFFFF 25%,#000000 100%);

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
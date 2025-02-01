## 1.0.7（2023-09-15）
改为uni_modules规范
### cityPicker 浮动菜单（兼容vue3）

**使用方法：**

```
<template>
	<view>
		<button @tap="open">打开</button>
		<cityPicker :column="column" :default-value="defaultValue" :mask-close-able="maskCloseAble" @confirm="confirm" @cancel="cancel" :visible="visible"/>
		<view>{{str}}</view>
	</view>
</template>

<script>
	import cityPicker from '@/uni_modules/piaoyi-cityPicker/components/piaoyi-cityPicker/piaoyi-cityPicker'
	export default {
		data() {
			return {
				visible: false,
				maskCloseAble: true,
				str: '',
				defaultValue: '420103',
				// defaultValue: ['河北省','唐山市','丰南区'],
				column: 3
			}
		},
		components: {
			cityPicker
		},
		methods: {
			open () {
				this.visible = true
			},
			confirm (val) {
				console.log(val)
				this.str = JSON.stringify(val)
				this.visible = false
			},
			cancel () {
				this.visible = false
			}
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: 'data-cityPicker省市区地址选择器！',
				path: '/pages/cityPicker/cityPicker'
			}
		},
		onShareTimeline(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: 'data-cityPicker省市区地址选择器！'
			}
		}
	}
</script>

<style lang="scss">

</style>

```

### 注：近期收到使用用户反馈，存在以下一个问题（如有好的建议，期待私信，谢谢）

1、之前只支持默认值传入地区编码，已更新可以支持传入中文省市区数组

defaultValue可以传入defaultValue:['河北省','唐山市','丰南区']数组类型以及defaultValue: '420103'地区编码字符串类型

可以使用const reg =/([\u4e00-\u9fa5]+省|自治区|[\u4e00-\u9fa5]+市|[\u4e00-\u9fa5]+区)/g;将自己的省市区数据进行处理为数组再传入

2、有些用户反馈vue3下watch监听有问题

我自己创建一个vue项目，导入插件后，按照示例原封不动进行测试，没有发现问题; 发现有问题的朋友可以提供一下可以复现的demo给我，我这边看看具体什么情况

#### 事件说明

|   事件名    | 返回值 |      描述      |
| :---------: | :----: | :------------: |
| @confirm |   对象(code,完整地区名称)   | 点击确定的回调 |
| @cancel | 无 | 点击取消的回调 |

#### Prop

| 参数名称 | 描述                           |
| -------- | ------------------------------ |
| visible | 控制选择器显示和隐藏 |
| column | 可选值2和3，2是省市两列选择；3是省市区三列选择 |
| maskCloseAble | 点击模态框是否关闭弹框 |
| defaultValue | 初始地区编码（例:420102或者['河北省','唐山市','丰南区']） |

### 可接定制化组件开发
### 右侧有本人代表作小程序二维码，可以扫码体验
### 如使用过程中有问题或有一些好的建议，欢迎加QQ群互相学习交流：120594820
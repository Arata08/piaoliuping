<template>
	<view class="pupop">
		<view class="popup-box" :animation="animationData">
			<view class="pupop-btn">
				<view @tap="cancel">取消</view>
				<view @tap="confirm" style="color: #2979ff;">确定</view>
			</view>
			<picker-view :value="value" :indicator-style="indicatorStyle" @change="bindChange" class="picker-view">
				<picker-view-column>
					<view class="item" v-for="(item,index) in provinceList" :key="index">{{item.name}}</view>
				</picker-view-column>
				<picker-view-column>
					<view class="item" v-for="(item,index) in cityList" :key="index">{{item.name}}</view>
				</picker-view-column>
				<picker-view-column v-if="column == 3">
					<view class="item" v-for="(item,index) in areaList" :key="index">{{item.name}}</view>
				</picker-view-column>
			</picker-view>
		</view>
		<view @tap="close" @touchmove.stop.prevent :class="visible ? 'pupop-model' : 'pupop-models'"></view>
	</view>
</template>

<script>
	import {
		addressList
	} from './cityData.js'
	export default {
		data() {
			return {
				value: [],
				addressList,
				provinceList: [],
				cityList: [],
				areaList: [],
				indicatorStyle: `height: 50px;`,
				provinceIndex: 0,
				cityIndex: 0,
				areaIndex: 0,
				animationData: {}
			}
		},
		props: {
			column: {
				type: Number,
				default: 3
			},
			defaultValue: {
				default: () => ''
			},
			visible: {
				type: Boolean,
				default: () => false
			},
			maskCloseAble: {
				type: Boolean,
				default: () => true
			},
		},
		watch: {
			visible (val) {
				this.changeActive()
			},
			defaultValue() {
				this.init()
			}
		},
		created() {
			this.init()
		},
		methods: {
			init () {
				var provinceList = []
				addressList.filter(item => {
					provinceList.push({
						code: item.code,
						name: item.name
					})
				})
				this.provinceList = [...provinceList]
				if (!this.defaultValue) {
					this.cityList = addressList[0].children
					this.areaList = addressList[0].children[0].children
				} else {
					var city = {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "}
					if (Array.isArray(this.defaultValue) && this.defaultValue.length >= 2) {
						console.log(this.defaultValue)
						var province = this.defaultValue[0]
						var city = this.defaultValue[1]
						this.provinceIndex = 0
						this.cityIndex = 0
						this.areaIndex = 0
						this.provinceIndex = addressList.findIndex(obj => {
							return obj.name == province
						})
						this.provinceIndex = this.provinceIndex >= 0 ? this.provinceIndex : 0
						this.cityList = addressList[this.provinceIndex].children
						this.cityIndex = this.cityList.findIndex(obj => {
							return obj.name == city
						})
						this.cityIndex = this.cityIndex >= 0 ? this.cityIndex : 0
						this.areaList = this.cityList[this.cityIndex].children
						if (this.defaultValue.length > 2) {
							this.areaIndex = this.areaList.findIndex(obj => {
								return obj.name == this.defaultValue[2]
							})
						}
						this.areaIndex = this.areaIndex >= 0 ? this.areaIndex : 0
						this.$nextTick(() => {
							if (this.column == 3) {
								this.value = JSON.parse(JSON.stringify([this.provinceIndex, this.cityIndex, this.areaIndex]))
							} else if (this.column == 2) {
								this.value = JSON.parse(JSON.stringify([this.provinceIndex, this.cityIndex]))
							}
						})
					} else if (/^\d{6}$/.test(this.defaultValue)) {
						var province = this.defaultValue.substr(0, 2)
						var city = this.defaultValue.substr(0, 4)
						this.provinceIndex = 0
						this.cityIndex = 0
						this.areaIndex = 0
						this.provinceIndex = addressList.findIndex(obj => {
							return obj.code == province
						})
						this.provinceIndex = this.provinceIndex >= 0 ? this.provinceIndex : 0
						this.cityList = addressList[this.provinceIndex].children
						this.cityIndex = this.cityList.findIndex(obj => {
							return obj.code == city
						})
						this.cityIndex = this.cityIndex >= 0 ? this.cityIndex : 0
						this.areaList = this.cityList[this.cityIndex].children
						this.areaIndex = this.areaList.findIndex(obj => {
							return obj.code == this.defaultValue
						})
						this.areaIndex = this.areaIndex >= 0 ? this.areaIndex : 0
						this.$nextTick(() => {
							if (this.column == 3) {
								this.value = JSON.parse(JSON.stringify([this.provinceIndex, this.cityIndex, this.areaIndex]))
							} else if (this.column == 2) {
								this.value = JSON.parse(JSON.stringify([this.provinceIndex, this.cityIndex]))
							}
						})
					} else {
						uni.showToast({
							title: '地区编码格式不正确',
							icon: 'none'
						})
						console.log('地区编码格式不正确')
					}
				}
				this.changeActive()
			},
			confirm () {
				if (this.column == 3) {
					this.$emit('confirm', {
						code: addressList[this.provinceIndex].children[this.cityIndex].children[this.areaIndex].code,
						name: addressList[this.provinceIndex].name + addressList[this.provinceIndex].children[this.cityIndex].name + addressList[this.provinceIndex].children[this.cityIndex].children[this.areaIndex].name,
						provinceName: addressList[this.provinceIndex].name,
						cityName: addressList[this.provinceIndex].children[this.cityIndex].name,
						areaName: addressList[this.provinceIndex].children[this.cityIndex].children[this.areaIndex].name
					})
				} else if (this.column == 2) {
					this.$emit('confirm', {
						code: addressList[this.provinceIndex].children[this.cityIndex].children[this.areaIndex].code.substring(0, 4) + '00',
						name: addressList[this.provinceIndex].name + addressList[this.provinceIndex].children[this.cityIndex].name,
						provinceName: addressList[this.provinceIndex].name,
						cityName: addressList[this.provinceIndex].children[this.cityIndex].name
					})
				} else {
					uni.showToast({
						title: '目前column只能传2和3',
						icon: 'none'
					})
				}
			},
			cancel () {
				this.$emit('cancel')
			},
			// 动画
			changeActive () {
				var active = '-315px'
				if (this.visible) {
					active = 0
				}
				var animation = uni.createAnimation({
					duration: 400,
					timingFunction: 'linear'
				})
				animation.bottom(active).step()
				this.animationData = animation.export()
			},
			bindChange(e) {
				e.detail.value[0] = e.detail.value[0] || 0
				e.detail.value[1] = e.detail.value[1] || 0
				e.detail.value[2] = e.detail.value[2] || 0
				if (e.detail.value[0] != this.provinceIndex) {
					// console.log('监听第一列')
					this.provinceChange(e.detail.value[0])
				} else if (e.detail.value[1] != this.cityIndex) {
					// console.log('监听第二列')
					this.cityChange(e.detail.value[1])
				} else if (e.detail.value[2] != this.areaIndex) {
					// console.log('监听第三列')
					this.areaChange(e.detail.value[2])
				}
			},
			// 监听第一列变化
			provinceChange (e) {
				this.provinceIndex = e
				this.cityIndex = 0
				this.areaIndex = 0
				this.value = [...[e, 0, 0]]
				this.cityList = addressList[e].children
				this.areaList = addressList[e].children[0].children
			},
			// 监听第二列变化
			cityChange (e) {
				this.cityIndex = e
				this.areaIndex = 0
				// console.log(this.cityIndex, this.areaIndex)
				this.value = [...[this.provinceIndex, e, 0]]
				this.cityList = addressList[this.provinceIndex].children
				this.areaList = addressList[this.provinceIndex].children[e].children
			},
			// 监听第三列变化
			areaChange (e) {
				this.areaIndex = e
			},
			// 点击模态框
			close () {
				if (this.maskCloseAble) {
					this.cancel()
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.pupop {
		.popup-box {
			position: fixed;
			left: 0;
			bottom: -315px;
			z-index: 99999;
			background: #fff;
			padding-bottom: 50px;
			.pupop-btn{
				height: 40px;
				display: flex;
				align-items: center;
				padding: 0 30upx;
				justify-content: space-between;
			}
		}
		.pupop-model {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 9999;
			background: rgba(0, 0, 0, .5);
		}
		.pupop-models{
			display: none;
		}
		.picker-view {
			width: 750rpx;
			height: 225px;
			margin-top: 20rpx;
		}
		.item {
			height: 50px;
			align-items: center;
			justify-content: center;
			text-align: center;
			line-height: 50px;
		}
	}
</style>

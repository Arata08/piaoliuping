<template>
	<scroller class="scroller">
			<div append="tree" class="emoj_box">
				<block v-for="(item,index) in emojiList" :key="index">
					<text @click="setEmoj(item,index)" class="emoj_box_img">{{item}}</text>
				</block>
			</div>
	</scroller>
</template>

<script>
	export default {
		props: {
			emojiList: {
				type: Array,
				default: []
			}
		},
		data() {
			return {}
		},
		methods:{
			setEmoj(item,index){
				this.$nextTick(() =>{
					this.$emit('setEmoj',item,index)
				})
			}
		}
	}
</script>

<style scoped>
	.scroller {
		flex: 1;
	}

	.emoj_box {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.emoj_box_img {
		font-size: 45rpx;
		width: 83rpx;
		height: 83rpx;
		text-align: center;
		line-height: 83rpx;
	}
</style>

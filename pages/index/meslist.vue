<template>
	<view class="container">
		<!--由远到近5个层次星空-->
		<div class="layer1"></div>
		<div class="layer2"></div>
		<div class="layer3"></div>
		<div class="layer4"></div>
		<div class="layer5"></div>
		<div class="meteor"></div>
		<view class="icon-con">
			<view class="icon-item" @click="goto('query')">
				<image src="/static/meslist/query.png" class="icon"></image>
				<text style="align-self: center;">精确查找</text>
			</view>
			<view class="icon-item" @click="goto('liuyan')">
				<image src="/static/meslist/留言.png" class="icon"></image>
				<text style="align-self: center;">留言消息</text>
			</view>
			<view class="icon-item" @click="goto('notic')">
				<image src="/static/meslist/通知.png" class="icon"></image>
				<text style="align-self: center;">系统消息</text>
			</view>
		</view>
		<view class="list-item" v-for="(item,index) in users" :key="index" @click="connect(item)">
			<view class="avatar" @click.stop="showModal(item)">
				<text class="round" v-if="item.read"></text>
				<image :src="item.avatar" mode="widthFix"></image>
			</view>
			<view class="content">
				<view class="title">
					<text class="name">{{ item.name }}</text>
					<text class="time">24/01/25</text>
				</view>
				<view class="txt">这是信息这是信息这是信息</view>
			</view>
		</view>
		<UserInfoModal :userInfo="selectedUser" :visible="isModalVisible" @close="closeModal"
			:windowWidth="windowWidth" />
	</view>
</template>

<script>
	import UserInfoModal from '@/components/user-detail/user-detail.vue'
	export default {
		components: {
			UserInfoModal
		},
		data() {
			return {
				users: [{
						avatar: 'https://ww1.sinaimg.cn/mw690/a1a9fb72gy1hl1cd1znplj20j60j6n0h.jpg',
						name: '云端遗梦录',
						read: 1
					},
					{
						avatar: 'https://wx1.sinaimg.cn/mw690/006zUvE2gy1hlzne8puvvj30p40p4mz0.jpg',
						name: '我要月亮奔我而来',
						read: 1
					},
					{
						avatar: 'https://k.sinaimg.cn/n/sinakd20121/96/w2048h2048/20240118/9708-e48f9d9226e0a45ec9610b2eb3906a87.jpg/w700d1q75cms.jpg',
						name: '星河暗恋记',
						read: 1
					},
					{
						avatar: 'https://img0.baidu.com/it/u=3975753653,825915219&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
						name: '月野氿桃',
						read: 1
					},
					{
						avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fa6808c4d-deac-4102-8fcb-0164b258ffe5%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1708585730&t=fb863f2b64845d0ae49091187f15f452',
						name: '星星跌入梦境',
						read: 1
					},
					{
						avatar: 'https://img1.baidu.com/it/u=4103620966,1336257185&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
						name: '桃奈叶子',
						read: 0
					},
					{
						avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F0738d0c4-60bf-477f-a5b9-b78abf994cc9%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1708585786&t=656a85368566a4b0d2e9f64a6bb3d915',
						name: '知更鸟的死因',
						read: 0
					},
					{
						avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F8075fa62-cf88-420a-88f7-9a4a4d714bb0%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1708585798&t=057782a24ac68de6a2671084fb40140a',
						name: '放鹤归舟',
						read: 0
					},
					{
						avatar: 'https://img0.baidu.com/it/u=3975753653,825915219&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
						name: '春日樱亭',
						read: 0
					},
					{
						avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F034f80eb-432d-4e10-b5d8-c2327334c61b%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1708585807&t=398154a5d365a390dc5ee294c87cb018',
						name: '宇宙热恋期',
						read: 0
					},
					{
						avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F4d69987e-5419-463c-890c-61f819bf4d22%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1708585819&t=21d504545be19a98f39f593ce59df064',
						name: '今夜星潮暗涌',
						read: 0
					},
					{
						avatar: 'https://img1.baidu.com/it/u=4103620966,1336257185&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
						name: '桃奈叶子',
						read: 0
					},
					{
						avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F0738d0c4-60bf-477f-a5b9-b78abf994cc9%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1708585786&t=656a85368566a4b0d2e9f64a6bb3d915',
						name: '知更鸟的死因',
						read: 0
					},
					{
						avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F8075fa62-cf88-420a-88f7-9a4a4d714bb0%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1708585798&t=057782a24ac68de6a2671084fb40140a',
						name: '放鹤归舟',
						read: 0
					},
					{
						avatar: 'https://img0.baidu.com/it/u=3975753653,825915219&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
						name: '春日樱亭',
						read: 0
					},
					{
						avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F034f80eb-432d-4e10-b5d8-c2327334c61b%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1708585807&t=398154a5d365a390dc5ee294c87cb018',
						name: '宇宙热恋期',
						read: 0
					},
					{
						avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F4d69987e-5419-463c-890c-61f819bf4d22%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1708585819&t=21d504545be19a98f39f593ce59df064',
						name: '今夜星潮暗涌',
						read: 0
					},
				],
				selectedUser: {},
				isModalVisible: false,
				windowWidth: 0
			};
		},
		onLoad() {
			this.windowWidth = uni.getSystemInfoSync().windowWidth * 0.8;
			console.log(this.windowWidth)
		},
		methods: {
			connect(item) {
				uni.navigateTo({
					url: `/pages/message/message?name=${item.name}&avatar=${item.avatar}`
				})
			},
			showModal(user) {
				this.selectedUser = user;
				this.isModalVisible = true;
			},
			closeModal() {
				this.isModalVisible = false;
			},
			goto(to) {
				let url = '';
				switch (to) {
					case 'query':
						url = '/pages/index/query';
						break;
					case 'liuyan':
						url = '/pages/message/charm';
						break;
					case 'notic':
						url = '/pages/message/notice';
						break;
					default:
						console.error('未知的页面类型');
						return;
				}
				uni.navigateTo({
					url: url,
				});
			},
			handleKeydown(event) {
				if (event.key === 'Escape') {
					this.closeModal();
				}
			}
		},
		beforeDestroy() {
			document.removeEventListener('keydown', this.handleKeydown);
		},
	}
</script>

<style>
	page {
		height: 100%;
		width: 100%;
		background: linear-gradient(180deg, #000000 5%, #a3a3a3 50.06%, #000000 95%);
		background-attachment: fixed;
	}
</style>

<style lang="scss" scoped>
	.icon-con {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 5px 10px;
	}

	.icon {
		width: 60px;
		height: 60px;
	}

	.icon-item {
		display: flex;
		flex-direction: column;
	}

	.container {
		padding: 0 32rpx;
		color: #DCA51D;
	}

	//背景------------------------------------------------
	//根据数量来生成shadows
	@function getShadows($n) {
		//每一个shadow对应一个小星星
		$shadows: unquote('#{random(100)}vw #{random(100)}vh #fff');

		@for $i from 2 through $n {
			$shadows: '#{$shadows}, #{random(100)}vw #{random(100)}vh #fff';
		}

		//去掉逗号
		@return unquote($shadows)
	}

	$duration: 400s; //小星星运动的动画时间
	$count: 600; //每层星空的小星星数，为保证性能，这里建议设置不超过1000

	//通过for循环来生成5层星空
	@for $i from 1 through 5 {
		$duration: $duration / 2; //离屏幕越近，运动越快
		$count: floor($count / $i); //离屏幕越近，星星数越少

		.layer#{$i} {
			$size: #{$i}px; //离屏幕越近星星越大
			position: fixed;
			width: $size;
			height: $size;
			border-radius: 50%;
			left: 0;
			top: 0;
			//通过多个shadow来达到生层本层星空星星
			box-shadow: getShadows($count);
			animation: moveUp $duration linear infinite;

			//通过伪类在屏幕下方放置一个一样的星空层，防止循环播放的时候闪屏
			&::after {
				content: '';
				position: fixed;
				left: 0;
				top: 100vh;
				border-radius: inherit;
				width: inherit;
				height: inherit;
				box-shadow: inherit;
			}
		}
	}

	//星星向上运动动画
	@keyframes moveUp {
		to {
			transform: translateY(-100vh);
		}
	}

	$color: orange;

	//流星拖尾
	.meteor {
		width: 3px;
		height: 36px;
		background: linear-gradient(0deg, $color 0, transparent 100%);
		position: absolute;
		top: 70px;
		transform: rotate(45deg);
		right: 70px;
		opacity: 0;
		animation: streak 2s linear infinite;

		//伪类实现发光头部
		&::after {
			content: "";
			position: absolute;
			width: 6px;
			height: 6px;
			border-radius: 50%;
			background: $color;
			filter: blur(1.8px);
			box-shadow: 0px -1px -1px 5px transparent;
			bottom: -4px;
			left: 50%;
			transform: translate(-50%);
		}
	}

	@keyframes streak {
		0% {
			transform: rotate(50deg) translateY(-100px) scale(0.5);
			opacity: 0;
		}

		70% {
			opacity: 1;
			transform: rotate(50deg) translateY(120px) scale(1.1);
		}

		100% {
			transform: rotate(50deg) translateY(220px) scale(0.5);
			opacity: 0;
		}
	}

	//----------------------end
	@keyframes flowCss {
		0% {
			background-position: 0 0;
		}

		100% {
			background-position: -400% 0;
		}
	}

	.list-item {
		display: flex;
		padding: 30rpx 0;
		border-bottom: 1px none #f7f8f9;

		.avatar {
			width: 90rpx;
			height: 90rpx;
			border-radius: 10rpx;
			margin-right: 20rpx;
			position: relative;

			.round {
				position: absolute;
				width: 14rpx;
				height: 14rpx;
				border-radius: 50%;
				background: #ef5656;
				top: -4rpx;
				right: -4rpx;
				z-index: 1;
			}

			image {
				width: 100%;
				height: 100%;
				border-radius: 10rpx;
			}
		}

		.content {
			flex: 1;

			.title {
				display: flex;
				justify-content: space-between;

				.name {
					font-weight: bold;
				}

				.time {
					color: #55aaff;
					font-size: 24rpx;
				}
			}

			.txt {
				margin-top: 10rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				text-align: left;
				color: #FFFFFF;
				font-size: 26rpx;
			}
		}
	}
</style>
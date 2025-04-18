<template>
	<div class="layer2"></div>
	<div class="layer3"></div>
	<div class="layer4"></div>
	<div class="layer5"></div>
	<div class="meteor"></div>
	<view id="msglist">
		<view class="message" :class="[item.userType]" v-for="(item,index) in list" :key="index" @click="msgClick(item)">
			<image :src="this[item.userType]" v-if="item.userType === 'friend'" class="avatar" mode="widthFix"></image>
			<view class="content" v-if="item.type === 'image'">
				<image :src="item.content" mode="widthFix" @click="previewImage(item.content,index)"></image>
			</view>
			<view v-else>
				<view v-show="!item.read && item.userType === 'self'">
					<text style="color: #dcdcdc;font-size: 10px">未读</text>
				</view>
				<view class="content">
					{{ item.content }}
				</view>
			</view>
			<image :src="this[item.userType]" v-if="item.userType === 'self'" class="avatar" mode="aspectFill"></image>
		</view>
		<view :style="{height: paddingBottom+'px'}"></view>
		<view id="scrollBottom" style="height: 60px;" :style="{'margin-bottom': paddingBottom+'px'}"></view>
	</view>

	<view>
		<view class="tool" :style="{bottom: paddingBottom+'px'}">
			<text></text>
			<block v-if="type === 'text'">
				<image src="../../static/meslist/voice.png" style="margin-top: 8rpx;margin-left: -20rpx;" mode="widthFix"
					class="left-icon" @click="type='voice';this.showEmoji = false;this.showMorePanel = false;paddingBottom=0;">
				</image>
				<textarea placeholder="说点啥？" style="margin-top: 10px;margin-right: 15rpx" v-model="content" :focus="isFocus"
					class="input" @blur="inputBlur" confirm-type="send" @confirm="send" maxlength="-1"
					auto-height="true"></textarea>
				<!--				<image src="../../static/thumb.png" style="margin-top: 5rpx;margin-left: -10rpx;" mode="widthFix" class="thumb" @click="chooseImage"></image>-->
				<image style="margin-top: 5rpx;margin-left: -10rpx;" src="../../static/meslist/emoji.png" class="thumb"
					mode="widthFix" @touchstart.prevent="changeEmoji">
				</image>
				<image src="../../static/meslist/add.png" mode="widthFix" class="thumb" @click="MorePanel"></image>
			</block>
			<block v-else-if="type === 'voice'">
				<image src="../../static/text.png" style="margin-top: 8rpx;margin-left: -20rpx;" mode="widthFix"
					class="left-icon" @click="type='text'"></image>
				<text class="voice-crl" @touchstart="touchstart"
					@touchend="touchend">{{ recordStart ? '松开 发送' : '按住 说话' }}</text>
				<image src="../../static/meslist/add.png" mode="widthFix" class="thumb" @click="MorePanel"></image>
			</block>
		</view>
		<scroll-view class="emoji-scroll" scroll-y="true" v-show="showEmoji">
			<view class="emoji-panel">
				<view class="emoji-item" v-for="(item, index) in emojisArr" :key="index" @touchstart.prevent="content+=item">
					{{item}}
				</view>
			</view>
		</scroll-view>
		<scroll-view class="panel-scroll" scroll-y="true" v-show="showMorePanel">
			<view class="container">
				<view v-for="(row, rowIndex) in rows" :key="rowIndex" class="row">
					<view v-for="(item, colIndex) in row" :key="colIndex" class="item" @click="handleClick(rowIndex, colIndex)">
						<image :src="item.imgUrl" mode="aspectFill" class="image" />
						<view class="text-container">
							<text class="text">{{ item.text1 }}</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>

	<view v-if="recordStart" class="audio-animation">
		<view class="audio-wave">
			<text class="audio-wave-text" v-for="item in 10" :style="{'animation-delay': `${item/10}s`}"></text>
			<view class="text">松开 发送</view>
		</view>
	</view>
</template>

<script>
	import {
		forEach
	} from "@/common/utils/luch-request/luch-request/utils";
	const recorderManager = wx.getRecorderManager()
	import webSocketManager from '@/common/websocketManager'
	import {
		follow,
		black,
		checkBlack,
		payBalance
	} from "@/common/api/piaoliupingApi";
	import {
		uploadFile
	} from "@/common/api/uploadApi";
	import EventBus from '@/common/utils/eventBus'; //事件总线

	export default {
		data() {
			return {
				User: {},
				havaBack: false, //对方是否有回复
				checkBlack: false,
				content: '',
				list: [],
				type: 'voice',
				recordStart: false,
				friend: '',
				friendId: '',
				self: '',
				nickName: '',
				isFocus: false,
				paddingBottom: 0,
				keyboardHeight: 0,
				showEmoji: false,
				showMorePanel: false,
				navList: [{
						id: 1,
						text: '首页',
						icon: 'https://img11.360buyimg.com/imagetools/jfs/t1/117646/2/11112/1297/5ef83e95E81d77f05/daf8e3b1c81e3c98.png'
					},
					{
						id: 2,
						text: '分类',
						icon: 'https://img12.360buyimg.com/imagetools/jfs/t1/119490/8/9568/1798/5ef83e95E968c69a6/dd029326f7d5042e.png'
					},
					{
						id: 3,
						text: '购物车',
						num: 2,
						icon: 'https://img14.360buyimg.com/imagetools/jfs/t1/130725/4/3157/1704/5ef83e95Eb976644f/b36c6cfc1cc1a99d.png'
					},
					{
						id: 4,
						text: '我的',
						icon: 'https://img12.360buyimg.com/imagetools/jfs/t1/147573/29/1603/1721/5ef83e94E1393a678/5ddf1695ec989373.png'
					}
				],
				emojisArr: ['😊', '😁', '😀', '😃', '😣', '😞', '😩', '😫', '😲', '😟', '😦', '😜', '😳', '😋', '😥', '😰',
					'🤠', '😎', '😇', '😉', '😭', '😈', '😕', '😏', '😘', '😤', '😡', '😅', '😬', '😺', '😻', '😽',
					'😼', '🙈', '🙉', '🙊', '🔥', '👍', '👎', '👌', '✌️', '🙏', '💪', '👻', ''
				],
				rows: [
					[{
							imgUrl: '../../static/meslist/image(1).png',
							text1: '举报'
						},
						{
							imgUrl: '../../static/meslist/image(2).png',
							text1: '拉黑'
						},
						{
							imgUrl: '../../static/meslist/image(3).png',
							text1: '关注'
						}
					],
					[{
							imgUrl: '../../static/meslist/image(4).png',
							text1: '闪图'
						},
						{
							imgUrl: '../../static/meslist/image(5).png',
							text1: '礼物'
						},
						{
							imgUrl: '../../static/meslist/image(6).png',
							text1: '闪视频'
						}
					]
				]
			};
		},
		onLoad(options) {
			uni.setNavigationBarTitle({
				title: options.nickName
			})
			this.nickName = options.nickName
			this.friendId = options.friendId
			this.friend = options.avatar
			this.User = uni.getStorageSync("User")
			this.self = this.User.avatar
			this.list = uni.getStorageSync('chatList' + this.friendId) || [];
			//判断消息中是否有对方消息
			if (this.list.length > 0) {
				for (let i = 0; i < this.list.length; i++) {
					if (this.list[i].userType === 'friend') {
						this.havaBack = true
						break
					}
				}
				if (!this.havaBack) {
					uni.showModal({
						title: '提示',
						content: '对方未回复前，每次发消息需要4个微币',
					});
				}
			}
			checkBlack(this.friendId).then(res => {
				this.checkBlack = res
				if (this.checkBlack) {
					uni.showToast({
						title: '你已被对方拉黑',
						icon: 'none',
						duration: 2000,
					})
				}
			});
			this.showKeyboard();
		},
		onReady() {
			this.scrollToBottom()
		},
		created() {
			// 订阅事件
			EventBus.on('refreshChatList', this.refreshChatList);
		},
		beforeUnmount() {
			// 移除事件监听器
			EventBus.off('refreshChatList', this.refreshChatList);
			if (this._innerAudioContext) {
				this._innerAudioContext.stop()
			}
			// 发送事件通知 meslist.vue 更新 read 状态
			EventBus.emit('updateReadStatus', this.friendId);
		},
		methods: {
			previewImage(url, index) {
				// 预览图片
				if (url === 'https://free4.yunpng.top/2024/12/02/674d2d2380346.png') {
					uni.previewImage({
						urls: [url]
					});
				} else {
					console.log(this.list[index]);
					this.list[index].orgImgUrl = url
					this.list[index].content = 'https://free4.yunpng.top/2024/12/02/674d2d2380346.png';
					//2秒后关闭
					uni.setStorageSync('chatList' + this.friendId, this.list);
					uni.navigateTo({
						url: 'preImage?url=' + url
					});
				}
			},
			handleClick(rowIndex, colIndex) {
				let n = rowIndex * 3 + colIndex + 1;
				switch (n) {
					case 2:
						black(this.friendId).then(res => {
							uni.showToast({
								title: res.data,
								icon: 'none',
								duration: 2000,
							});
						});
						break;
					case 3:
						follow({
							userId: this.User.id,
							followUserId: this.friendId
						}).then(res => {
							uni.showToast({
								title: res.data,
								icon: 'none',
								duration: 2000,
							});
						});
						break;
					case 4:
						if (this.checkBlack) {
							uni.showToast({
								title: '你已被对方拉黑',
								icon: 'none',
								duration: 2000,
							})
							return;
						}
						if (this.User.balance < 4 && !this.havaBack) {
							uni.showToast({
								title: '余额不足',
								icon: 'none',
								duration: 2000,
							});
							return;
						}
						this.chooseImage()
						break;
					case 5:
						if (this.checkBlack) {
							uni.showToast({
								title: '你已被对方拉黑',
								icon: 'none',
								duration: 2000,
							})
							return;
						}
						this.chooseImage()
						break;
					case 6:
						if (this.checkBlack) {
							uni.showToast({
								title: '你已被对方拉黑',
								icon: 'none',
								duration: 2000,
							})
							return;
						}
						this.chooseImage()
						break;
				}
			},
			deductingBalance(description) {
				let bance = this.User.balance - 4
				// 更新余额
				this.User.balance = bance
				uni.setStorageSync('User', this.User)
				let data = {
					number: -4,
					description: description,
				}
				payBalance(data);
			},
			scroll(e) {
				console.log(e)
			},
			inputBlur() {
				console.log('inputBlur');
				this.isFocus = false;
			},
			changeEmoji() {
				this.togglePanel(!this.showEmoji, false, 270);
			},
			MorePanel() {
				this.togglePanel(false, !this.showMorePanel, 200);
			},
			togglePanel(showEmoji, showMorePanel, paddingBottom) {
				if (showEmoji || showMorePanel) {
					uni.hideKeyboard();
					this.isFocus = true;
					this.showEmoji = showEmoji;
					this.showMorePanel = showMorePanel;
					this.$nextTick(() => {
						this.paddingBottom = paddingBottom;
						this.scrollToBottom();
					});
				} else {
					this.isFocus = false;
					this.$nextTick(() => {
						this.showEmoji = false;
						this.showMorePanel = false;
						this.paddingBottom = 0;
						this.scrollToBottom();
					});
				}
				console.log('togglePanel', showEmoji, showMorePanel, paddingBottom);
			},
			showKeyboard() {
				uni.onKeyboardHeightChange((res) => {
					if (res.height > 0) {
						this.paddingBottom = res.height + 50
						this.keyboardHeight = res.height;
						this.scrollToBottom();
					} else {
						this.keyboardHeight = 0;
						this.scrollToBottom();
					}
				});
			},
			refreshChatList(senderId) {
				console.log('refreshChatList', senderId);
				if (senderId === this.friendId) {
					this.list = uni.getStorageSync('chatList' + this.friendId);
					this.scrollToBottom();
				}
			},
			send() {
				if (this.checkBlack) {
					uni.showToast({
						title: '你已被对方拉黑',
						icon: 'none',
						duration: 2000,
					})
					return;
				}
				if (this.User.balance < 4 && !this.havaBack) {
					uni.showToast({
						title: '余额不足',
						icon: 'none',
						duration: 2000,
					});
					return;
				}
				if (!this.havaBack && this.User.balance > 4) {
					this.deductingBalance("对方未回复，发送消息");
				}
				let msgList = uni.getStorageSync('msgList')
				if (this.list.length == 0) {
					msgList.push({
						id: this.friendId,
						avatar: this.friend,
						nickName: this.nickName,
						lastMsg: this.content,
						saveTime: this.getSaveTime(new Date()),
						read: 1
					})
				} else {
					for (let i = 0; i < msgList.length; i++) {
						if (msgList[i].id === this.friendId) {
							msgList[i].lastMsg = this.content
							msgList[i].saveTime = this.getSaveTime(new Date())
							msgList[i].read = 1
						}
					}
				}
				let data = {
					websocketType: "chatList",
					content: this.content,
					receiverId: this.friendId,
					senderId: this.User.id,
					type: 'text',
				}
				this.list.push({
					content: this.content,
					userType: 'self',
					type: 'text',
					read: false,
				})
				webSocketManager.sendChatMessage(data);
				uni.setStorageSync('msgList', msgList)
				uni.setStorageSync('chatList' + this.friendId, this.list)
				this.content = ''
				this.scrollToBottom()
				// 模拟对方回复
				setTimeout(() => {
					this.list.push({
						content: '好的',
						userType: 'friend',
						avatar: this.friend
					})
					this.scrollToBottom()
				}, 1500)
			},
			getSaveTime(data) {
				let date = new Date(data);
				return (date.getMonth() + 1) + '月' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() +
					':' + date.getSeconds();
			},
			chooseImage() {
				uni.chooseImage({
					success: (res) => {
						//把图片上传至服务器
						uploadFile(res.tempFilePaths[0])
							.then(response => {
								if (response.code === 200) {
									this.list.push({
										content: response.data.url,
										userType: 'self',
										type: 'image',
										avatar: this.self
									})
									uni.setStorageSync('chatList' + this.friendId, this.list)
									let data = {
										websocketType: "chatList",
										content: response.data.url,
										receiverId: this.friendId,
										senderId: this.User.id,
										type: 'image',
									}
									webSocketManager.sendChatMessage(data);
									console.log('上传成功:', response);
								} else {
									uni.showToast({
										title: response.msg || '文件不能大于10mb',
										icon: 'error',
										duration: 2000,
									})
								}
							})
							.catch(error => {
								uni.showToast({
									title: error.data.msg || '发送失败，请稍后再试',
									icon: 'error',
								});
								console.error('上传失败:', error);
							});
						this.scrollToBottom()
						// 模拟对方回复
						setTimeout(() => {
							this.list.push({
								content: '风景好漂亮啊~',
								userType: 'friend',
								avatar: this.friend
							})
							this.scrollToBottom()
						}, 1500)
					}
				})
			},

			touchend() {
				if (!this._recordAuth || !this.recordStart) return
				//停止录音
				recorderManager.stop();
				recorderManager.onStop((res) => {
					console.log('结束录音', res)
					const {
						duration,
						tempFilePath
					} = res
					this.recordStart = false

					this.list.push({
						content: tempFilePath,
						userType: 'self',
						avatar: this.self,
						type: 'voice'
					});

					//把语音上传至服务器
					uploadFile(tempFilePath)
						.then(response => {
							let data = {
								websocketType: "chatList",
								content: response.data.url,
								receiverId: this.friendId,
								senderId: this.User.id,
								duration: Math.round(duration / 1000),
								type: 'voice',
							}
							webSocketManager.sendChatMessage(data);
							uni.setStorageSync('chatList' + this.friendId, this.list)
						})
						.catch(error => {
							uni.showToast({
								title: error.data.msg || '发送失败，请稍后再试',
								icon: 'error',
							});
							console.error('上传失败:', error);
						});
					this.scrollToBottom();
				});
			},

			scrollToBottom() {
				uni.pageScrollTo({
					scrollTop: 999999 + Math.random(),
				});
			},

			msgClick(data) {
				if (data.type === 'voice') {
					if (this._innerAudioContext) {
						this._innerAudioContext.stop()
						this._innerAudioContext.src = data.audioSrc
						this._innerAudioContext.play()
						return
					}
					this.play(data.audioSrc)
				}
			},

			authTips() {
				uni.showModal({
					title: '提示',
					content: '您拒绝了麦克风权限，将导致功能不能正常使用，去设置权限？',
					confirmText: '去设置',
					cancelText: '取消',
					success: (res) => {
						if (res.confirm) {
							uni.openSetting({
								success: (res) => {
									if (res.authSetting['scope.record']) {
										console.log("已授权麦克风");
										this._recordAuth = true
									} else {
										// 未授权
										wx.showModal({
											title: '提示',
											content: '您未授权麦克风，功能将无法使用',
											showCancel: false,
											confirmText: '知道了'
										})
									}
								}
							})
						}
					}
				})
			},

			touchstart() {
				//开始录音
				const _permission = 'scope.record'
				uni.getSetting({
					success: (res) => {
						// 判断是否有相关权限属性
						if (res.authSetting.hasOwnProperty(_permission)) {
							// 属性存在，且为false，用户拒绝过权限
							if (!res.authSetting[_permission]) {
								this.authTips()
							} else {
								// 已授权
								this._recordAuth = true
								// 开始录音
								recorderManager.start()
								recorderManager.onStart(() => {
									this.recordStart = true
								})

								// 错误回调
								recorderManager.onError((res) => {
									console.log('recorder error', res)
									uni.showToast({
										icon: 'none',
										title: '系统出错，请重试'
									})
									this.recordStart = false
								})
							}
						} else {
							// 属性不存在，需要授权
							uni.authorize({
								scope: _permission,
								success: () => {
									// 授权成功
									this._recordAuth = true
								},
								fail: (res) => {
									/**
									 * 104 未授权隐私协议
									 * 用户可能拒绝官方隐私授权弹窗，为了避免过度弹窗打扰用户，开发者再次调用隐私相关接口时，
									 * 若距上次用户拒绝不足10秒，将不再触发弹窗，直接给到开发者用户拒绝隐私授权弹窗的报错
									 */
									if (res.errno === 104) {
										uni.showModal({
											title: '温馨提示',
											content: '您拒绝了隐私协议，请稍后再试',
											confirmText: '知道了',
											showCancel: false,
											success: () => {}
										})
									} else {
										// 用户拒绝授权
										this.authTips()
									}
								}
							})
						}
					}
				})
			},


			//播放声音
			play(src) {
				this._innerAudioContext = wx.createInnerAudioContext()
				this._innerAudioContext.src = src
				this._innerAudioContext.play()
				this._innerAudioContext.onPlay(() => {
					console.log('开始播放')
				})
				this._innerAudioContext.onEnded(() => {
					// 播放完毕，清除音频链接
					console.log('播放完毕');
				})
				this._innerAudioContext.onError((res) => {
					console.log('audio play error', res)
				})
			},
		},
	}
</script>

<style>
	page {
		height: 100%;
		width: 100%;
		background: linear-gradient(180deg, #000000 5%, #45333B 53%, #000000 95%);
		background-attachment: fixed;
	}
</style>
<style lang="scss" scoped>
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
	.scroll-view {
		padding: 30rpx 30rpx;
		box-sizing: border-box;
	}

	.message {
		display: flex;
		align-items: flex-start;
		margin-bottom: 30rpx;

		.avatar {
			width: 80rpx;
			height: 80rpx;
			border-radius: 10rpx;
			margin-right: 30rpx;
		}

		.content {
			min-height: 80rpx;
			max-width: 60vw;
			box-sizing: border-box;
			font-size: 28rpx;
			line-height: 1.3;
			padding: 20rpx;
			border-radius: 10rpx;
			background: #fff;

			image {
				width: 200rpx;
			}
		}

		&.self {
			justify-content: flex-end;

			.avatar {
				margin: 0 0 0 30rpx;
			}

			.content {
				position: relative;

				&::after {
					position: absolute;
					content: '';
					width: 0;
					height: 0;
					border: 16rpx solid transparent;
					border-left: 16rpx solid #fff;
					right: -28rpx;
					top: 24rpx;
				}
			}
		}

		&.friend {
			.content {
				position: relative;

				&::after {
					position: absolute;
					content: '';
					width: 0;
					height: 0;
					border: 16rpx solid transparent;
					border-right: 16rpx solid #fff;
					left: -28rpx;
					top: 24rpx;
				}
			}
		}
	}

	.tool {
		position: fixed;
		width: 100%;
		min-height: 120rpx;
		left: 0;
		background: #45333b;
		display: flex;
		align-items: flex-start;
		box-sizing: border-box;
		padding: 20rpx 24rpx 20rpx 40rpx;

		.left-icon {
			width: 56rpx;
			height: 56rpx;
			margin-right: 10rpx;
		}

		.input,
		.voice-crl {
			background: #eee;
			border-radius: 10rpx;
			height: 70rpx;
			flex: 1;
			padding: 0 20rpx;
			box-sizing: border-box;
			font-size: 28rpx;
		}

		.thumb {
			margin-top: 4rpx;
			margin-left: 8rpx;
			width: 64rpx;
			height: 64rpx;
		}

		.voice-crl {
			text-align: center;
			line-height: 70rpx;
			font-weight: bold;
		}
	}

	.audio-animation {
		position: fixed;
		// width: 100vw;
		// height: 100vh;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 202410;
		display: flex;
		justify-content: center;
		align-items: center;

		.text {
			text-align: center;
			font-size: 28rpx;
			color: #333;
			margin-top: 60rpx;
		}

		.audio-wave {
			padding: 50rpx;

			.audio-wave-text {
				background-color: blue;
				width: 7rpx;
				height: 12rpx;
				margin: 0 6rpx;
				border-radius: 5rpx;
				display: inline-block;
				border: none;
				animation: wave 0.25s ease-in-out;
				animation-iteration-count: infinite;
				animation-direction: alternate;
			}

			/*  声波动画  */
			@keyframes wave {
				from {
					transform: scaleY(1);
				}

				to {
					transform: scaleY(4);
				}
			}
		}
	}

	.emoji-scroll {
		height: 540rpx;
		background-color: #45333b;
		position: fixed;
		bottom: 0;
		transition: all 0.5s ease;
	}

	.emoji-panel {
		bottom: 0;
		padding: 20upx;
		display: flex;
		flex-wrap: wrap;
	}

	.emoji-item {
		padding: 10upx;
		font-size: 50upx;
	}

	.panel-scroll {
		height: 385rpx;
		bottom: 0;
		position: fixed;
		transition: all 0.5s ease;
	}

	.container {
		background-color: #45333b;
		padding: 20rpx;
	}

	.row {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20rpx;
	}

	.item {
		width: 30%;
		border-radius: 10rpx;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.image {
		width: 50%;
		height: 110rpx;
		border-radius: 10rpx 10rpx 0 0;
	}

	.text-container {
		padding: 10rpx;
		text-align: center;
	}

	.text {
		display: block;
		font-size: 24rpx;
		color: #ffffff;
		line-height: 1.5;
	}
</style>
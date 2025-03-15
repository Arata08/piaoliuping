// websocketManager.js
import config from '@/common/config.js';
import {
	getUserInfo
} from "@/common/api/piaoliupingApi";
import EventBus from '@/common/utils/eventBus';//事件总线

class WebSocketManager {
	constructor() {
		this.socketTask = null;
		this.reconnectInterval = 5000; // 5秒后重连
	}

	connectWebSocket() {
		this.socketTask = uni.connectSocket({
			url: config.webSocket,
			success: () => {
				console.log('WebSocket connection established');
				clearTimeout(this.reconnectTimer); // 清除重连定时器
			},
			fail: (err) => {
				console.error('WebSocket connection failed:', err);
				this.reconnect(); // 连接失败时尝试重连
			}
		});

		this.socketTask.onOpen(() => {
			console.log('WebSocket connection opened');
			if (uni.getStorageSync("token")){
				this.sendUserStatus('on');
			}
			this.setupMessageHandler(); // 设置消息处理程序
		});
		this.socketTask.onError((error) => {
			console.error('WebSocket error:', error);
			this.reconnect(); // 发生错误时尝试重连
		});
		this.socketTask.onClose(() => {
			console.log('WebSocket connection closed');
			this.reconnect(); // 连接关闭时尝试重连
		});
	}

	// 新增重连方法
	reconnect() {
		if (this.socketTask) {
			this.socketTask.close({
				success: () => {
					console.log('WebSocket connection closed successfully');
				},
				fail: (err) => {
					console.error('Failed to close WebSocket connection:', err);
				}
			});
		}
		this.reconnectTimer = setTimeout(() => {
			console.log('Attempting to reconnect...');
			this.connectWebSocket();
		}, this.reconnectInterval);
	}

	setupMessageHandler() {
		this.socketTask.onMessage((res) => {
			console.log('Message received:', res.data);
			this.updateMsgList(res.data);
		});
	}

	sendUserStatus(status) {
		if (this.socketTask && this.socketTask.readyState === 1) {
			this.socketTask.send({
				data: JSON.stringify({
					websocketType: 'userStatus',
					userId: uni.getStorageSync("User").id,
					status: status
				}),
				success: () => {
					console.log('Message sent successfully');
				},
				fail: (err) => {
					console.error('Failed to send message:', err);
				}
			});
		} else {
			console.log('WebSocket is not open yet, cannot send message');
		}
	}

	closeWebSocket() {
		if (this.socketTask) {
			this.socketTask.close({
				success: () => {
					console.log('WebSocket connection closed successfully');
				},
				fail: (err) => {
					console.error('Failed to close WebSocket connection:', err);
				}
			});
			clearTimeout(this.reconnectTimer); // 关闭连接时清除重连定时器
		}
	}

	sendChatMessage(message) {
		if (this.socketTask && this.socketTask.readyState === 1) {
			this.socketTask.send({
				data: JSON.stringify(message),
				success: () => {
					console.log('Message sent successfully');
				},
				fail: (err) => {
					uni.showToast({
						title: err || '发送失败，请稍后再试',
						icon: 'error',
					});
					console.error('Failed to send message:', err);
				}
			});
		} else {
			console.log('WebSocket is not open yet, cannot send message');
		}
	}

	updateMsgList(data) {
		console.log('Updating message list with:', data);
		// 调用外部方法来更新消息列表
		EventBus.emit('updateMsgList', data);
	}
}

const webSocketManager = new WebSocketManager();
export default webSocketManager;
// websocketManager.js
import config from '@/common/config.js';
import {
	getUserInfo
} from "@/common/api/piaoliupingApi";

class WebSocketManager {
	constructor() {
		this.socketTask = null;
	}

	connectWebSocket() {
		this.socketTask = uni.connectSocket({
			url: config.webSocket,
			success: () => {
				console.log('WebSocket connection established');
			},
			fail: (err) => {
				console.error('WebSocket connection failed:', err);
			}
		});

		this.socketTask.onOpen(() => {
			console.log('WebSocket connection opened');
			this.sendUserStatus('on');
		});
		this.socketTask.onError((error) => {
			console.error('WebSocket error:', error);
		});
		this.socketTask.onClose(() => {
			console.log('WebSocket connection closed');
		});
	}

	sendUserStatus(status) {
		if (this.socketTask && this.socketTask.readyState === 1) {
			this.socketTask.send({
				data: JSON.stringify({
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
		}
	}

	sendMessage(message) {
		if (this.socketTask && this.socketTask.readyState === 1) {
			this.socketTask.send({
				data: JSON.stringify(message),
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
}

const webSocketManager = new WebSocketManager();
export default webSocketManager;
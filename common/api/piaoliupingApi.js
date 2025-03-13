import request from '@/common/request.js';

export async function registerUser(data) {
	try {
		return await request({
			url: 'user/WxLogin',
			method: 'POST',
			data,
			custom: {
				showError: false,
				showLoading: true,
			},
		}); // 直接返回数据
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export function editUser(data) {
	try {
		return request({
			url: 'user/editUser',
			method: 'POST',
			data,
			custom: {
				showError: false,
				showLoading: true,
			},
		}); // 直接返回数据
	} catch (error) {
		console.error(error);
		throw error;
	}
}

//查询用户昵称和头像
export function getUserInfo(id) {
	try {
		return request({
			url: 'user/getUserInfo/' + id,
			method: 'POST',
			custom: {
				showError: false,
				showLoading: false,
			},
		}); // 直接返回数据
	} catch (error) {
		console.error(error);
		throw error;
	}
}

//获取离线消息列表
export function getOfflineMessageList() {
	try {
		return request({
			url: 'chat/getMsgList/' + uni.getStorageSync('User').id,
			method: 'POST',
			custom: {
				showError: false,
				showLoading: true,
			},
		});
	} catch (error) {
		console.error(error);
		throw error;
	}
}

//删除redis中的离线记录
export function delOfflineMessage() {
	try {
		return request({
			url: 'chat/delMsg/' + uni.getStorageSync('User').id,
			method: 'POST',
			custom: {
				showError: false,
				showLoading: false,
			},
		});
	} catch (error) {
		console.error(error);
		throw error;
	}
}
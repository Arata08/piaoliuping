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

//查询用户
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

//获取离线聊天消息
export function getOffChatList() {
	try {
		return request({
			url: 'chat/getChatMsgList/' + uni.getStorageSync('User').id,
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
export function delOffChatList(){
	try {
		return request({
			url: 'chat/delChatMsg/' + uni.getStorageSync('User').id,
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
//上传文件
export function uploadFile(filePath) {
	try {
		return request({
			url: 'file/upload',
			method: 'POST',
			data: {
				file: filePath,
			},
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

//获取关注列表
export function getFollowList() {
	try {
		return request({
			url: 'fanBlack/getFollowList/' + uni.getStorageSync('User').id,
			method: 'POST',
			custom: {
				showError: false,
				showLoading: true,
			},
		});
	} catch (error){
		console.error(error);
		throw error;
	}
}

//获取本人信息
export function getSelfInfo() {
	try {
		return request({
			url: 'user/getMine/' + uni.getStorageSync('User').id,
			method: 'POST',
			custom: {
				showError: false,
				showLoading: true,
			},
		});
	} catch (error)
	{
		console.error(error);
		throw error;
	}
}

export function sign(data) {
	try {
		return request({
			url: 'sign/sign',
			method: 'POST',
			data,
			custom: {
				showError: false,
				showLoading: true,
			},
		});
	} catch (error)
	{
		console.error(error);
		throw error;
	}
}

export function getSignedDate() {
	try {
		return request({
			url: 'sign/getSignedDate',
			method: 'POST',
			custom: {
				showError: false,
				showLoading: true,
			},
		});
	} catch (error)
	{
		console.error(error);
		throw error;
	}
}
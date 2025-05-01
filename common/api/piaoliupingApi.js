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
export function delOffChatList() {
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
			url: 'fanBlack/getFollowList',
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
	} catch (error) {
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
	} catch (error) {
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
	} catch (error) {
		console.error(error);
		throw error;
	}
}

//关注
export function follow(data) {
	try {
		return request({
			url: 'fanBlack/follow',
			method: 'POST',
			data,
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
//拉黑
export function black(data) {
	try {
		return request({
			url: 'fanBlack/black/' + data,
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
//拉黑列表
export function getBlackList() {
	try {
		return request({
			url: 'fanBlack/getBlackList',
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
//检查自己是否被拉黑
export function checkBlack(data) {
	try {
		return request({
			url: 'fanBlack/isBlack/' + data,
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
//取消拉黑
export function unBlack(data) {
	try {
		return request({
			url: 'fanBlack/unBlack/' + data,
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
//扣除余额
export function payBalance(data) {
	try {
		return request({
			url: 'pay/payBalance',
			method: 'POST',
			data,
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
export function getFilterUserList(data) {
	try {
		if(data){
			return request({
				url: 'user/getUserList',
				method: 'POST',
				data,
				custom: {
					showError: false,
					showLoading: true,
				},
			});
		}else{
			let data = {
				filter: null,
				order: null,
			}
			return request({
				url: 'user/getUserList',
				method: 'POST',
				data,
				custom: {
					showError: false,
					showLoading: true,
				},
			});
		}
	} catch (error) {
		console.error(error);
		throw error;
	}
}

//举报
export function accusation(data) {
	try {
		return request({
			url: 'user/accusation',
			method: 'POST',
			data,
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

export function addLetter(data) {
	try {
		return request({
			url: 'letter/add',
			method: 'POST',
			data,
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
export function getMyLetter() {
	try {
		return request({
			url: 'letter/getMyLetter',
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

export function getLetter(data) {
	try {
		return request({
			url: 'letter/getLetter',
			method: 'POST',
			data,
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
//评论
export function addComment(data) {
	try {
		return request({
			url: 'letterComment/add',
			method: 'POST',
			data,
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
//评论总数
export function getCommentCount(LetterId) {
	try {
		return request({
			url: 'letterComment/getCount/' + LetterId,
			method: 'GET',
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
//评论列表
export function getCommentList(LetterId) {
	try {
		return request({
			url: 'letterComment/getCommentByLetterId/' + LetterId,
			method: 'GET',
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
//根据id获取信件
export function getLetterById(id) {
	try {
		return request({
			url: 'letter/getLetterById/' + id,
			method: 'GET',
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
//收件箱
export function getInLetter() {
	try {
		return request({
			url: 'letter/getInLetter',
			method: 'GET',
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

//从收件箱删除信件
export function deleteInLetter(data) {
	try {
		return request({
			url: 'letter/deleteInLetter/' + data,
			method: 'DELETE',
			data,
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
//根据id修改评论为已删除
export function updateCommentState(id) {
	try {
		return request({
			url: 'letterComment/updateCommentState/' + id,
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
//根据id删除评论
export function deleteComment(letterId) {
	try {
		return request({
			url: 'letterComment/deleteComment/' + letterId,
			method: 'DELETE',
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
import Request from './utils/luch-request/luch-request/index.js';
import {
	baseUrl,
	apiPath
} from './config';
 
// 创建一个请求实例  
const http = new Request({
	baseURL: baseUrl,
	timeout: 8000,
	header: {
		'Content-Type': 'application/json;charset=UTF-8',
	},
});
 
// Loading全局实例  
let loadingInstance = null;
 
// 显示loading  
function showLoading(message = '加载中') {
	if (!loadingInstance) {
		loadingInstance = uni.showLoading({
			title: message,
			mask: true,
		});
	}
}

// 请求拦截器  
http.interceptors.request.use(
	(config) => {
		const token = uni.getStorageSync('token');
		if (token) {
			config.header['token'] = token;
		}else{
			// 未登录，跳转到登录页面
			uni.navigateTo({
				url: '/pages/index/index',
			});
		}
		// 显示loading（可根据需要添加条件）  
		showLoading();
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
 
// 响应拦截器  
http.interceptors.response.use(
	(response) => {
		// 隐藏loading  
		uni.hideLoading()
		// 假设服务器返回的数据格式包含{code, data, msg}  
		if (response.data.code !== 200 || response.data.code === 500) {
			// 显示错误信息（可根据需要自定义）  
			uni.showToast({
				title: response.data.msg || '请求失败，请稍后再试',
				icon: 'error',
			});
			return Promise.reject(response.data);
		}
		return Promise.resolve(response.data);
	},
	(error) => {
		// 隐藏loading（确保无论成功还是失败都隐藏loading）  
		uni.hideLoading()
		// 显示通用错误信息（可根据需要自定义）  
		uni.showToast({
			title: '网络请求出错，请检查您的网络连接',
			icon: 'error',
		});
		return Promise.reject(error);
	}
);
 
// 封装请求函数  
const request = (config) => {
	// 确保URL以斜杠开头（如果不是以apiPath作为前缀）  
	if (config.url && config.url[0] !== '/') {
		config.url = apiPath + config.url;
	}
	return http.middleware(config);
};
 
export default request;
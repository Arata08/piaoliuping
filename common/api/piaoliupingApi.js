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
        throw error; // 抛出错误供调用方处理
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
        throw error; // 抛出错误供调用方处理
    }
}
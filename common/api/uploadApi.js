import {uploadUrl} from '../config'

//上传文件
export function uploadFile(filePath){
    return new Promise((resolve,reject)=>{
        uni.uploadFile({
            url:uploadUrl,
            filePath,
            name:'file',
            header: {
                'token': uni.getStorageSync('token')
            },
            success:res=>{
                let data = JSON.parse(res.data)
                resolve(data)
            },
            fail:err=>{
                reject(err)
            }
        })
    })
}
// 全局配置文件
// let baseUrl = 'https://ht.lilihouse.cn';
// let staticUrl = 'https://ht.lilihouse.cn';
// let baseUrl = 'https://book.lilihouse.cn';
// let staticUrl = 'https://book.lilihouse.cn';
export let baseUrl = 'http://localhost:8091';
let staticUrl = 'http://localhost:8091';
export let apiPath = '/';
// 版本号 用于更新
let version = 0;
// vuex_version版本号 用于显示s
let vuex_version = '1.0.' + version;
// 是否需要热更新（后台自动更新）
let flag_hot = false;

export default {
	baseUrl: baseUrl,
	staticUrl: staticUrl,
	version: version,
	vuex_version: vuex_version,
	apiPath: apiPath,
}


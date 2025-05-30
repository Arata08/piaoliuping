// 全局配置文件
export let baseUrl = 'http://plpback.lilihouse.cn';
export let staticUrl = 'http://plpback.lilihouse.cn/';
export let uploadUrl = 'http://plpback.lilihouse.cn//common/upload';
export let webSocket = 'wss://plpback.lilihouse.cn/ws/statusAndChat';
// export let baseUrl = 'http://localhost:8091';
// export let staticUrl = 'http://localhost:8091';
// export let uploadUrl = 'http://127.0.0.1:8091/common/upload';
// export let webSocket = 'ws://localhost:8091/ws/statusAndChat';
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
	webSocket: webSocket,
	version: version,
	vuex_version: vuex_version,
	apiPath: apiPath,
	uploadUrl: uploadUrl
}


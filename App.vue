<script lang="ts">
	import { ref, onMounted, onUnmounted } from 'vue'
	import type { TnNotifyInstance } from '@/uni_modules/tuniaoui-vue3'
	import webSocketManager from './common/websocketManager.js'

	export default {
		onLaunch: function () {
			console.log('App Launch')
		},
		onShow: function () {
			webSocketManager.sendUserStatus('on')
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
			if (uni.getStorageSync('token')) {
				webSocketManager.sendUserStatus('off')
			}
		},
		onUnload() {
			webSocketManager.closeWebSocket();
		}
	}
</script>

<style lang="scss">
	@import '@/uni_modules/tuniaoui-vue3/index.css';
	@import '@/uni_modules/nutui-uni/styles/index.scss';
</style>
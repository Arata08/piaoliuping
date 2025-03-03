<script lang="ts">
import { ref } from 'vue'
import type { TnNotifyInstance } from '@/uni_modules/tuniaoui-vue3'
    export default {
        onLaunch: function() {
            console.log('App Launch')
        },
        onShow: function() {
            console.log('App Show')
        },
        onHide: function() {
            console.log('App Hide')
        }
    }
</script>

<style lang="scss">
    @import '@/uni_modules/tuniaoui-vue3/index.css';
    @import '@/uni_modules/nutui-uni/styles/index.scss';
</style>
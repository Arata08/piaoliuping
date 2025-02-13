<template>
  <nut-notify></nut-notify>
  <view>
    <checkbox-group @change="checkboxChange">
      <label>
        <checkbox :checked="isChecked" value="cb" style="transform:scale(0.7);" /><text
          style=" font-size: 86%;">我已阅读并同意</text>
        <text @click="showAgreement1"
              style="color: coral; white-space: nowrap; font-size: 86%;">《丽丽租好房用户协议》</text>
        <web-view v-if="showWebview1" src="https://ht.lilihouse.cn/user.html"></web-view>
        <text style="white-space: nowrap;">和</text>
        <text @click="showAgreement2" style="color: coral;white-space: nowrap; font-size: 86%;">《隐私政策》</text>
        <web-view v-if="showWebview2" src="https://ht.lilihouse.cn/privacy.html"></web-view>
      </label>
      <button open-type="getPhoneNumber" @getphonenumber="weChatLogin" class="clearBtn">
        <view class="login">
          手机号快捷登录
        </view>
      </button>
    </checkbox-group>
  </view>
</template>

<script>
import { ref, reactive } from 'vue';
import { useNotify } from "nutui-uniapp/composables";
import config from "@/common/config.js"; // 全局配置文件

export default {
  setup() {
    const notify = useNotify();
    const isChecked = ref(false);
    const showWebview1 = ref(false);
    const showWebview2 = ref(false);
    const sessionKey = ref('');
    const oppenid = ref('');

    function weChatLogin(e) {
      // 检查是否同意用户协议
      if (!isChecked.value) {
        console.log(isChecked.value + "未同意用户协议");
        notify.warning("请先同意用户协议");
      } else {
        let code = e.detail.code;
        if (code) {
          uni.showLoading({
            title: "登录中....",
            mask: true
          })
          let url = "/api/miniWxApi/getPhoneNum?code=" + code;
          this.$u.get(url).then(res => {
            let phoneNum = res.phoneNum
            let weChatUrl = "/api/weChatLogin";
            this.$u.post(weChatUrl, {
              username: phoneNum,
              code: code
            }).then(data => {
              uni.hideLoading();
              // 登录成功初始化token与用户信息
              this.$u.vuex('vuex_token', data.token);
              this.$u.vuex('vuex_user', data.loginUser);
              uni.switchTab({
                url: '/pages/index/index'
              })
            });
          });
        } else {
          this.$mytip.toast('登录失败')
        }
      }
    }

    function checkboxChange(e) {
      isChecked.value = e.detail.value.includes('cb');
    }

    return {
      weChatLogin,
      isChecked,
      showWebview1,
      showWebview2,
      sessionKey,
      oppenid,
      checkboxChange,
      showAgreement1() {
        showWebview1.value = true; // 点击按钮后允许显示web-view
      },
      showAgreement2() {
        showWebview2.value = true; // 点击按钮后允许显示web-view
      },
      reg() {
        // 检查是否同意用户协议
        if (!isChecked.value) {
          return this.$refs.uToast.show({
            title: '请先同意用户协议',
            type: 'warning',
          })
        }
        this.$u.route({
          url: 'pages/login/account'
        })
      }
    };
  }
};
</script>

<style>
page {
  background-color: #ffffff;
}
</style>
<style>
.clearBtn {
  margin-top: 20px;
  background-color: rgb(83, 194, 64);
  width: 70%;
}
</style>

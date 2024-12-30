"use strict";
const common_vendor = require("../../common/vendor.js");
const __unplugin_components_4 = () => "../../node-modules/nutui-uniapp/components/tabbar/tabbar.js";
const __unplugin_components_3 = () => "../../node-modules/nutui-uniapp/components/tabbaritem/tabbaritem.js";
const __unplugin_components_2 = () => "../../node-modules/nutui-uniapp/components/button/button.js";
const __unplugin_components_1 = () => "../../node-modules/nutui-uniapp/components/icon/icon.js";
const __unplugin_components_0 = () => "../../node-modules/nutui-uniapp/components/animate/animate.js";
const _sfc_main = {
  data() {
    return {
      VideoContext: {},
      tabbarValue: 1,
      tabValue: 0,
      penImage: "/static/images/plus.png",
      star4: "/static/images/star4.png",
      inbox: "/static/images/inbox.png",
      outbox: "/static/images/outbox.png"
    };
  },
  onLoad() {
  },
  onShow() {
    this.$nextTick(() => {
      this.VideoContext = common_vendor.index.createVideoContext("videoRef");
      this.VideoContext.play();
    });
  },
  methods: {
    tabSwitch(item, index) {
      let s = this;
      const tabUrl = ["/pages/message/message", "/pages/send/send", "/pages/my/my"];
      const url = tabUrl[index];
      common_vendor.index.navigateTo({
        url,
        complete() {
          s.tabbarValue = 1;
        }
      });
    },
    onSearch() {
      common_vendor.index.showToast({
        title: "搜索中...",
        icon: "loading",
        duration: 2e3,
        mask: true,
        success() {
          console.log(1);
        }
      });
    },
    toBox(name) {
      const url = `/pages/mailbox/mailbox?type=${name}`;
      common_vendor.index.navigateTo({
        url
      });
    }
  }
};
if (!Array) {
  const _easycom_nut_animate2 = __unplugin_components_0;
  const _easycom_nut_icon2 = __unplugin_components_1;
  const _easycom_nut_button2 = __unplugin_components_2;
  const _easycom_nut_tabbar_item2 = __unplugin_components_3;
  const _easycom_nut_tabbar2 = __unplugin_components_4;
  (_easycom_nut_animate2 + _easycom_nut_icon2 + _easycom_nut_button2 + _easycom_nut_tabbar_item2 + _easycom_nut_tabbar2)();
}
const _easycom_nut_animate = () => "../../uni_modules/nutui-uni/components/animate/animate.js";
const _easycom_nut_icon = () => "../../uni_modules/nutui-uni/components/icon/icon.js";
const _easycom_nut_button = () => "../../uni_modules/nutui-uni/components/button/button.js";
const _easycom_nut_tabbar_item = () => "../../uni_modules/nutui-uni/components/tabbaritem/tabbaritem.js";
const _easycom_nut_tabbar = () => "../../uni_modules/nutui-uni/components/tabbar/tabbar.js";
if (!Math) {
  (_easycom_nut_animate + _easycom_nut_icon + _easycom_nut_button + _easycom_nut_tabbar_item + _easycom_nut_tabbar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.star4,
    b: common_vendor.p({
      type: "jump",
      loop: true
    }),
    c: common_vendor.p({
      type: "ripple",
      action: "click"
    }),
    d: common_vendor.p({
      name: $data.inbox
    }),
    e: common_vendor.o(($event) => $options.toBox("inbox")),
    f: common_vendor.p({
      type: "info",
      size: "mini"
    }),
    g: common_vendor.p({
      name: "search"
    }),
    h: common_vendor.o($options.onSearch),
    i: common_vendor.p({
      type: "primary"
    }),
    j: common_vendor.p({
      type: "flicker",
      loop: true
    }),
    k: common_vendor.p({
      type: "ripple",
      action: "click"
    }),
    l: common_vendor.p({
      name: $data.outbox
    }),
    m: common_vendor.o(($event) => $options.toBox("outbox")),
    n: common_vendor.p({
      type: "info",
      size: "mini"
    }),
    o: common_vendor.p({
      name: "message"
    }),
    p: common_vendor.p({
      ["tab-title"]: "消息"
    }),
    q: common_vendor.p({
      name: $data.penImage,
      size: "100"
    }),
    r: common_vendor.p({
      ["tab-title"]: ""
    }),
    s: common_vendor.p({
      name: "my2"
    }),
    t: common_vendor.p({
      ["tab-title"]: "我的"
    }),
    v: common_vendor.o($options.tabSwitch),
    w: common_vendor.o(($event) => $data.tabbarValue = $event),
    x: common_vendor.p({
      bottom: true,
      modelValue: $data.tabbarValue
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);

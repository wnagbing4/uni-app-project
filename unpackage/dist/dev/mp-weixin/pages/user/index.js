"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_share2 = common_vendor.resolveComponent("share");
  _easycom_share2();
}
const _easycom_share = () => "../../components/share/share.js";
if (!Math) {
  _easycom_share();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const app = getApp();
    const mine = common_vendor.ref({});
    const staff = common_vendor.ref({});
    const statistic = common_vendor.ref({
      topays: 0,
      todos: 0
    });
    common_vendor.onLoad(() => {
      app.globalData.utils.request({
        url: "/User/index",
        method: "GET",
        header: {
          token: common_vendor.index.getStorageSync("token")
        },
        success: (res) => {
          console.log(res, "res====>");
          mine.value = res.data.data.mine;
          staff.value = res.data.data.staff;
          statistic.value = res.data.data.statistic;
        }
      });
    });
    const toOrders = (e) => {
      if (e.currentTarget.dataset.filt) {
        app.globalData.order_filt = e.currentTarget.dataset.filt;
      } else {
        app.globalData.order_filt = "";
      }
      common_vendor.index.switchTab({
        url: "../order/index"
      });
    };
    const clone_shareModal = common_vendor.ref(false);
    const showShareModal = () => {
      clone_shareModal.value = true;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: mine.value.avatar
      }, mine.value.avatar ? {
        b: mine.value.avatar_url
      } : {
        c: common_assets._imports_0$5
      }, {
        d: common_vendor.t(mine.value.nickname ? mine.value.nickname : "用户" + mine.value._id),
        e: common_vendor.o(toOrders),
        f: common_assets._imports_1,
        g: statistic.value.topays > 0
      }, statistic.value.topays > 0 ? {
        h: common_vendor.t(statistic.value.topays)
      } : {}, {
        i: common_vendor.o(toOrders),
        j: common_assets._imports_2,
        k: statistic.value.todos > 0
      }, statistic.value.todos > 0 ? {
        l: common_vendor.t(statistic.value.todos)
      } : {}, {
        m: common_vendor.o(toOrders),
        n: common_assets._imports_3,
        o: common_vendor.o(toOrders),
        p: common_assets._imports_4,
        q: common_vendor.o(toOrders),
        r: common_assets._imports_5,
        s: common_assets._imports_6,
        t: common_vendor.o(showShareModal),
        v: common_vendor.p({
          shareModal: clone_shareModal.value
        })
      });
    };
  }
};
wx.createPage(_sfc_main);

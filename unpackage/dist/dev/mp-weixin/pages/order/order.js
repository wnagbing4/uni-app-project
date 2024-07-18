"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_counter2 = common_vendor.resolveComponent("counter");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_counter2 + _easycom_uni_popup2)();
}
const _easycom_counter = () => "../../components/counter/counter.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_counter + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "order",
  setup(__props) {
    common_vendor.onLoad((params) => {
      getOrderDetail(params);
    });
    const qrcodePopup = common_vendor.ref();
    const doplay = () => {
      qrcodePopup.value.open("center");
      const qr = new common_vendor.UQRCode();
      qr.data = order.value.code_url;
      qr.size = 150;
      qr.make();
      var canvasContext = common_vendor.index.createCanvasContext("qrcode");
      qr.canvasContext = canvasContext;
      qr.drawCanvas();
    };
    const payment = () => {
      common_vendor.index.switchTab({
        url: "../order/index"
      });
    };
    const app = getApp();
    const order = common_vendor.ref({});
    const orderStatus = common_vendor.computed(() => {
      const map = {
        "待支付": "10",
        "待服务": "20",
        "已完成": "30",
        "已取消": "40"
      };
      return map[order.value.trade_state];
    });
    const onCounterOver = () => {
      getOrderDetail();
    };
    const getOrderDetail = (params) => {
      app.globalData.utils.request({
        url: "/order/detail",
        header: {
          token: common_vendor.index.getStorageSync("token")
        },
        data: {
          oid: params.oid
        },
        success: (res) => {
          console.log(res, "订单详情");
          order.value = res.data.data;
        }
      });
    };
    const makePhoneCall = (e) => {
      common_vendor.index.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.tel
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$4,
        b: common_vendor.n("od-jd od-jd-" + orderStatus.value),
        c: orderStatus.value == 10
      }, orderStatus.value == 10 ? {
        d: common_vendor.o(onCounterOver),
        e: common_vendor.p({
          second: order.value._exp_time
        }),
        f: common_vendor.t(order.value.price),
        g: common_vendor.o(doplay)
      } : {}, {
        h: orderStatus.value == 20
      }, orderStatus.value == 20 ? common_vendor.e({
        i: order.value.service_state == 0
      }, order.value.service_state == 0 ? {} : {}, {
        j: order.value.service_state == 1
      }, order.value.service_state == 1 ? {} : {}) : {}, {
        k: orderStatus.value == 30
      }, orderStatus.value == 30 ? {} : {}, {
        l: orderStatus.value == 40
      }, orderStatus.value == 40 ? {} : {}, {
        m: orderStatus.value == 20
      }, orderStatus.value == 20 ? {
        n: order.value._staff.avatar_url,
        o: common_vendor.t(order.value._staff.nickname),
        p: common_vendor.o(makePhoneCall),
        q: order.value._staff.mobile
      } : {}, {
        r: common_vendor.o(payment),
        s: common_assets._imports_0$1,
        t: common_vendor.sr(qrcodePopup, "963de63e-1", {
          "k": "qrcodePopup"
        }),
        v: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false,
          ["background-color"]: "#fff"
        })
      });
    };
  }
};
wx.createPage(_sfc_main);

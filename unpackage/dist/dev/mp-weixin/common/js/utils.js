"use strict";
const common_vendor = require("../vendor.js");
class Utils {
  constructor() {
    this.baseUrl = "https://code.itndedu.com/pz";
  }
  getUserInfo() {
    common_vendor.index.login({
      success: (res) => {
        this.request({
          url: "/auth/wxLogin",
          data: {
            code: res.code
          },
          success: (res2) => {
            console.log(res2, "res");
          }
        });
      }
    });
  }
  request(option = {
    showloading: false
  }) {
    if (!option.url) {
      return false;
    }
    common_vendor.index.request({
      url: this.baseUrl + option.url,
      data: option.data ? option.data : {},
      header: option.header ? option.header : {},
      method: option.method ? option.method : "GET",
      success: (response) => {
        if (response.data.code != 1e4) {
          if (option.fail && typeof option.fail == "function") {
            option.fail(response);
          }
        } else {
          if (option.success && typeof option.success == "function") {
            option.success(response);
          }
        }
      }
    });
  }
  showloading() {
    const isShowLoading = common_vendor.index.getStorageSync("isShowLoading");
    if (isShowLoading) {
      common_vendor.index.hideLoading();
      common_vendor.index.setStorageSync("isShowLoading", false);
    }
    common_vendor.index.showLoading({
      title: "加载中...",
      complete: () => {
        common_vendor.index.setStorageSync("isShowLoading", true);
      },
      fail: () => {
        common_vendor.index.setStorageSync("isShowLoading", false);
      }
    });
  }
}
const Utils$1 = new Utils();
exports.Utils = Utils$1;

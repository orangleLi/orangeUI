const app = getApp();
const commonDataDao = require('./CommonDataDao.js');
const util = require('../utils/util.js');
const base64Util = require('../utils/base64Util.js');
const Base64 = new base64Util.Base64();

// 生成订单
// encodeURIComponent(Base64.encode(JSON.stringify(params)))
let OrderSubmitForrSolitaire = function (activityData, callBack) {
  let url = 'api/AppOrder/OrderSubmitForSolitaire'
  let paramData = {
    param: activityData
  }
  commonDataDao.fetchGet(url, paramData, function (res) {
    callBack && callBack(res)
  })

}

//订单支付
// wxHeadImg wxName
let OrderPay = (OrderNum, openid, wxName, wxHeadImg, urlPrefix, callback) => {
  let that = this;
  let params = {
    param: {
      "OrderType": 0,
      "paymentChannel": "PayOnLine",
      "paymentType": "qfwxsppay",
      "OrderNum": OrderNum,
      "paymentScanType": "",
      "OrganizationCode": "-2"
    },
    userId: openid,
    wxName: wxName,
    wxHeadImg: wxHeadImg
  };
  let url = 'api/AppPay/OrderPay';
  commonDataDao.fetchGet(url, params, res => {
    wx.hideLoading();
    if (res.data.resultCode != "1") {
      wx.showToast({ //显示消息提示框  此处是提升用户体验的作用
        title: res.data.resultMsg,
        icon: 'none',
        duration: 1500,
      });
      return;
    }
    console.log(res.data.resultValue)
    //发起微信支付
    wx.requestPayment({
      timeStamp: res.data.resultValue.timeStamp,
      nonceStr: res.data.resultValue.nonceStr,
      package: res.data.resultValue.package,
      signType: res.data.resultValue.signType,
      paySign: res.data.resultValue.paySign,
      success(re) {
        callback && callback(re)
        wx.navigateTo({
          url: urlPrefix + '/paySuccess/paySuccess',
        });
       },
      fail(re) {
        callback && callback(re)
        wx.navigateTo({
          url: urlPrefix + '/payFail/payFail',
        });
       }
    });
    console.log(res);
  }, () => {
  });
}

module.exports = {
  OrderSubmitForrSolitaire: OrderSubmitForrSolitaire,
  OrderPay: OrderPay
}
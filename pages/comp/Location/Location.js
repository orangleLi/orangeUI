// pages/Location/Location.js
const app = getApp();
const location = require('./locationAPI.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityAddress: '定位中',
    isShare: '',
    num: 1,
    hiddenAuthorizeModal: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  onShow() {
    this.init();
  },
  init(callback) {
    var _this = this;
    wx.showLoading({
      title: '加载中...',
    })
    location.init(function (activityAddress) {
      wx.hideLoading();
      if (typeof activityAddress === 'boolean') {
        _this.setData({
          hiddenAuthorizeModal: false
        })
      } else {
        _this.setData({
          activityAddress: activityAddress
        })
      }
      callback && callback();
    })
  },
  onChangeAddress: function (e) {
    var _this = this;
    location.onChangeAddress(e, function (activityAddress) {
      _this.setData({
        activityAddress: activityAddress
      })

    })
  },
  toAuthorizeClick () {
    this.setData({
      hiddenAuthorizeModal: true
    })
  },
  onPullDownRefresh() {
    wx.startPullDownRefresh()
    this.init(() => {
      wx.stopPullDownRefresh();
    });
  }
})
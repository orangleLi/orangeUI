//app.js
App({
  onLaunch: function () {
    let phone = wx.getSystemInfoSync().model
    this.globalData.isIphoneX = phone === 'iPhone X' || phone === 'iPhoneX' || phone === 'iphonrx'
  },
  globalData: {
    userInfo: null,
    isIphoneX: false
  }
})
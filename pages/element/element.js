//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },
  onLoad: function () {
    
  },
  navTo(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
})

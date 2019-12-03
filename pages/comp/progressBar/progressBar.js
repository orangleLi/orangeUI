// pages/comp/progressBar/progressBar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    percentage: 80
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.selectComponent('#progress').init();
  }
})
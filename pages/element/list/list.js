// pages/element/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconList: [
      {
        icon: '/resources/images/heart.png',
        title: '打卡',
        desc: '123',
        src: '/resources/images/right.png'
      },
      {
        icon: '/resources/images/heart.png',
        title: 'hhh',
        desc: '123',
        src: '/resources/images/right.png'
      },
      {
        icon: '/resources/images/heart.png',
        title: '优惠券',
        desc: '123',
        src: '/resources/images/right.png'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  navTo() {
    console.log('跳转页面')
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
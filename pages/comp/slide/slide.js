// pages/Slide/slide.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: -1,
    list: [
      {
        content: '展示信息 - 滑动删除事件1'
      },
      {
        content: '展示信息 - 滑动删除事件2'
      },
      {
        content: '展示信息 - 滑动删除事件3'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  deleteItem: function (e) {
    const index = e.currentTarget.dataset.index;
    let data = this.data.list;
    data.splice(index, 1);
    this.setData({
      list: data
    })
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
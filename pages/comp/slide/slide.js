// pages/Slide/slide.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  touchstart: function (e) {
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY
    })
  },
  touchmove: function (e) {
    this.setData({
      endX: e.changedTouches[0].clientX,
      endY: e.changedTouches[0].clientY
    })
  },
  touchend: function (e) {
    let that = this;
    let angle = that.angle({ X: that.data.startX, Y: that.data.startY }, { X: that.data.endX, Y: that.data.endY });
    if (Math.abs(angle) > 30) return;
    if (that.data.endX > that.data.startX) {
      this.setData({
        active: false
      })
    } else {
      this.setData({
        active: true
      })
    }
  },
  /**
  * 计算滑动角度
  * @param {Object} start 起点坐标
  * @param {Object} end 终点坐标
  */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
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
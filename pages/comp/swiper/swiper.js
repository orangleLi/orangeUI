// pages/comp/swiper/swiper.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 3000,
    duration: 1000,
    imageWidth: 375,
    imgheight: 300,
    imgUrls: ['/resources/images/i.jpg', '/resources/images/y.jpg', '/resources/images/z.png'],
    swiperCurrent: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  }, 
  imageLoad(e) {
    let pixelRatio = wx.getSystemInfoSync().pixelRatio;
    console.log(wx.getSystemInfoSync().windowWidth)
    let w = wx.getSystemInfoSync().windowWidth - (30 * 2 / pixelRatio);

    var $width = e.detail.width; //获取图片真实宽度
    var $height = e.detail.height; //获取图片真实高度
    this.setData({
      imageWidth: w,
      imgheight: w / $width * $height
    })
  },
  swiperChange(e) {
    this.setData({
      swiperCurrent: e.detail.current
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
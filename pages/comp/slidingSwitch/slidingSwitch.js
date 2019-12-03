// pages/slidingSwitch/slidingSwitch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowActive: 0,
    height: 0,
    showData: [
      {
        "activityId": "1",
        "ImageUrl": [
          ""
        ],
        "orderId": "11111",
        "orderNo": "PO20190802123456",
        "orderStatus": "已完成",
        "NotifyReceive": 0,
        "time": "2019-07-22 14:32:16",
        "productKindNums": 1
      },
      {
        "activityId": "1",
        "ImageUrl": [
          ""
        ],
        "orderId": "11111",
        "orderNo": "PO20190802123456",
        "orderStatus": "已完成",
        "NotifyReceive": 0,
        "time": "2019-07-22 14:32:16",
        "productKindNums": 1
      },
      {
        "activityId": "1",
        "ImageUrl": [
          ""
        ],
        "orderId": "11111",
        "orderNo": "PO20190802123456",
        "orderStatus": "已完成",
        "NotifyReceive": 0,
        "time": "2019-07-22 14:32:16",
        "productKindNums": 1
      },
      {
        "activityId": "1",
        "ImageUrl": [
          ""
        ],
        "orderId": "11111",
        "orderNo": "PO20190802123456",
        "orderStatus": "已完成",
        "NotifyReceive": 0,
        "time": "2019-07-22 14:32:16",
        "productKindNums": 1
      },
    ],
    saledOrderData: [
      {
        "Id": "1",
        "Title": "测试商品0.01",
        "RefundType": "RefundMoney",
        "OrderType": 0,
        "Pics": "",
        "UnitPrice": "0.01",
        "RefundQty": "1",
        "Status": "待审核",
        "Props": "",
        "RefundOrderNum": "TH20190802123456",
        "Time": "2019-07-30 11:20:16",
        "RefundPrice": "0.01",
        "OriginalPrice": "0.01"
      }
    ]


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setHeight();
  },
  setHeight() {
    var query = wx.createSelectorQuery();
    //选择id
    var that = this;
    query.select('#title').boundingClientRect(function (rect) {
      that.setData({
        height: wx.getSystemInfoSync().windowHeight - rect.height
      })
    }).exec();
  },

  lower() {
    if (this.data.nowActive === 0) {
      console.log('订单列表加载更多')
    } else {
      console.log('售后单列表加载更多')
    }
  },

  switchTagClick(e) {
    let curr = parseInt(e.currentTarget.dataset.curr);
    if (curr === this.data.nowActive) return;
    else {
      this.setData({
        nowActive: parseInt(e.currentTarget.dataset.curr)
      })
    }
  },

  /**
   * 切换订单列表/售后单列表
   */
  switchTag: function (e) {
    this.setData({
      nowActive: parseInt(e.detail.current)
    });
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
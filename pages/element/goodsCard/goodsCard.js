// pages/comp/goods/goods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsInfo: [
      {
        url: 'http://mall.einwin.com/Uploads/ProductPtotos/b0ae06b9-4c69-420c-b427-b45ce140b07c/200x200/3e9bccdc-f3c6-4008-b6df-0bae69d33090.jpg',
        title: '奇异果（4个/包）',
        subTitle: '二级标题二级标题二级标题二级标题二级标题二级标题',
        price: 199,
        originalPrice: 299,
        quantity: 1
      },
      {
        url: 'http://mall.einwin.com/Uploads/ProductPtotos/b0ae06b9-4c69-420c-b427-b45ce140b07c/200x200/3e9bccdc-f3c6-4008-b6df-0bae69d33090.jpg',
        title: '奇异果（4个/包）',
        subTitle: '二级标题',
        price: 199,
        originalPrice: 299,
        quantity: 1
      },
      {
        url: 'http://mall.einwin.com/Uploads/ProductPtotos/b0ae06b9-4c69-420c-b427-b45ce140b07c/200x200/3e9bccdc-f3c6-4008-b6df-0bae69d33090.jpg',
        title: '奇异果（4个/包）奇异果（4个/包）奇异果（4个/包）',
        price: 199,
        originalPrice: 299,
        quantity: 1
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  inputNumber(e) {
    console.log(`店铺index：${e.detail.index}(没有店铺可忽略这个值), 商品index：${e.detail.idx}, 数量：${e.detail.val}`)
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
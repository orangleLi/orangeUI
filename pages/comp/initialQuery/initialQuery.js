// pages/comp/initialQuery/initialQuery.js
const singerData = require('./singer.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    initial: [],
    activeIndex: 0,
    singer: [],
    MAX_HOT_LEN: 10,
    toView: '',
    sceenHeight: wx.getSystemInfoSync().screenHeight,
    listHeight: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.normallizeSinger();
  },
  normallizeSinger() {
    let initial = [];
    let singer = {
      hot: {
        title: '热门',
        items: []
      }
    };
    singerData.singerJson.forEach((item, index) => {
      if (index < this.data.MAX_HOT_LEN) {
        singer.hot.items.push(new singerData.Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      }
      const key = item.Findex;
      if (!singer[key]) {
        singer[key] = {
          title: key,
          items: []
        }
        initial.push(key);
      }
      singer[key].items.push(new singerData.Singer({
        id: item.Fsinger_mid,
        name: item.Fsinger_name
      }))
    })
    initial.sort((a, b) => {
      return a.charCodeAt(0) - b.charCodeAt(0);
    })
    initial.unshift('热');
    let ret = [];
    let hot = [];
    for (let key in singer) {
      if (singer[key].title.match(/[a-zA-Z]/)) {
        ret.push(singer[key])
      } else {
        hot.push(singer[key])
      }
    }
    ret.sort((a, b) => {
      return a.title.charCodeAt(0) - b.title.charCodeAt(0);
    })
    this.setData({
      singer: hot.concat(ret),
      initial: initial
    });
    this.calculateHeight();
  },
  // 计算 热 A B C ... Z每一个块距离顶部的高度
  calculateHeight() {
    let listHeight = [];
    for (let i = 0; i < this.data.singer.length; i++) {
      let query = wx.createSelectorQuery();
      query.select(`#initial-${i}`).boundingClientRect((rect) => {
        listHeight.push(rect.top);
      }).exec()
    }
    this.setData({
      listHeight: listHeight
    })
  },
  navTo(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      activeIndex: index,
      toView: `initial-${index}`
    })
  },
  onScroll(e) {
    let len = this.data.listHeight.length;
    for (let i = 0; i < len - 1; i++) {
      // 最后一个元素
      if (e.detail.scrollTop > this.data.listHeight[len - 1]) {
        if(i !== this.data.activeIndex) {
          this.setData({
            activeIndex: len - 1
          })
        }   
      } else if (e.detail.scrollTop > this.data.listHeight[i] && e.detail.scrollTop < this.data.listHeight[i + 1]) {
        if (i !== this.data.activeIndex) {
          this.setData({
            activeIndex: i
          })
        }        
      }
    }
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
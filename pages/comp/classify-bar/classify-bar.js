// pages/classify-bar/classify-bar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classify: [
      { name: '精选' },
      { name: '前端' },
      { name: '后端' },
      { name: '安卓' },
      { name: 'IOS' },
      { name: '人工智能' },
      { name: 'UI' },
      { name: '开发工具' },
      { name: '代码人生' },
      { name: '阅读' },
      { name: '分类11' },
      { name: '分类12' }
    ],
    selectMsg: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  clickClassify(e) {
    let index = e.detail;
    this.setData({
      selectMsg: `索引：${index}, 标签名：${this.data.classify[index].name}`
    })
  }
})
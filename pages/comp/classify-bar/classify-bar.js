// pages/classify-bar/classify-bar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classifyModalShow: false,
    scrollLeft: 0,
    classifyActiveIndex: 0,
    BAR_WIDTH: 68,
    classify: [
      { name: '分类1' },
      { name: '分类2' },
      { name: '分类3' },
      { name: '分类4' },
      { name: '分类5' },
      { name: '分类6' },
      { name: '分类7' },
      { name: '分类8' },
      { name: '分类9' },
      { name: '分类10' },
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
  toCategory(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      selectMsg: `index：${index}, tagName：${this.data.classify[index].name}`
    })
    this.setSlider(index);
  },
  transClassifyModal() {
    this.setData({
      classifyModalShow: !this.data.classifyModalShow
    })
  },
  clickClassify(e) {
    let index = e.currentTarget.dataset.index;
    this.setSlider(index);
    this.transClassifyModal();
    this.setData({
      selectMsg: `索引：${index}, 标签名：${this.data.classify[index].name}`
    })
  },
  setSlider(index) {
    this.scrollLeft = (index - 1) * this.data.BAR_WIDTH;
    this.setData({
      scrollLeft: (index - 1) * this.data.BAR_WIDTH,
      classifyActiveIndex: index
    })
  }
})
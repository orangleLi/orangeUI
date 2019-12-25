// components/classify-bar/classify-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    classify: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    classifyModalShow: false,
    scrollLeft: 0,
    classifyActiveIndex: 0,
    BAR_WIDTH: 68,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toCategory(e) {
      let index = e.currentTarget.dataset.index;
      this.setSlider(index);
      this.triggerEvent('clickClassify', index)
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
      this.triggerEvent('clickClassify', index)
    },
    setSlider(index) {
      this.scrollLeft = (index - 1) * this.data.BAR_WIDTH;
      this.setData({
        scrollLeft: (index - 1) * this.data.BAR_WIDTH,
        classifyActiveIndex: index
      })
    }
  }
})

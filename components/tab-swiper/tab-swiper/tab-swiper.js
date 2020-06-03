// components/tab-swiper/tab-swiper/tab-swiper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    height: 620,
    nowActive: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {

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

  }
})

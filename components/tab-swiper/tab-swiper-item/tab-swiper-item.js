// components/tab-swiper/tab-swiper-item/tab-swiper-item.js
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
    height: 620
  },

  /**
   * 组件的方法列表
   */
  methods: {
    lower() {
      if (this.data.nowActive === 0) {
        console.log('订单列表加载更多')
      } else {
        console.log('售后单列表加载更多')
      }
    },

  }
})

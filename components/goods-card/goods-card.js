// components/goods-card/goods-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    direction: {
      type: String,
      value: 'v'
    },
    imgHeight: {
      type: Number,
      value: 220
    },
    col: {
      type: String,
      value: '1'
    },
    goodsInfo: {
      type: Object,
      value: function() {
        return {}
      }
    },
    url: {
      type: String,
      value: 'url'
    },
    title: {
      type: String,
      value: 'title'
    },
    subTitle: {
      type: String,
      value: 'subTitle'
    },
    price: {
      type: String,
      value: 'price'
    },
    originalPrice: {
      type: String,
      value: 'originalPrice'
    },
    type: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    screenWidth: 0
  },
  options: {
    multipleSlots: true,
    addGlobalClass: true
  },
  lifetimes: {
    attached() {
      let screenWidth = ((wx.getSystemInfoSync().screenWidth-45)/this.properties.col).toFixed(2)
      this.setData({
        screenWidth: screenWidth
      })
    }
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    toDatail () {
      this.triggerEvent('toDatail', this.goodsInfo)
    },
  }
})

// components/goodsCard/goodsCard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tagIsImage: {
      type: Boolean,
      value: false
    },
    tag: {
      type: String,
      value: ''
    },
    src: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    subTitle: {
      type: String,
      value: ''
    },
    price: {
      type: Number,
      value: 0
    },
    number: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toGoodsDetail() {
      this.triggerEvent('toGoodsDetail')
    }
  }
})

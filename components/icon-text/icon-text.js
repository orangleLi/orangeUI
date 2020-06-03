// components/icon-text/icon-text.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    icon: {
      type: String,
      value: ''
    },
    text: {
      type: String,
      value: ''
    },
    num: {
      type: Number,
      value: 0
    },
    img: {
      type: String,
      value: ''
    },
    imgW: {
      type: String,
      value: '100rpx'
    },
    imgH: {
      type: String,
      value: '100rpx'
    }
  },
  options: {
    addGlobalClass: true
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
    navTo() {
      this.triggerEvent('navTo')
    }
  }
})

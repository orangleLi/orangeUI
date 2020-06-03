// components/bottom-nav/bottom-nav.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    height: {
      type: String,
      value: '100rpx'
    } 
  },

  /**
   * 组件的初始数据
   */
  data: {
    isIphoneX: app.globalData.isIphoneX
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

// components/address-border/address-border.js
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
    num: 0
  },
  options: {
    addGlobalClass: true
  },

  ready() {
    let width = wx.getSystemInfoSync().screenWidth
    this.setData({
      num: parseInt(width / 30)
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})

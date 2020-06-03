// components/botton-rect/botton-rect.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    color: {
      type: String,
      value: '#fff'
    },
    colorBg: {
      type: String,
      value: 'transparent'
    },
    width: {
      type: String,
      value: ''
    },
    height: {
      type: String,
      value: ''
    },
    size: {
      type: String,
      value: ''
    },
    radius: {
      type: String,
      value: ''
    },
    disabled: {
      type: Boolean,
      value: false
    },
    border: {
      type: String,
      value: ''
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
    navTo() {
      this.triggerEvent('navTo')
    }
  }
})

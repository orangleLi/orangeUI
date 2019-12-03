// components/noticeBar/noticeBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mode: {
      type: String,
      value: ''  // closeable / link
    },
    delay: {
      type: Number,
      value: 1
    },
    speed: {
      type: Number,
      value: 50
    },
    scrollable: {
      type: Boolean,
      value: true
    },
    wrapable: {
      type: Boolean,
      value: false
    },
    leftIcon: {
      type: String,
      value: ''
    },
    color: {
      type: String,
      value: '#ed6a0c'
    },
    backgroundColor: {
      type: String,
      value: '#fffbe8'
    },
    text: {
      type: String,
      value: '暂无公告'
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
    ani() {
      return ''
    }
  }
})

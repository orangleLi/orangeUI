// components/m-input/m-input.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder: {
      type: String,
      value: ''
    },
    model: {
      type: String,
      value: ''
    },
    icon: {
      type: String,
      value: ''
    },
    focus: {
      type: Boolean,
      value: false
    },
    colorBg: {
      type: String,
      value: '#eee'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  options: {
    addGlobalClass: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onInput(e) {
      this.triggerEvent('onInput', e.detail.value)
    }
  }
})

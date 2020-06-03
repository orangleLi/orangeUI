// components/suspend-modal/suspend-modal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShow: {
      type: Boolean,
      value: false
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
    setShow() {
      this.triggerEvent('setShow')
    }
  }
})

// components/promptModal/promptModal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShow: {
      type: Boolean,
      value: false
    },
    val: {
      type: Number,
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    title: '请输入您的内容',
    showCancel: true,
    cancelText: '取消',
    cancelColor: '#000',
    confirmText: '确认',
    confirmColor: '#ffa70a',
    cancelCallback: null,
    confirmCallback: null,
    blurVal: 1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindinput(e) {
      this.setData({
        blurVal: parseInt(e.detail.value)
      })
    },
    cancelClick () {
      this.triggerEvent('cancelClick', this.data.val)
    },
    confirmClick () {
      this.triggerEvent('confirmClick', this.data.blurVal)
    }
  }
})

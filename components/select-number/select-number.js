// components/select-number/select-number.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,
      value: -1
    },
    idx: {
      type: Number,
      value: -1
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
    isShow: false
  },
  options: {
    addGlobalClass: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    subGoods() {
      let count = this.data.val
      if (count === 1) return;
      count--;
      this.setData({
        val: count
      })
      this.emit()
    },
    addGoods() {
      let count = this.data.val
      count++;
      this.setData({
        val: count
      })
      this.emit()
    },
    cancelClick(val) {
      this.inputNumber()
      this.emit()
    },
    confirmClick(e) {
      this.inputNumber()
      this.setData({
        val: e.detail
      })
      this.emit()
    },
    emit () {
      this.triggerEvent('inputNumber', {
        index: this.data.index,
        idx: this.data.idx,
        val: this.data.val
      })
    },
    inputNumber: function() {
      this.setData({
        isShow: !this.data.isShow
      })
    }
  }
})

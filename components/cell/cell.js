// components/cell/cell.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    icon: {
      type: String,
      value: ''
    },
    iconRight: {
      type: String,
      value: 'icon-right'
    },
    title: {
      type: String,
      value: ''
    },
    desc: {
      type: String,
      value: ''
    },
    btLine: {
      type: Boolean,
      value: false
    },
    iconColor: {
      type: String,
      value: ''
    },
    isWelt: {
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
    navTo() {
      this.triggerEvent('navTo')
    }
  }
})

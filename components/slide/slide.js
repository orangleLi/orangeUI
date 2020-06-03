// components/slide/slide.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    active: false // 是否展示删除按钮
  },
  /**
   * 组件的方法列表
   */
  methods: {
    touchstart: function (e) {
      this.startX = e.changedTouches[0].clientX;
      this.startY = e.changedTouches[0].clientY;
    },
    touchmove: function (e) {
      this.endX = e.changedTouches[0].clientX;
      this.endY = e.changedTouches[0].clientY;
    },
    touchend: function (e) {
      let angle = this.angle(
        { X: this.startX, Y: this.startY },
        { X: this.endX, Y: this.endY });
      if (Math.abs(angle) > 30) return;
      this.setData({
        active: this.startX > this.endX
      })
    },
    deleteItem: function () {
      this.setData({
        active: false
      })
      this.triggerEvent('deleteItem')
    },
    /**
    * 计算滑动角度
    * @param {Object} start 起点坐标
    * @param {Object} end 终点坐标
    */
    angle: function (start, end) {
      var _X = end.X - start.X,
        _Y = end.Y - start.Y
      //返回角度 /Math.atan()返回数字的反正切值
      return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
    }
  }
})

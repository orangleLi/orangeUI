// components/swiper/swiper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgUrls: {
      type: Array,
      value: []
    },
    indicatorDots: {
      type: Boolean,
      value: false
    },
    autoplay: {
      type: Boolean,
      value: false
    },
    circular: {
      type: Boolean,
      value: false
    },
    interval: {
      type: Number,
      value: 3000
    },
    duration: {
      type: Number,
      value: 1000
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imageWidth: 375,
    imgheight: 300,
    swiperCurrent: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    imageLoad(e) {
      let pixelRatio = wx.getSystemInfoSync().pixelRatio;
      let w = wx.getSystemInfoSync().windowWidth - (30 * 2 / pixelRatio);

      var $width = e.detail.width; //获取图片真实宽度
      var $height = e.detail.height; //获取图片真实高度
      this.setData({
        imageWidth: w,
        imgheight: w / $width * $height
      })
    },
    swiperChange(e) {
      this.setData({
        swiperCurrent: e.detail.current
      })
      this.triggerEvent('swiperChange', e.detail.current)
    },
  }
})

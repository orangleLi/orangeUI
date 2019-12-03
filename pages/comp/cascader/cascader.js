// pages/comp/cascader/cascader.js
import { provinceJson, cityJson, areaJson } from '../../../components/distpicker/address.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    showData: [],
    provinceArr: [],
    cityArr: [],
    idFieldName: 'code',
    nameFieldName: 'msg',
    province: '',
    city: '',
    area: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProvinceList()
  },
  getProvinceList() {
    let that = this
    // 获取数据 provinceJson
    that.setData({
      provinceArr: provinceJson,
      showData: provinceJson
    })
    // 可自定义数据
    // 数据从接口来，注释掉上面两行代码，用下面的接口方式获取
    // 注意要修改data中idFieldName和nameFieldName的值
    // idFieldName: 'code',存储省市区唯一标识，通过省份唯一标识能在接口查出对应市的数据  如本例中字段名为code
    // nameFieldName: 'msg', 存储省市区名称的字段名  如本例中字段名为msg,  数据在components/address.js中provinceJson

    // this.$get('api/GetProvinceList', {}).then(res => {
    //   if (res.resultCode === '1') {
    //     that.setData({
    //       provinceArr: res.resultValue,
    //       showData: res.resultValue
    //     })
    //   }
    // })
  },
  getCityArr(provinceId) {
    let that = this
    that.setData({
      cityArr: cityJson[provinceId],
      showData: cityJson[provinceId]
    })
    // 自定义接口获取市数据 用法参考getProvinceList()注释内容

    // let paramData = {
    //   param: {
    //     provinceId: provinceId
    //   }
    // }
    // this.$get('api/GetCityList', paramData).then(res => {
    //   if (res.resultCode === '1') {
    //     that.setData({
    //       cityArr: res.resultValue,
    //       showData: res.resultValue
    //     })
    //   }
    // })
  },
  getAreaArr(cityId) {
    let that = this
    that.setData({
      showData: areaJson[cityId]
    })
    // 自定义接口获取区数据 用法参考getProvinceList()注释内容

    // let paramData = {
    //   param: {
    //     cityId: cityId
    //   }
    // }
    // this.$get('api/GetDistrictList', paramData).then(res => {
    //   if (res.resultCode === '1') {
    //     // that.$set(that, 'showData', res.resultValue)
    //     that.setData({
    //       showData: res.resultValue
    //     })
    //   }
    // })
  },
  transProvince() {
    this.setData({
      showData: this.data.provinceArr
    })
  },
  transCity() {
    this.setData({
      showData: this.data.cityArr
    })
  },
  clickBtn() {
    this.setData({
      show: !this.data.show
    })
    if (this.data.show) {
      this.setData({
        province: '',
        city: '',
        area: ''
      })
      this.getProvinceList()
    }
  },
  onChangeProvince: function (a) {
    this.setData({
      province: a.detail.value
    })
    this.getCityArr(a.detail.id)
  },
  onChangeCity: function (a) {
    this.setData({
      city: a.detail.value
    })
    this.getAreaArr(a.detail.id)
  },
  onChangeArea: function (a) {
    this.setData({
      area: a.detail.value
    })
    this.clickBtn()
  },
  close() {
    this.setData({
      show: false
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
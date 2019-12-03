// components/distpicker/distpicker.js
import { transInitials, Letter } from './address.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showData: {
      type: Array,
      value: function () {
        return []
      }
    },
    idFieldName: {
      type: String,
      value: 'code'
    },
    nameFieldName: {
      type: String,
      value: 'msg'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    province: '省',
    city: '',
    area: '',
    // 0 1 2 省市区
    tag: 0,
    Initials: {}, // 按首字母排序的省信息
    letter: Letter
  },
  ready() {
    this.setInitials(this.data.showData)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 设置以字母排序的省数据
    setInitials(provinceJson) {
      let Initials = this.data.Initials;
      provinceJson.forEach(prov => {
        if (Initials[transInitials(prov[this.data.nameFieldName])]) {
          Initials[transInitials(prov[this.data.nameFieldName])].push(prov)
        } else {
          Initials[transInitials(prov[this.data.nameFieldName])] = [prov]
        }
      })
      this.setData({
        Initials: Initials
      })
    },
    // 重新选择省
    transProvince() {
      this.setData({
        tag: 0,
        city: '',
        area: ''
      })
      this.triggerEvent('transProvince')
    },
    // 重新选择市
    transCity() {
      this.setData({
        tag: 1,
        area: ''
      })
      this.triggerEvent('transCity')
    },
    // 点击选择省/市/区
    getData(e) {
      let id = e.currentTarget.dataset.id;
      let name = e.currentTarget.dataset.name;
      if (this.data.tag === 0) {
        this.setData({
          province: name,
          tag: 1
        })
        this.onChangeProvince({
          id: id,
          value: name
        })
      } else if (this.data.tag === 1) {
        this.setData({
          city: name,
          tag: 2
        })
        this.onChangeCity({
          id: id,
          value: name
        })
      } else if (this.data.tag === 2) {
        this.setData({
          area: name,
          tag: 0
        })
        this.onChangeArea({
          id: id,
          value: name
        })
      }
    },
    // 点击选择省
    onChangeProvince(a) {
      this.triggerEvent('onChangeProvince', a)
    },
    // 点击选择市
    onChangeCity(a) {
      this.triggerEvent('onChangeCity', a)
    },
    // 点击选择区
    onChangeArea(a) {
      this.triggerEvent('onChangeArea', a)
    },
    close() {
      this.triggerEvent('close')
    }
  }
})

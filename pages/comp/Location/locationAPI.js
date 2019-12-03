var QQMapWX = require('../../../utils/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
  key: 'ULABZ-3ZX6U-U2HVA-BE6V2-5OW3H-OOFZ2'
});
let activityAddress = '定位中';
let isShowMap = false;//是否显示地图查看选择功能
let isAutoPosition = true;//是否需要自动定位
let isLocationAuthorize = false;
let positionInfo = {
  latitude: 0,
  longitude: 0,
}

let init = (callback) => {
  getLocation(callback)
}

function getLocation(callback) {
  var self = this;
  wx.getLocation({
    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的坐标，可传入'gcj02'
    altitude: false, //传入 true 会返回高度信息，由于获取高度需要较高精确度，会减慢接口返回速度
    success: function (res) {
      console.log(res)
      var latitude1 = res.latitude
      var longitude1 = res.longitude
      qqmapsdk.reverseGeocoder({
        location: {
          latitude: latitude1,
          longitude: longitude1
        },
        success: function (res) {
          console.log(res);
          let activityAddress = res.result.address;
          positionInfo = {
            latitude: latitude1,
            longitude: longitude1,
          }
          isLocationAuthorize = true,
          activityAddress = activityAddress,
            isAutoPosition = false
          callback && callback(activityAddress)
        }
      });
    },
    fail: function (res) {
      console.log(res)
      wx.getSetting({
        success: function (res) {
          if (res.authSetting && !res.authSetting["scope.userLocation"]) {
            //未授权则打开授权设置界面
            callback && callback(false)
          } else {
            //授权则重新获取位置新（授权设置界面返回首页，首页授权二确弹窗未关闭
            if (activityAddress === '定位中') {
              wx.showModal({
                title: '提示',
                content: '请打开手机定位！',
                confirmText: '确定',
                success: function (res) {
                  if (res.confirm) {
                    getLocation(callback)
                  }
                },
                fail: function (err) {
                  console.log(err)
                }
              });
            }
          }
        }
      })
    }
  });
}
/**
* 2. 根据用户定位打开地图
*/
function openMap () {
  wx.getLocation({
    type: 'gcj02', //返回可以用于wx.openLocation的经纬度
    success: function (res) {
      console.log(res)
      var latitude = res.latitude
      var longitude = res.longitude
      wx.openLocation({
        latitude: latitude,
        longitude: longitude,
        scale: 28
      })
    }
  })
}
/**
* 2.1 选择位置
*/
function onChangeAddress(e, callback) {
  let that = this,
    isShowMap = true;
  wx.chooseLocation({
    success: function (res) {
      console.log(res.name);
      if (res.name && res.name != '') {
        positionInfo = {
          latitude: res.latitude,
          longitude: res.longitude,
        },
          activityAddress = res.address,
          isAutoPosition = false,
          isShowMap = false
        callback && callback(activityAddress)

      }
    },
    fail: function (err) {
      isShowMap = false
      console.log(err)
    }
  });
}

/**
 * 重新授权
 */
function reAuthorize() {
  isLocationAuthorize = false
}


module.exports = {
  init: init,
  onChangeAddress: onChangeAddress
}
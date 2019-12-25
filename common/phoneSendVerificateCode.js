const app = getApp();
const commonDataDao = require('./CommonDataDao.js');
const util = require('../utils/util.js');

// 通过电话号码获取用户信息
let GetUserInfoByPhone = (phoneNumber, callback) => {
  let that = this,
    url = 'api/AppUser/GetUserInfoByPhone',
    paramData = {
      param: {
        phone: phoneNumber
      }
    }

  commonDataDao.fetchGet(url, paramData, function (res) {
    callback && callback(res)
  })
}

// 通过电话号码获取用户所属小区
let GetPublishConf = (phoneNumber, callback) => {
  let that = this,
    url = 'api/WxNewActivity/GetPublishConf',
    paramData = {
      param: {
        phoneNumber: phoneNumber
      }
    }

  commonDataDao.fetchGet(url, paramData, function (res) {
    callback && callback(res)
  })
}

// 获取验证码
let SendCaptchaSMS = (phoneNumber, callback) => {
  let that = this,
    url = 'api/AppUser/SendCaptchaSMS',
    paramData = {
      param: {
        phoneNum: phoneNumber
      }
    }

  commonDataDao.fetchGet(url, paramData, function (res) {
    console.log(res);
    callback && callback(res)
    // that.MemberUserCaptchaWeChatLogin()
  })
}

// 通过验证码和手机号码进行注册
let MemberUserCaptchaWeChatLogin = (data, callback) => {
  let that = this,
    url = 'api/AppUser/MemberUserCaptchaLogin';

  commonDataDao.fetchGet(url, data, function (res) {
    callback && callback(res)
  })
}

module.exports = {
  getUserInfoByPhone: GetUserInfoByPhone,
  GetPublishConf: GetPublishConf,
  SendCaptchaSMS: SendCaptchaSMS,
  MemberUserCaptchaWeChatLogin: MemberUserCaptchaWeChatLogin
}
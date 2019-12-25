const app = getApp();
const commonDataDao = require('./CommonDataDao.js');
const util = require('../utils/util.js');
// const LOCAL_SERVER_UV = "https://edge.einwin.com:18765/api/imc/log/get";//测试环境地址(接口)
const LOCAL_SERVER_UV = "https://gw.einwin.com/api/imc/log/get";//正式环境地址(接口)

let callbackFun = null;

let trans = (userInfo) => {
  var userInfo = {
    "userId": userInfo.userDetailInfo.userId,
    "userName": userInfo.userBasicsInfo.username == null ? '' : userInfo.userBasicsInfo.username,
    "phone": userInfo.userBasicsInfo.cellPhone,
    "company": userInfo.userBasicsInfo.corpName == null ? '' : userInfo.userBasicsInfo.corpName,
    "employeeNo": userInfo.userOaInfo.employeeNo == null ? '' : userInfo.userOaInfo.employeeNo,
    "department": userInfo.userOaInfo.department == null ? '' : userInfo.userOaInfo.department,
    "orgCode": userInfo.userBasicsInfo.corpCode,
    "userChannels": userInfo.userBasicsInfo.userChannels,
    "corpCode": userInfo.userBasicsInfo.corpCode,
    "oaUserID": userInfo.userBasicsInfo.oaUserID,
  }
  return userInfo;
}


//解密手机号码并存储
let decodePhoneNumber = (compleleFun) => {
  var that = this;
  let params = {
    param: {
      encryptedData: app.globalData.encryptedData,
      iv: app.globalData.iv,
      sessionKey: wx.getStorageSync("sessionKey") || app.globalData.sessionKey
    }
  };
  console.log(params)
  let url = 'api/ActivitiesDistribution/GetWxDecrypt';
  commonDataDao.fetchGet(url, params, res => {
    console.log("电话号码： " + JSON.stringify(res))
    if (res.data.resultCode == "0"){
      // wx.showModal({
      //   title: '提示',
      //   content: '电话号码解析失败！请重新登录',
      // })
      // wx.showToast({
      //   title: '重新获取电话号码',
      //   icon: 'none',
      //   duration: 1500,
      // })
      //解密流程是这样：

      // 1. wx.login 获取code；

      // 2. 把code传给后台，请求微信接口拿session_key;

      // 3. wx.getUserInfo获取加密数据，加密数据传给后台，使用第二步拿到的session_key来解密。

      // 之前我们也遇到这问题了，按已上流程调整就再也没有出过无法解密的错误，

      // 一般来说解密出问题，是因为第三步拿的解密数据和第二步的session_key不对应导致；

      // 最近微信小程序的热点接口改动比较频繁，有些老逻辑就不太适用了
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          app.globalData.code = res.code;
          console.log(res.code);
          getWeChatUnitId(function () {
            wx.showModal({
              title: '提示',
              content: '服务器迷路了o(╯□╰)o \r\n请重试哦！',
            })
          })
        }
      });
    }
    else if (res.data.resultValue != null) {
      app.globalData.phoneNumber = res.data.resultValue
      wx.setStorageSync("phoneNumber", res.data.resultValue);
      console.log("phoneNumber " + app.globalData.phoneNumber);
      compleleFun && compleleFun(res);
    } else {
      wx.showToast({
        title: res.data.resultMsg,
      })
      return;
    }
  }, (res) => {
  });
}
let getWeChatUnitId = function (callback){//获取openid
  let that = this;
  wx.showToast({ //显示消息提示框  此处是提升用户体验的作用
    title: '数据加载中',
    icon: 'loading',
  });
  let params = {
    param: {
      "code": app.globalData.code,
      "wxsmallproName":"WxNewHD"
    }
  };
  console.log(JSON.stringify(params));
  let url = 'api/AppUser/GetWeChatUnitId';
  commonDataDao.fetchGet(url, params, res => {
    let resultValue = res.data.resultValue,
        openid = resultValue.openid,
       sessionKey = resultValue.session_key;
        // xm0kKyyrAQhy07HWM5BweA==
    if (openid==null||sessionKey==null){
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          app.globalData.code = res.code;
          getWeChatUnitId();
          console.log(res.code);
        }
      });
      return;
      // wx.hideLoading();
    }
    app.globalData.openid = openid;
    app.globalData.sessionKey = sessionKey;

    wx.setStorageSync("openid", openid);
    wx.setStorageSync("sessionKey", sessionKey);
    console.log('getWeChatUnitId_openid:' + openid + ',getWeChatUnitId_sessionKey:' + sessionKey);

    callback && callback()
  },res=>{
      wx.hideLoading();
  });
}
let getTokenUV = (callBack) => {//获取uv的token
  var that = this
  var token = app.globalData.token;
  wx.request({
    method: 'POST',
    url: 'https://gw.einwin.com/accessToken?username=19600000001&password=0l3Ny1',  //生产环境
    // url: 'https://edge.einwin.com:18765/accessToken?username=15818548935&password=a121200',  //测试环境
    success: function (res) {
      console.log(res)
      if (res.data.msg == 'OK' && res.data.code == '0') {
        wx.setStorageSync("uvToken", res.data.token)
        callBack && callBack(res)
      }
    },
    fail: function (res) {
      console.log('fail ' + res)
    }
  })
}
let getEningUV = (currPageURL) => {//获取用户访问日志信息
  var token = wx.getStorageSync("uvToken");
  var openid = wx.getStorageSync('openid');
  var userInfo = wx.getStorageSync('userInfo');
  var phoneNumber = wx.getStorageSync('phoneNumber');
  var facility = app.globalData.facility;
  var phoneAppVersion = app.globalData.phoneAppVersion;
  if (token != '') {
    let EningUVParams = [
      {
        "facility": facility,
        "appVersion": phoneAppVersion,
        "time": util.formatDateTime(new Date()).toString(),
        "userName": userInfo.nickName,
        "mark": null,
        "community": null,
        "msg": currPageURL,
        "equipmentCoding": null,
        "imId": null,
        "userId": openid,
        "appCode": "YYHD",
        "phone": phoneNumber ? phoneNumber : ''
      }
    ]
    console.log(EningUVParams);
    let options = {
      url: LOCAL_SERVER_UV,
      method: 'post', //请求方式
      data: EningUVParams,
      header: {
        'content-type': 'application/json',
        token: token
      },
      complete(res) {  //请求结束后隐藏 loading 提示框
        console.log(res);
      },
      success: res => {
        console.log(res);
      },
      fail: err => {
        console.log(err);
      }
    }

    wx.request(options);
  } else {
    // token == null
    getTokenUV(function (res) {
      getEningUV(currPageURL);
    });
  }
}

let judgeSessionKey = (callback) => {
  var _this = this;
  wx.checkSession({
    success() {
      // session_key 未过期，并且在本生命周期一直有效
      console.log('-----------sessionKey有效-----------')
      callback && callback()
    },
    fail() {
      // session_key 已经失效，需要重新执行登录流程
      console.log('-----------sessionKey失效-----------')
      app.globalData.code = null;
      getWeChatUnitId(callback)
    }
  })
}


//计算剩余时间 
let checkDate = (endTime, serviceTime) => {
  var _this = this;
  //日期格式化
  // time.formatTime()
  var now_date = new Date();
  if (endTime.length < 19) {
    // 已经精确到时分秒不需要再处理
    endTime = endTime.split(' ')[0] + 'T23:59:59';
  } else {
    let endTimeArr = endTime.split(' ');
    endTime = endTimeArr[0] + 'T' + endTimeArr[1];
  }
  var end_date = new Date(endTime);
  if (util.isPhone()) {
    end_date = new Date(end_date.getTime() + end_date.getTimezoneOffset() * 60000);
  }
  
  var timestamp = serviceTime;
  var differenceTime = now_date.getTime() - timestamp;
  
  //转成毫秒数，两个日期相减
  var days = end_date.getTime() - now_date.getTime() + differenceTime;
  wx.showModal({
    title: '毫秒',
    content: days,
  })
  if (days <= 0) {
    return {
      day: 0,
      hour: 0,
      minutes: 0
    }
  }

  var second = days / 1000;
  var day = Math.floor(second / 86400)
  var hour = Math.floor(second % 86400 / 3600)
  var minutes = Math.floor(second % 86400 % 3600 / 60)
  return {
    day: checkTimeParse(day),
    hour: checkTimeParse(hour),
    minutes: checkTimeParse(minutes)
  }
}
/**
  * 校验日期格式
  */
let checkTimeParse=function (currTime) {
  return currTime >= 10 ? currTime : '0' + '' + currTime;
}
/*
 * ActivityId	活动id	string	@mock=xxxx
 * OptionId		string	@mock=投票选项id
 * WxHeaderImg		string	@mock=微信头像url
 * WxName		string	@mock=微信名称
 * WxOpenId		string	@mock=当前登录人微信OpenId
 * WxPhone
*/
let addVotes = (activityId, optionId, wxHeaderImg, wxName, wxOpenId, wxPhone, callback) => {
  var _this = this;
  const url = 'api/WxNewActivity/DoVote'
  let params = {
    ActivityId: activityId,
    OptionId: optionId,
    WxHeaderImg: wxHeaderImg,
    WxName: wxName,
    WxOpenId: wxOpenId,
    WxPhone: wxPhone
  }
  console.log(JSON.stringify(params))
  commonDataDao.fetchPost(url, params, function (res) {
    callback && callback(res.data)
  })
}


// 获取投票活动详情信息以及倒计时时间
let getVoteActivityExplain = function (id, openid, callBack) {
  var _this = this;
  const url = 'api/WxNewActivity/VoteActivityExplain'
  let params = {
    param: {
      Id: id,
      WxOpenId: openid
    }
  }
  commonDataDao.fetchGet(url, params, function (res) {
    callBack && callBack(res)
  })

}
// 投票选项列表 sort 1：按投票数排序；2：按投票序号排序
let getVoteActivityItemList = function (id, pageNo, pageSize, openId, sort, callBack) {
  var _this = this;
  const url = 'api/WxNewActivity/VoteActivityItemList'
  let params = {
    param: {
      Id: id,
      PageNo: pageNo,
      PageSize: pageSize,
      WxOpenId: openId,
      sort: sort
    }
  }
  commonDataDao.fetchGet(url, params, function (res) {
    console.log(res)
    callBack && callBack(res)
  })
}


/**
 * 用户绑定圈子
 */
let AddWxUserActivityCommunityRelation = (par) => {
  let that = this,
    url = '';
  url = 'api/WxNewActivity/AddWxUserActivityCommunityRelation';
  let paramsData = {
    param: par
  };
  commonDataDao.fetchGet(url, paramsData, res => {
    let resultCode = res.data.resultCode;

    if (resultCode === '1') {
      console.log(res.data.resultMsg);
    } else {
      console.log(res.data.resultMsg);
    }
  });
}

// 查询订单详情
// OrderDetailForrSolitaire
let OrderDetailForrSolitaire = (orderId, callback) => {
  let that = this,
    url = 'api/AppOrder/OrderDetailForrSolitaire',
    paramData = {
      param: {
        orderId: orderId
      }
    }
  commonDataDao.fetchGet(url, paramData, function (res) {
    callback && callback(res);
  })
}

// 通过openid判断当前登录人是否和发布活动的人是同一个，以便判断是否有删除活动的权限
let judegIsSelf = (openId) => {
  var openid = wx.getStorageSync('openid');
  if (openid && openId === openid) {
    console.log('本人查看活动')
    return true;
  }
  return false;
}

// 用户删除活动 
let deleteActivityByWxUser = (activityId, openId, callBack) => {
  var _this = this;
  const url = 'api/WxNewActivity/DeleteActivityByWxUser'
  let params = {
    param: {
      activityId: activityId,
      openId: openId
    }
  }
  commonDataDao.fetchGet(url, params, function (res) {
    callBack && callBack(res.data)
  })
}
//  api/AppOrderReturn/NewApplyRefund
let NewApplyRefund = (paramData, callBack) => {
  const url = 'api/AppOrderReturn/NewApplyRefund';
  commonDataDao.fetchGet(url, paramData, function (res) {
    callBack && callBack(res.data)
  })
}
//  保证缓存中有电话号码 
let authPublish = (callback) => {
  let that = this;
  let url = commonDataDao.LOCAL_SERVER + 'api/WxNewActivity/AuthPublish';
  let paramData = {
    phoneNumber: wx.getStorageSync("phoneNumber") || app.globalData.phoneNumber
  };
  wx.request({
    url: url,
    data: paramData,
    success: function (res) {
      callback && callback(res);
    }
  })
}

let getCanvasSize = (width, height, callback) => {
  var that = this;
  var ratio = 2.5;
  var canvasWidth = width //图片原始长宽
  var canvasHeight = height
  while (canvasWidth > 800 || canvasHeight > 800) {// 保证宽高在400以内
    canvasWidth = Math.trunc(width / ratio)
    canvasHeight = Math.trunc(height / ratio)
    ratio++;
  }
  callback && callback(canvasWidth, canvasHeight);
}
let getCanvasImg = (tempFilePaths, canvasWidth, canvasHeight, callback) => {
  var that = this;
  const ctx = wx.createCanvasContext('attendCanvasId');
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);  
  ctx.drawImage(tempFilePaths[0], 0, 0, canvasWidth, canvasHeight);
  ctx.draw(false, function () {
    wx.canvasToTempFilePath({
      canvasId: 'attendCanvasId',
      success: function success(res) {
        callback && callback(res)
      }, fail: function (e) {
        wx.showToast({
          title: '图片上传失败，请重新上传！',
          icon: 'none'
        })
      }
    });
  });
}

let transImgUrl = function (url) {
  // url = 'https://int.ening.cn/Uploads/AppPhotos/4e16aaf5-88c5-41f7-baa0-5b8989a41182.jpg';
  url = commonDataDao.LOCAL_SERVER + url.substring(url.indexOf('cn/') + 3)
  return url; 
}

let handleWords = function (words) {
  words = words.split('');
  for (let i = 0; i < words.length; i++) {
    if (words[i] === " ") {
      words[i] = "&ensp;"
    }
  }
  return words.join('');
}

module.exports = {
  decodePhoneNumber: decodePhoneNumber,
  getWeChatUnitId: getWeChatUnitId,
  getEningUV: getEningUV,
  checkDate: checkDate,
  addVotes: addVotes,
  getVoteActivityExplain: getVoteActivityExplain,
  getVoteActivityItemList: getVoteActivityItemList,
  judegIsSelf: judegIsSelf,
  deleteActivityByWxUser: deleteActivityByWxUser,
  judgeSessionKey: judgeSessionKey,
  transImgUrl: transImgUrl,
  getCanvasImg: getCanvasImg,
  getCanvasSize: getCanvasSize,
  handleWords: handleWords,
  OrderDetailForrSolitaire: OrderDetailForrSolitaire,
  AddWxUserActivityCommunityRelation: AddWxUserActivityCommunityRelation,
  NewApplyRefund: NewApplyRefund,
  authPublish: authPublish
}
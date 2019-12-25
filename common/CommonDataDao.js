// const LOCAL_SERVER = "https://itssy.einwin.com:8443/";//测试环境地址(接口)
// const LOCAL_SERVER = "http://192.168.5.38:3397/";//测试环境地址(接口)
const LOCAL_SERVER = "https://int.ening.cn/";//正式环境地址(接口)
// const LOCAL_SERVER = "http://192.168.5.46:1314/";//正式环境地址(接口)
const base64Util = require('../utils/base64Util.js');
const Base64 = new base64Util.Base64();

let fetch = (url, method, params, successFun, completeFun)=>{
  url = LOCAL_SERVER+url;
  // console.log(params);

  if (method === 'get'){
    url = url+'?appParam='+encodeURIComponent(Base64.encode(JSON.stringify(params)));
  }
  console.log(url);

  let options={
    url: url,
    method: method, //请求方式
    data: {},
    header: {
      'content-type': 'application/json'
    },
    complete(res) {  //请求结束后隐藏 loading 提示框
      completeFun && completeFun(res);
    },
    success: res => {
      successFun(res);
    },
    fail:err=>{
      console.log(err);
    }
  }

  if(method==='post'){
    options.data=params;
  }

  wx.request(options);
}

let fetchGet = (url, params, successFun, completeFun)=>{
  fetch(url,'get', params, successFun, completeFun);
}
let fetchPost = (url, params, successFun, completeFun) => {
  fetch(url, 'post', params, successFun, completeFun);
}

let encodeEmoji = (str) => {
  return Base64.encode(str)
}
let decodeEmoji = (str) => {
  return Base64.decode(str);
}


module.exports = {
  fetchGet: fetchGet,
  fetchPost: fetchPost,
  LOCAL_SERVER: LOCAL_SERVER,
  encodeEmoji: encodeEmoji,
  decodeEmoji: decodeEmoji,
  Base64: Base64
}

//app.js
App({
  onLaunch: function () {
    let phone = wx.getSystemInfoSync().model
    this.globalData.isIphoneX = phone === 'iPhone X' || phone === 'iPhoneX' || phone === 'iphonrx'
    //获取是否需要显示小飘窗
		let showAddToMineApp = wx.getStorageSync('showAddToMineApp');
		// console.log(`showAddToMineApp: ${Object.prototype.toString.call(showAddToMineApp)}`);
		if (Object.prototype.toString.call(showAddToMineApp) === "[object String]"){
			wx.setStorageSync('showAddToMineApp', true)
		}

    //版本强制更新
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate((res) => {
        console.log(`有新版本更新吗？${res.hasUpdate}`);
        //请求完新版本信息的回调
        if (res.hasUpdate) {
          updateManager.onUpdateReady(() => {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启小程序?',
              confirmColor: '#ff5c1e',
              success: (res) => {
                if (res.confirm) {
                  //新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate();
                }
              }
            })
          })

          updateManager.onUpdateFailed(() => {
            //新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~~',
              content: '新版本已经上线啦~请您删除当前小程序，重新搜索打开',
              confirmColor: '#ff5c1e'
            })
          })
        }
      })
    } else {
      //如果希望用户在最新版本的客户端上体验您的小程序，可以这样提示
      wx.showModal({
        title: '提示',
        content: '当前的微信版本过低，无法使用更新功能，请升级到最新微信版本后重试',
        confirmColor: '#ff5c1e',
      })
    }
  },
  globalData: {
    userInfo: null,
    isIphoneX: false
  }
})
// pages/drawPoster/drawPoster.js
const drawD = require('../../../../utils/canvasDraw.js'); 
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareActivityInfo: { 
      "ActivityContent": "炎陵黄桃，桃醉天下！来自湖南省炎陵县海拔300-1200米山区的炎陵黄桃，是生态营养安全的绿色食品水果，为国家地理标志商标保护产品。炎陵黄桃品质优异，以靓、脆、香、甜享誉市场，享有“天上仙桃，炎陵黄桃”的美誉。桃形周正、着色均匀、果面亮泽、甜度适中、酥脆可口、香气浓郁实乃居家自食、中秋送礼之佳选！",
      "ActivityImgUrl": "../../../../resources/images/1.jpg",
      "ActivityIssueTime": "2019-08-07 11:37:18",
      "ActivityName": "炎陵黄桃5斤装",
      "CommunityName": "这是一个地址",
      "name": "orangleLi",
      "logo": "../../../../resources/images/34326830.jpg",
      "qrCode": "../../../../resources/images/gh_33446d7f7a26_430.jpg"
    },
    width: wx.getSystemInfoSync().windowWidth * 2, // canvas 大小
    height: wx.getSystemInfoSync().windowHeight * 2,
    imageWidth: 0, // 活动配图 大小
    imageHeight: 0,
    pixelRatio: wx.getSystemInfoSync().pixelRatio,
    endImg: null,
    isFinished: false,
    bgTrue: false,
    toAuthorize: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCanvasImage();
    var pages = getCurrentPages() //获取加载的页面

    var currentPage = pages[pages.length - 1] //获取当前页面的对象

    var url = currentPage.route //当前页面url
    console.log(url)
  },

  getCanvasImage: function () {
    wx.showLoading({
      title: '加载中...',
    })
    let that = this;
    let data = that.data.shareActivityInfo;
    if (!data) return;

    let draw = new drawD.canvasDraw('shareImg', that);
    draw.getImagesInfo([data.logo, data.ActivityImgUrl, data.qrCode]).then((res) => {
      // data.logo = res[0].path;
      // data.ActivityImgUrl = res[1].path;
      // data.qrCode = res[2].path;
      that.setData({
        imageWidth: res[1].width,
        imageHeight: res[1].height,
        shareActivityInfo: data
      });
      that.drawShareImage(draw);
    }).catch((err) => {
      console.log(err);
    })

  },
  drawShareImage(draw) {
    let pixelRatio = this.data.pixelRatio;
    let that = this;
    wx.showLoading({
      title: '绘制中...',
    });
    let data = that.data.shareActivityInfo;
    if (!data) return;
    let logo = data.logo;
    let WxName = data.name || '';
    let ActivityIssueTime = data.ActivityIssueTime || data.CreatedOn;
    let CommunityName = data.CommunityName;
    let ActivityName = data.ActivityName;
    let ActivityContent = data.ActivityContent;
    let ActivityImg = data.ActivityImgUrl;

    let drawHeight = (650 / that.data.imageWidth) * that.data.imageHeight;

    draw
      .drawCricleImg(50, 50, 35, logo)
      .drawText(WxName, 134, 56, 24, '#333333')
      .drawText(ActivityIssueTime + ' ' + CommunityName, 134, 90, 20, '#aaaaaa')
      .drawMultiLineText(ActivityName, 50, 160, 650, 42, 0, '#333333')
      .drawMultiLineText(ActivityContent.replace(/&ensp;/g, ' '), 50, draw.nowHeight + 20, 650, 26, 3, '#666666')
      .drawFilletImg(ActivityImg, 0, 0, that.data.imageWidth + 'rpx', that.data.imageHeight + 'rpx', 50, draw.nowHeight + 30, 650, drawHeight, 10)
      .drawText('长按扫码', 650 - 168 - 20 + 50, draw.nowHeight + 74, 24, '#333333', 'right')
      .drawText('参加更多有趣活动', 650 - 168 - 20 + 50, draw.nowHeight, 24, '#333333', 'right')
      .drawImage(data.qrCode, 650 - 168 + 50, draw.nowHeight - 140, 168, 168)
      .drawFinally(function (ctx, nowHeight) {
        let canvasHeight = draw.getPx(nowHeight + 30);
        that.setData({
          height: canvasHeight
        })
        draw.canvasToPosterImg('shareImg', 750, canvasHeight, function(res){
          that.setData({
            endImg: res.tempFilePath,
            isFinished: true
          })
        });
      });
  },
  /**
   * 保存图片到相册
   */
  saveImg() {
    let that = this;
    wx.showLoading({
      title: '加载中...',
    });
    if (this.data.bgTrue) {
      wx.hideLoading();
      wx.saveImageToPhotosAlbum({
        filePath: that.data.endImg,
        success: function (re) {
          wx.showToast({
            title: '保存成功',
          });
          that.closeShareModal();
        },
        fail: function (err) {
          console.log(err)
          if (err.errMsg == "saveImageToPhotosAlbum:fail auth deny" || err.errMsg === "saveImageToPhotosAlbum:fail:auth denied") {
            console.log("打开设置窗口");
            that.setData({
              toAuthorize: true
            })
          }
        }
      })
    } else {
      that.changeBgToWhite();
    }
  },
  toAuthorizeClick() {
    this.setData({
      toAuthorize: false
    })
  },
  changeBgToWhite() {
    let that = this;
    let destHeight = 750 / that.data.width * that.data.height;
    const bgCtx = wx.createCanvasContext('bgImg', that);
    bgCtx.fillStyle = "#FFFFFF";
    bgCtx.fillRect(0, 0, that.data.width, that.data.height);
    bgCtx.drawImage(that.data.endImg, 0, 0, that.data.width, that.data.height);
    bgCtx.draw(true, function () {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: that.data.width,
        height: that.data.height,
        destWidth: 750,
        destHeight: destHeight,
        canvasId: 'bgImg',
        success(result) {
          // 已经是白色背景色了
          that.setData({
            bgTrue: true,
            endImg: result.tempFilePath,
          })
          wx.hideLoading();
          wx.saveImageToPhotosAlbum({
            filePath: result.tempFilePath,
            success: function (re) {
              wx.showToast({
                title: '保存成功',
              })
              that.closeShareModal();
            },
            fail: function (err) {
              console.log(err)
              if (err.errMsg == "saveImageToPhotosAlbum:fail auth deny" || err.errMsg === "saveImageToPhotosAlbum:fail:auth denied") {
                console.log("打开设置窗口");
                that.setData({
                  toAuthorize: true
                })
              }
            }
          })
        },
        fail: function (err) {
          wx.hideLoading();
          console.log(err);
        }
      }, that)
    }, that);
  },
  closeShareModal() {
    this.triggerEvent('closeShareModal', false)
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
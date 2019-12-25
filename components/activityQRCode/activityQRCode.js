// components/activityQRCode/activityQRCode.js
const app = getApp();
const commonDataDao = require('../../common/CommonDataDao.js');
const getUserInfoCommon = require('../../common/getUserInfoCommon.js');
const canvasDraw = require('./canvasDraw.js'); 
Component({
  /**
   * 组件的属性列表
   */
  properties: { 
    WxNewActicityId: {
      type: String,
      value: ''
    },
    shareActivityInfo: {
      type: Object,
      value: null
    },
    showQRShareModal: {
      type: Boolean,
      value: false
    },
    page: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    WxNewActicityQRCode: '',
    pageParams: null,
    width: wx.getSystemInfoSync().windowWidth * wx.getSystemInfoSync().pixelRatio, // canvas 大小
    height: wx.getSystemInfoSync().windowHeight * wx.getSystemInfoSync().pixelRatio,
    imageWidth: 0, // 活动配图 大小
    imageHeight: 0,
    pixelRatio: wx.getSystemInfoSync().pixelRatio,
    QRCodeHeight: 168 / wx.getSystemInfoSync().pixelRatio,
    endImg: null,
    showQRCodeShare: true,
    isFinished: false,
    _36Bottom: 0,
    _45Bottom: 0,
    bgTrue: false,
    openSetting: false // 保存图片授权
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getCanvasImage: function () {
      wx.showLoading({
        title: '加载中...',
      })

      if (this.data.endImg) {
        this.setData({
          endImg: ''
        })
        this.getWxAppletsUrl();
        wx.hideLoading();
        return;
      }
      let that = this;
      let data = that.data.shareActivityInfo;
      if (!data) return;
      let ActivityImgUrl = data.ActivityImgUrl || data.Imgs;
      let ActivityImg = '';
      if (ActivityImgUrl && ActivityImgUrl.length > 0) {
        ActivityImg = ActivityImgUrl[0];
      }
      data.ActivityImg = ActivityImg;
      that.setData({
        shareActivityInfo: data
      })
      wx.downloadFile({
        url: data.WxImage || data.WxHeaderImg,
        success: function (res) {
          console.log(res)
          data.WxImage = res.tempFilePath;
          that.setData({
            shareActivityInfo: data
          });
          if (ActivityImg !== '') {
            wx.getImageInfo({
              src: ActivityImg,
              success: function (res) {
                data.ActivityImg = res.path;
                that.setData({
                  imageWidth: res.width,
                  imageHeight: res.height,
                  shareActivityInfo: data
                });
                that.getWxAppletsUrl();
              }
            })
          } else {
            that.getWxAppletsUrl();
          }
        }
      })

    },
    transPx(size) {
      return parseInt(size / (750 / this.data.width));
    },
    getWxAppletsUrl: function (ctx, canvasHeight) {//通过后台获取二维码
      let that = this;
      if (that.data.WxNewActicityQRCode.length > 0) {
        that.drawShareImage(that.data.WxNewActicityQRCode);
      } else {
        let pageParams = that.data.pageParams;
        let url = 'api/WxNewActivity/GetWxAppletsUrl';
        let WxNewActicityId = that.data.WxNewActicityId;
        let page = that.data.page;
        let paramsData = {
          param: {
            appletsType: 'WxNewHD',
            scene: WxNewActicityId.toString().replace(/\-/g, ''),
            page: page,
            width: 168
          }
        };
        commonDataDao.fetchGet(url, paramsData, res => {
          let resultCode = res.data.resultCode;

          if (resultCode === '1') {
            let resultValue = res.data.resultValue;
            let WxNewActicityQRCode = 'data:image/PNG;base64,' + resultValue;

            canvasDraw.drawCode(WxNewActicityQRCode).then((filePath) => {
              that.setData({
                WxNewActicityQRCode: filePath
              });
              that.drawShareImage(filePath);
            });
          } else {
            wx.showModal({
              title: '提示',
              content: res.data.resultMsg,
            });
          }
        }, res => {
        });
      }
      
    },
    drawShareImage(filePath) {
      let pixelRatio = wx.getSystemInfoSync().pixelRatio;
      let that = this;
      wx.showLoading({
        title: '绘制中...',
      });
      let data = that.data.shareActivityInfo;
      if (!data) return;
      that.setData({
        shareActivityInfo: data
      })
      // .split('.')[0].replace(/T/g, ' ')
      let WxImage = data.WxImage || data.WxHeaderImg;
      let WxName = data.WxName || '';
      let ActivityIssueTime = data.ActivityIssueTime || data.CreatedOn;
      let CommunityName = data.CommunityName;
      let ActivityName = data.ActivityName;
      let ActivityContent = data.ActivityContent;
      let ActivityImg = data.ActivityImg;
      ActivityContent = ActivityContent.replace(/&ensp;/g, '')
      ActivityContent = ActivityContent.replace(/\s*/g, "");
      const ctx = wx.createCanvasContext('shareImg', that);

      let _50Px = that.transPx(50);
      let _100Px = _50Px * 2;

      // 绘制头像
      ctx.save()//保存当前的绘图上下文。
      ctx.beginPath()//开始创建一个路径
      ctx.arc(that.transPx(85), that.transPx(85), that.transPx(35), 0, 2 * Math.PI, false)//画一个圆形裁剪区域
      ctx.clip()//裁剪
      ctx.drawImage(WxImage, _50Px, _50Px, that.transPx(70), that.transPx(70))//绘制图片
      ctx.restore()//恢复之前保存的绘图上下文

      // 发布者微信昵称
      ctx.setFontSize(that.transPx(24))
      ctx.setFillStyle('#333333')
      ctx.fillText(WxName, that.transPx(134), that.transPx(80))

      // 发布时间 小区
      ctx.setFontSize(that.transPx(20))
      ctx.setFillStyle('#aaaaaa');
      let timeName = ActivityIssueTime + ' ' + CommunityName;
      ctx.fillText(timeName, that.transPx(134), that.transPx(110))

      let drawCanvasWidth = that.data.width - _100Px;

      // 活动名称
      ctx.setFontSize(that.transPx(42));
      ctx.setFillStyle('#333333')
      let nameHeight = canvasDraw.drawText(ctx, ActivityName, _50Px, that.transPx(160) + that.transPx(20), drawCanvasWidth, that.transPx(42), 2);

      // 活动内容
      ctx.setFontSize(that.transPx(26))
      ctx.setFillStyle('#666666');
      let contentHeight = canvasDraw.drawText(ctx, ActivityContent.replace(/&ensp;/g, ' '), _50Px, nameHeight + that.transPx(10), drawCanvasWidth - 10, that.transPx(26), 3);


      let drawHeight = 0;
      if (ActivityImg !== '') {
        let imageWidth = that.data.imageWidth;
        let imageHeight = that.data.imageHeight;
        let x = 0, y = 0;
        let maxHeight = 400;
        if (imageHeight >= maxHeight) {
          // 大于650时，按照宽度取一个正方形
          y = (imageHeight - maxHeight) / 2;
          imageHeight = maxHeight > imageHeight ? imageHeight : maxHeight;
          drawHeight = that.transPx(500);

        } else {
          let pix = drawCanvasWidth / imageWidth;
          drawHeight = pix * imageHeight;
        }
        ctx.drawImage(ActivityImg, x, y, imageWidth, imageHeight, _50Px, contentHeight + that.transPx(30), drawCanvasWidth, drawHeight);
      }

      let canvasHeight = contentHeight + that.transPx(30) + drawHeight + that.transPx(40);

      let _168Px = that.transPx(168);
      ctx.drawImage(filePath, that.data.width - _168Px - that.transPx(50), canvasHeight, _168Px, _168Px);


      ctx.setFontSize(that.transPx(24))
      ctx.setFillStyle('#333333')
      ctx.fillText('长按扫码', that.transPx(400), canvasHeight + that.transPx(74))

      ctx.setFontSize(that.transPx(24))
      ctx.setFillStyle('#333333')
      ctx.fillText('参加更多有趣活动', that.transPx(305), canvasHeight + that.transPx(115))

      canvasHeight = canvasHeight + _168Px + that.transPx(30);
      that.setData({
        height: canvasHeight
      })
      that.drawEndImg(ctx, canvasHeight);
    },
    drawEndImg(ctx, canvasHeight) {
      let that = this;
      ctx.draw(false, function () {
        wx.showLoading({
          title: '正在生成图片...',
        })
        setTimeout(() => {
          wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: that.data.width,
            height: that.data.height,
            destWidth: that.data.width,
            destHeight: that.data.height,
            canvasId: 'shareImg',
            success(res) {
              wx.hideLoading();
              that.setData({
                endImg: res.tempFilePath,
                isFinished: true
              });
            },
            fail: function (err) {
              console.log(err);
            }
          }, that)
        }, 500)
      }, that);
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
          fail: function (res) {
            if (res.errMsg === "saveImageToPhotosAlbum:fail auth deny" || res.errMsg === "saveImageToPhotosAlbum:fail:auth denied") {      
              that.setData({
                openSetting: true
              })
            }
          }
        })
      } else {
        that.changeBgToWhite();
      }
    },
    changeBgToWhite() {
      let that = this;
      const bgCtx = wx.createCanvasContext('bgImg', that);
      bgCtx.fillStyle = "#FFFFFF";
      bgCtx.fillRect(0, 0, that.data.width, that.data.height);
      bgCtx.drawImage(that.data.endImg, 0, 0, that.data.width, that.data.height);
      bgCtx.draw(true, function () {
        let destHeight = 750 / that.data.width * that.data.height;
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
              fail: function (res) {
                if (res.errMsg === "saveImageToPhotosAlbum:fail auth deny" || res.errMsg === "saveImageToPhotosAlbum:fail:auth denied") {
                  that.setData({
                    openSetting: true
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
    cancelSet() {
      this.setData({
        openSetting: false
      })
    }
  }
})

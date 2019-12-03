// pages/pictureCompression/pictureCompression.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagePath: '',
    quality: 0.2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
  * 选项添加图片事件
  */
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: result => {
        wx.getImageInfo({
          src: result.tempFilePaths[0],
          success: function (res) {
            that.setData({
              cWidth: res.width,
              cHeight: res.height
            })
            that.getCanvasImg(result.tempFilePaths, res.width, res.height, that.data.quality, function (res) {
              that.setData({
                imagePath: res.tempFilePath
              });
            });
          }
        })

      }
    })

  },

  /**
   * 质量压缩
   */
  getCanvasImg(tempFilePaths, canvasWidth, canvasHeight, quality, callback) {
    var that = this; 
    const ctx = wx.createCanvasContext('attendCanvasId');
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(tempFilePaths[0], 0, 0, canvasWidth, canvasHeight);
    ctx.draw(false, function () {
      wx.canvasToTempFilePath({
        canvasId: 'attendCanvasId',
        fileType: 'jpg',
        quality: quality,
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
  },

  /**
   * 图片保存到相册
   */
  save(e) {
    let that = this;
    wx.saveImageToPhotosAlbum({
      filePath: that.data.imagePath,
      success: function (res) {
        console.log('图片已保存');
      },
      fail: function (res) {
        console.log('保存失败');
      }
    })
  },
})
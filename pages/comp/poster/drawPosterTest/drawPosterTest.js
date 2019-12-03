// pages/drawPosterTest.js
const drawD = require('../../../../utils/canvasDraw.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: wx.getSystemInfoSync().windowWidth * 2,
    height: wx.getSystemInfoSync().windowHeight * 2,
    imageWidth: 0,
    imageHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let draw = new drawD.canvasDraw('poster', that);
    let logo = '../../../../resources/images/34326830.jpg';
    let themeImg = '../../../../resources/images/1.jpg';
    draw.getImagesInfo([themeImg, logo]).then((res) => {
      // themeImg = res[0].path;
      // logo = res[1].path;
      that.setData({
        imageWidth: res[0].width,
        imageHeight: res[0].height
      });
      that.drawShareImage(draw, themeImg, logo);
    })
  },
  drawShareImage(draw, themeImg, logo){
    let that = this; let drawHeight = 0;
    let x = 0, y = 0;
    let imageWidth = that.data.imageWidth;
    let imageHeight = that.data.imageHeight;

    drawHeight = (650 / imageWidth) * imageHeight;

    let part = '你身体里的每一个原子都来自一颗爆炸了的恒星。形成你左手的原子可能和形成你右手的来自不同的恒星。这是我所知的关于物理的最有诗意的事情：你们都是星尘。'

    draw
      .drawFilletFillImg(themeImg, 50, 50, 650, drawHeight, 10)
      .drawMultiLineText(part, 50, draw.nowHeight + 30, 650, 30, 0, '#000')
      .drawMultiLineText(part, 50, draw.nowHeight + 40, 650, 30, 1, '#000')
      .drawText('——《这里是出处》', 650 + 50, draw.nowHeight + 60, 30, '#000', 'right')
      .drawText('2019.09.06', 650 + 50, draw.nowHeight + 30, 32, 'rgba(34,34,34,.64)', 'right')
      .drawCricleImg(650, draw.nowHeight + 10, 25, logo)
      .drawFinally(function (ctx, nowHeight) {
        let canvasHeight = draw.getPx(nowHeight + 30);
        that.setData({
          height: canvasHeight
        })
        draw.canvasToPosterImg('poster', 750, canvasHeight, function(res) {
          wx.hideLoading();
          that.setData({
            endImg: res.tempFilePath,
            isFinished: true
          })
        });
      });
  },
})
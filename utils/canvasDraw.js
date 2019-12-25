function canvasDraw(id, obj) {
  this.ctx = wx.createCanvasContext(id, obj);
  this.nowHeight;
  this.winWidth = wx.getSystemInfoSync().windowWidth * 2;
}

canvasDraw.prototype = {
  getImagesInfo: function (imgArr) {
    let that = this;
    let promiseArr = [];
    imgArr.forEach((item) => {
      promiseArr.push(that.imagesInfo(item));
    })
    return Promise.all(promiseArr);
  },
  imagesInfo: function (src) {
    return new Promise((resolve, reject) => {
      wx.getImageInfo({
        src: src,
        success: function (res) {
          resolve(res);
        },
        fail(err) {
          reject(err);
        },
      })
    })
  },
  getDownloadFiles: function (imgArr) {
    let that = this;
    let promiseArr = [];
    imgArr.forEach((item) => {
      promiseArr.push(that.downloadFiles(item));
    })
    return Promise.all(promiseArr);
  },
  downloadFiles: function (url) {
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url: url,
        success: function (res) {
          resolve(res);
        },
        fail(err) {
          reject(err);
        },
      })
    })
  },

  getPx(rpx) {
    return rpx / (750 / this.winWidth);
  },
  getRpx(px) {
    return px * (750 / this.winWidth);
  },
  /**
   * 绘制圆形图片
   * x rpx
   * y rpx 圆所在正方形起点坐标
   * r rpx 圆的半径
   */
  drawCricleImg(x, y, r, logo) {
    x = this.getPx(x);
    y = this.getPx(y);
    r = this.getPx(r);
    let centerX = (x + r).toFixed(2);
    let centerY = (y + r).toFixed(2);

    let w = r * 2;

    this.ctx.save()//保存当前的绘图上下文。
    this.ctx.beginPath()//开始创建一个路径
    this.ctx.arc(centerX, centerY, r, 0, 2 * Math.PI, false)//画一个圆形裁剪区域
    this.ctx.clip()//裁剪
    this.ctx.drawImage(logo, x, y, w, w)//绘制图片
    this.ctx.restore()//恢复之前保存的绘图上下文
    this.nowHeight = this.getRpx(y + w);
    return this;
  },
  judgeRpxOrPx(num) {
    if ((num + '').indexOf('rpx') === -1) {
      return this.getPx(parseInt(num));
    } else {
      return parseInt(num);
    }
  },
  /**
   * 绘制圆角图片
   * img, 
   * sx, rpx
   * sy, rpx
   * swidth, rpx || px
   * sheight, rpx || px
   * x, rpx
   * y, rpx
   * width, rpx || px
   * height  rpx || px
   * 同于drawImage的参数
   * r 圆角半径
   * bgColor canvas背景颜色
   */
  drawFilletImg(img, sx, sy, swidth, sheight, x, y, width, height, r, bgColor = '#fff') {
    sx = this.getPx(sx);
    sx = this.getPx(sx);
    swidth = this.judgeRpxOrPx(swidth);
    sheight = this.judgeRpxOrPx(sheight);
    x = this.getPx(x);
    y = this.getPx(y);
    width = this.judgeRpxOrPx(width);
    height = this.judgeRpxOrPx(height);
    r = this.getPx(r);

    this.ctx.drawImage(img, sx, sy, swidth, sheight, x, y, width, height);
    this.roundRect(x, y, width, height, r || 0, bgColor);

    this.nowHeight = this.getRpx(y + height);
    return this;
  },
  /**
   * 绘制圆角图片
   * img, 
   * x, rpx
   * y, rpx
   * width, rpx || px
   * height rpx || px
   *  同于drawImage的参数
   * r 圆角半径 rpx
   * bgColor canvas背景颜色
   */
  drawFilletFillImg(img, x, y, width, height, r, bgColor = '#fff') {
    x = this.getPx(x);
    y = this.getPx(y);
    width = this.judgeRpxOrPx(width);
    height = this.judgeRpxOrPx(height);
    r = this.getPx(r);

    this.ctx.drawImage(img, x, y, width, height);
    this.roundRect(x, y, width, height, r || 0, bgColor);

    this.nowHeight = this.getRpx(y + height);
    return this;
  },
  /**
   * 绘制圆角矩形
   * img, 
   * x, rpx
   * y, rpx
   * width, rpx || px
   * height rpx || px
   *  同于drawImage的参数
   * r 圆角半径 rpx
   * isGrd 是否渐变
   * bgColor canvas背景颜色
   */
  drawFilletFillRect(x, y, width, height, r, isGrd, drawColor, bgColor = '#fff') {
    x = this.getPx(x);
    y = this.getPx(y);
    width = this.getPx(width);
    height = this.getPx(height);
    r = this.getPx(r);
    if (isGrd) {
      const grd = this.ctx.createLinearGradient(0, 0, width, 0)
      grd.addColorStop(0, drawColor[0])
      grd.addColorStop(1, drawColor[1])
      // grd.addColorStop(0, 'red')
      // grd.addColorStop(1, 'green')
      this.ctx.setFillStyle(grd);//将渐变色渲染入正方形
    } else {
      this.ctx.setFillStyle(drawColor[0]);
    }
    this.ctx.fillRect(x, y, width, height)

    this.roundRect(ctx, x, y, width, height, r || 0, bgColor);
  },
  /**
   * 普通绘制图片 和原本的drawImage用法相同  单位均为rpx
   */
  drawImage(img, sx, sy, swidth, sheight, x, y, width, height) {
    sx = this.getPx(sx);
    sy = this.getPx(sy);
    swidth = this.getPx(swidth);
    sheight = this.getPx(sheight);
    x = this.getPx(x);
    y = this.getPx(y);
    width = this.getPx(width);
    height = this.getPx(height);

    if (!x && !y) {
      this.ctx.drawImage(img, sx, sy, swidth, sheight);
      this.nowHeight = this.getRpx(sy + sheight);
    } else {
      this.ctx.drawImage(img, sx, sy, swidth, sheight, x, y, width, height);
      this.nowHeight = this.getRpx(y + sheight);
    }
    return this;
  },
  /**
   * 绘制单行文本
   * fontSize 字体大小
   * color 字体颜色
   * str 绘制的文本
   * x, y 坐标 单位均为rpx
   */
  drawText(str, x, y, fontSize = 24, color = '#000', align = 'left') {
    x = this.getPx(x);
    y = this.getPx(y + fontSize);
    fontSize = this.getPx(fontSize);

    this.ctx.save();
    this.ctx.setFontSize(fontSize)
    this.ctx.setTextAlign(align);
    this.ctx.fillStyle = color;
    this.ctx.fillText(str, x, y);
    this.ctx.restore();
    this.nowHeight = this.getRpx(y + fontSize);
    return this;
  },
  /**
   * 绘制多行文本
   * str 文本内容
   * x, y 坐标位置
   * width 绘制区域宽度
   * fontSize 字体大小
   * maxRow 最多绘制几行
   * color 颜色
   * suffixStr 多于内容的占位符 默认...
   * 单位均为rpx 
   */
  drawMultiLineText: function (str, x, y, width, fontSize, maxRow, color = '#000', align = 'left', suffixStr = '...') {
    x = this.getPx(x);
    y = this.getPx(y + fontSize);
    width = this.getPx(width);
    fontSize = this.getPx(fontSize);

    var lineWidth = 0;
    var row = 1;
    var tag = false;
    var lastSubStrIndex = 0; //每次开始截取的字符串的索引

    this.ctx.save()//保存当前的绘图上下文。
    this.ctx.setFontSize(fontSize)
    this.ctx.fillStyle = color;
    this.ctx.setTextAlign(align);
    for (let i = 0; i < str.length; i++) {

      lineWidth += this.ctx.measureText(str[i]).width;
      if (Math.round(lineWidth) >= width) {
        tag = true;
        let newtr = str.substring(lastSubStrIndex, i);
        if (row === maxRow) {
          newtr = newtr.substring(0, newtr.length - 1) + suffixStr
        }
        this.ctx.fillText(newtr, x, y); //绘制截取部分
        if (row === maxRow) {
          this.ctx.restore()//恢复之前保存的绘图上下文
          y += (fontSize + 5);
          this.nowHeight = this.getRpx(y);
          return this;
        }
        y += (fontSize + 5);
        lineWidth = 0;
        lastSubStrIndex = i;
        row++;
      }
      if (i === str.length - 1) { //绘制剩余部分
        let newtr = str.substring(lastSubStrIndex, str.length);
        this.ctx.fillText(newtr, x, y); //绘制截取部分
        if (tag) {
          y += (fontSize + 5);
        }
        this.ctx.restore()//恢复之前保存的绘图上下文
        this.nowHeight = this.getRpx(y);
        return this;
      }
    }
  },
  /**
   * 绘制函数
   * callback 绘制完成之后的回调
   */
  drawFinally(callback) {
    let that = this;
    that.ctx.draw(true, function () {
      setTimeout(function () {
        callback && callback(that.ctx, that.nowHeight);
      }, 500)
    }, that);
  },
  /**
   * destWidth 导出的图片目标宽度
   * canvasHeight canvas高度 （单位px）
   */
  canvasToPosterImg(canvasId, destWidth, canvasHeight, callback) {
    let that = this;
    wx.showLoading({
      title: '正在生成图片...',
    })
    let destHeight = destWidth / that.winWidth * canvasHeight;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: that.winWidth,
      height: canvasHeight,
      destWidth: destWidth,
      destHeight: destHeight,
      canvasId: canvasId,
      success(res) {
        wx.hideLoading();
        callback && callback(res);
      },
      fail: function (err) {
        console.log(err);
        callback && callback(err);
      }
    }, that)
  },
  roundRect: function (x, y, w, h, r, c) {
    // 开始绘制
    this.ctx.beginPath();
    // this.ctx.setFillStyle(c);
    this.ctx.fillStyle = c;
    // 左上角
    this.ctx.moveTo(x + r, y);
    this.ctx.arcTo(x, y, x, y + r, r);
    this.ctx.lineTo(x, y);
    this.ctx.lineTo(x + r, y);
    this.ctx.fill();

    // 右上角
    this.ctx.moveTo(x + w - r, y);
    this.ctx.arcTo(x + w, y, x + w, y + r, r);
    this.ctx.lineTo(x + w, y);
    this.ctx.lineTo(x + w - r, y);
    this.ctx.fill();

    // 左下角
    this.ctx.moveTo(x, y + h - r);
    this.ctx.arcTo(x, y + h, x + r, y + h, r);
    this.ctx.lineTo(x, y + h);
    this.ctx.lineTo(x, y + h - r);
    this.ctx.fill();

    // 右下角
    this.ctx.moveTo(x + w, y + h - r);
    this.ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    this.ctx.lineTo(x + w, y + h);
    this.ctx.lineTo(x + w, y + h - r);
    this.ctx.fill();
  },

  /**
   * base64图片转临时图片
   */
  drawCode: function (base64Str) {
    let that = this;
    const fsm = wx.getFileSystemManager();
    const FILE_BASE_NAME = 'tmp_base64src';

    return new Promise((resolve, reject) => {
      const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64Str) || [];
      if (!format) {
        reject(new Error('ERROR_PARSE_BASE64'));
      }
      const filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.${format}`;
      const buffer = wx.base64ToArrayBuffer(bodyData);
      fsm.writeFile({
        filePath,
        data: buffer,
        encoding: 'binary',
        success() {
          resolve(filePath);
        },
        fail() {
          reject(new Error('ERROR_WRITE_BASE64'));
        },
      });
    });
  }

}

module.exports = {
  canvasDraw: canvasDraw
}

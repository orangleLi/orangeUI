
/**
 * 绘制多行文本，由于文字比较多，这里我们写了一个函数处理 
 */
let drawText = (ctx, str, x, y, canvasWidth, fontSize, maxRow) => {
  var lineWidth = 0;
  var row = 1;
  var tag = false;
  var lastSubStrIndex = 0; //每次开始截取的字符串的索引

  ctx.save()//保存当前的绘图上下文。
  ctx.setFontSize(fontSize)
  for (let i = 0; i < str.length; i++) {

    lineWidth += ctx.measureText(str[i]).width;
    if (Math.round(lineWidth) >= canvasWidth) {
      tag = true;
      let newtr = str.substring(lastSubStrIndex, i);
      if (row === maxRow) {
        newtr = newtr.substring(0, newtr.length - 1) + '...'
      }
      ctx.fillText(newtr, x, y); //绘制截取部分
      if (row === maxRow) {
        y += (fontSize + 5);
        ctx.restore()//恢复之前保存的绘图上下文
        return y;
      }
      y += (fontSize + 5);
      lineWidth = 0;
      lastSubStrIndex = i;
      row++;
    }
    if (i === str.length - 1) { //绘制剩余部分
      let newtr = str.substring(lastSubStrIndex, str.length);
      ctx.fillText(newtr, x, y); //绘制截取部分
      // if (tag) {
        y += (fontSize + 5);
      // }
      ctx.restore()//恢复之前保存的绘图上下文
      return y;
    }
  }
}



  /**
   * base64图片画到canvas
   */
  let drawCode = (wxNewActicityQRCode) => {
    let that = this;
    const fsm = wx.getFileSystemManager();
    const FILE_BASE_NAME = 'tmp_base64src';

    return new Promise((resolve, reject) => {
      const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(wxNewActicityQRCode) || [];
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


module.exports = {
  drawText: drawText,
  drawCode: drawCode
}
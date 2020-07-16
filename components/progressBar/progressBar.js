// pages/comp/progressBar/progressBar.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    percentage: {
      type: Number,
      value: 0
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
  },
  methods: {
    init() {
      this.ctx = wx.createCanvasContext('annular-fixed', this);
      // this.canvasTap(0, this.data.percentage, ctx, 50, 50, 50, 10, 6, '#ff5b1f');
      this.start = 0
      let colors = ['red', 'green', 'yellow', 'blue', 'pink', 'orange', 'purple', '#ff5b1f']
      this.lastFrameTime = 0
      this.doAnimationFrame(this.drawCricle)
      // this.timer = setInterval(() => {
      //   this.drawCricle();
      // }, 16)
    },
    doAnimationFrame(callback) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - this.lastFrameTime));
      var id = setTimeout(() => {callback.call(this)}, timeToCall);
      this.lastFrameTime = currTime + timeToCall;
      return id;
    },
    drawCricle(w = 50, h = 50, r = 50, lineWidth = 6, color = '#ff5b1f'){
      this.start += 1;
      if (this.start > this.data.percentage) {
        clearInterval(this.timer)
        return false;
      }
      this.ctx.clearRect(0, 0, w, h);
      this.drawAnnular(this.ctx, w, h, r, 100, lineWidth, '#e5e9f2');
      this.drawAnnular(this.ctx, w, h, r, this.start, lineWidth, color);
    },
    drawAnnular(ctx, w, h, r, percentage, lineWidth, color) {
      ctx.beginPath();
      ctx.arc(w, h, r - (lineWidth / 2), 0, (percentage / 100) * 2 * Math.PI);
      ctx.setStrokeStyle(color);
      ctx.setLineWidth(lineWidth);
      ctx.setLineCap('butt')
      ctx.stroke();
      ctx.draw(true, this);
      this.doAnimationFrame(this.drawCricle)

      // var gradient = ctx.createLinearGradient(75, 50, 5, 90);
      // gradient.addColorStop("0", "#C88EFF");
      // gradient.addColorStop("1.0", "#7E5CFF");
      // ctx.strokeStyle = gradient; // 用渐变进行填充
      // ctx.lineWidth = 10;
      // ctx.lineCap = "round";
      // ctx.shadowColor = "rgba(191,142,255, 0.36)";
      // ctx.shadowBlur = 8;
      // ctx.shadowOffsetY = 8;
      // ctx.beginPath();
      // var count = percentage / (100 / 2) + 1;
      // ctx.arc(w, h, r - (lineWidth / 2), Math.PI, Math.PI * count, false);
      // ctx.stroke();
    },
  }
})
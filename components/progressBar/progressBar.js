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
      const ctx = wx.createCanvasContext('annular', this);
      this.canvasTap(10, this.data.percentage, ctx, 50, 50, 50, 10, 6, '#ff5b1f');
    },
    canvasTap(start, end, ctx, w, h, r, percentage, lineWidth, color) {
      start += 2;
      if (start > end) {
        return false;
      }
      ctx.clearRect(0, 0, w, h);
      this.drawAnnular(ctx, w, h, r, 100, lineWidth, '#e5e9f2');
      this.drawAnnular(ctx, w, h, r, start, lineWidth, color);
      setTimeout(() => {
        this.canvasTap(start, end, ctx, w, h, r, start, lineWidth, color);
      }, 20)
    },
    drawAnnular(ctx, w, h, r, percentage, lineWidth, color) {
      ctx.beginPath();
      ctx.arc(w, h, r - (lineWidth / 2), 0, (percentage / 100) * 2 * Math.PI);
      ctx.setStrokeStyle(color);
      ctx.setLineWidth(lineWidth);
      ctx.setLineCap('butt')
      ctx.stroke();
      ctx.draw(true);
    },
  }
})
<template>
  <div class="cub-loading" :class="{'roate-scale':rotateClass}">
    <canvas class="loading-canvas" :width="canvasWidth" :height="canvasHeight" ref="canvasEl"></canvas>
  </div>
</template>
<script>
export default {
  data () {
    return {
      drawColor: '#e4bb6e',
      canvasWidth: 50,
      canvasHeight: 50,
      timer: ''// 定时器
    };
  },
  props: {
    rateValue: {
      type: Number,
      default: -0.5
    },
    rotateClass: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    rateValue (newVal, oldVal) {
      this.drawCircle(-0.5, newVal);
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.drawEl = this.$refs.canvasEl;
      this.ctx = this.drawEl.getContext('2d');
      this.drawCircle(-0.5, this.rateValue);
    });
  },
  methods: {
    drawCircle (last, current) {
      var ctx = this.ctx;
      ctx.lineWidth = 4;
      ctx.strokeStyle = this.drawColor;
      let originX = this.canvasWidth / 2;
      let originY = this.canvasHeight / 2;
      let rateR = this.canvasWidth / 2 - 3;
      ctx.save();
      ctx.lineCap = 'round';
      ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      ctx.beginPath();
      ctx.arc(originX, originY, rateR, last * Math.PI, current * Math.PI);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    },
    // 动态添加打勾
    animateDrawTick () {
      this.drawTick(11, 29, 23, 37, 11, 29, 12, 8);
      setTimeout(() => {
        this.drawTick(23.5, 37.5, 38, 14, 23.5, 14, 14.5, 23.5);
      }, 150);
    },
    // 添加绘制打勾动画
    drawTick (startX, startY, endX, endY, clearX, clearY, width, height) {
      // 获取斜率
      let key = (endY - startY) / (endX - startX);
      let i = 0;// 表示步长
      this.timer = setInterval(() => {
        let ydistance = startY - key * startX;
        let xi = startX + i;
        let yi = (startX + i) * key + ydistance;
        if (xi >= endX) {
          clearInterval(this.timer);
          return;
        }
        i += 1.5;
        let ctx = this.ctx;
        ctx.clearRect(clearX, clearY, width, height);
        this.drawLine(startX, startY, xi, Math.abs(yi));
      }, 1000 / 60);
    },
    // 绘制直线
    drawLine (startX, startY, endX, endY) {
      var ctx = this.ctx;
      ctx.lineWidth = 3;
      ctx.strokeStyle = this.drawColor;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }
  }
};
</script>
<style lang="less" scoped>
.cub-loading{
  display:flex;
  transform: scale(0.5,0,5);
  -webkit-transform: scale(0.5,0.5);
}
</style>

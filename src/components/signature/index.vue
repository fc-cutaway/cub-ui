<template>
  <div class="em-signature">
    <div class="em-signature-container" ref="wrap">
      <canvas ref="canvas" :height="canvasHeight" :width="canvasWidth"  v-if="isCanvasSupport"></canvas>
      <p class="nut-signature-support" v-else>{{unSupportTpl}}</p>
    </div>
    <div class="em-signature-btns">
      <span class="em-rewrite-btn" @click="clean()">重签</span>
      <span class="em-sure-btn" @click="confirm">确定</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    unSupportTpl: {
      type: String,
      default: '对不起，当前浏览器不支持Canvas,无法使用本空件'
    },
    lineWidth: {
      type: Number,
      default: 2
    },
    strokeStyle: {
      type: String,
      default: '#000'
    },
    type: {
      type: String,
      default: 'png'
    }
  },
  data () {
    return {
      canvasHeight: 0,
      canvasWidth: 0,
      isSupportTouch: ('ontouchstart' in window),
      events: ('ontouchstart' in window) ? ['touchstart', 'touchmove', 'touchend'] : ['mousedown', 'mousemove', 'mouseup']
    };
  },
  computed: {
    /**
     * isCanvasSupport 判断当前浏览器是否支持canvas
    */
    isCanvasSupport () {
      let elem = document.createElement('canvas');
      return !!(elem.getContext && elem.getContext('2d'));
    }
  },
  mounted () {
    if (this.isCanvasSupport) {
      this.ctx = this.$refs.canvas.getContext('2d');
      this.canvasWidth = this.$refs.wrap.offsetWidth;
      this.canvasHeight = this.$refs.wrap.offsetHeight;
      this.addEvent();
    }
  },
  methods: {
    addEvent () {
      this.$refs.canvas.addEventListener(this.events[0], this.startEventHandler, false);
    },
    /**
     * startEventHandler touchstart事件
    */
    startEventHandler (event) {
      event.preventDefault();
      this.ctx.beginPath();
      this.ctx.lineWidth = this.lineWidth;
      this.ctx.strokeStyle = this.strokeStyle;
      this.$refs.canvas.addEventListener(this.events[1], this.moveEventHandler, false);
      this.$refs.canvas.addEventListener(this.events[2], this.endEventHandler, false);
    },
    /**
     * moveEventHandler touchmove事件
    */
    moveEventHandler (event) {
      event.preventDefault();
      let evt = this.isSupportTouch ? event.touches[0] : event;
      let coverPos = this.$refs.canvas.getBoundingClientRect();
      let moveX = evt.clientX - coverPos.left;
      let moveY = evt.clientY - coverPos.top;
      this.ctx.lineTo(moveX, moveY);
      this.ctx.stroke();
    },
    /**
     * endEventHandler touchend事件
    */
    endEventHandler (event) {
      event.preventDefault();
      this.$refs.canvas.removeEventListener(this.events[1], this.moveEventHandler, false);
      this.$refs.canvas.removeEventListener(this.events[2], this.endEventHandler, false);
    },
    /**
     * clean 清除签名事件
    */
    clean (isUnEmit) {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.ctx.closePath();
      if (!isUnEmit) {
        this.$emit('clear');
      }
    },
    /**
     * confirm 签名确认按钮事件
    */
    confirm () {
      this.onSave(this.$refs.canvas);
    },
    /**
     * onSave 保存签名将canvas转换成图片
    */
    onSave (canvas) {
      let dataurl;
      switch (this.type) {
        case 'png':
          dataurl = canvas.toDataURL('image/png', 0.5);
          break;
        case 'jpg':
          dataurl = canvas.toDataURL('image/jpeg', 0.5);
          break;
      }
      this.clean(true);
      this.$emit('confirm', dataurl);
    }
  }
};
</script>
<style lang="less">
@import url("../../styles/common/index.less");
@import url("../../styles/components/signature.less");
</style>

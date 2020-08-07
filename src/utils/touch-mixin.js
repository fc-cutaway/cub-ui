import Vue from 'vue';
const MIN_DISTANCE = 10;
// 获取手指滑动方向
function getDiretion (x, y) {
  if (x > y && x > MIN_DISTANCE) {
    return 'horizontal';
  }
  if (y > x && y > MIN_DISTANCE) {
    return 'vertical';
  }
}
export const TouchMixins = Vue.extend({
  data () {
    return {
      startX: 0,
      startY: 0,
      delatX: 0,
      delatY: 0,
      offsetX: 0,
      offsetY: 0,
      direction: ''
    };
  },
  methods: {
    /**
     * touchStart 绑定touchstart事件执行方法
     * @param {Object} event 绑定touchstart的事件源
    */
    touchStart (event) {
      this.resetTouchStatus();
      this.startX = event.touches[0].clientX;
      this.startY = event.touches[0].clientY;
    },
    /**
     * touchMove 绑定touchMove事件执行方法
     * @param {Object} event 绑定touchMove的事件源
    */
    touchMove (event) {
      const touch = event.touches[0];
      this.delatX = touch.clientX - this.startX;
      this.delatY = touch.clientY - this.startY;
      this.offsetX = Math.abs(this.delatX);
      this.offsetY = Math.abs(this.delatY);
      this.direction = this.direction || getDiretion(this.offsetX, this.offsetY);
    },
    /**
     * resetTouchStatus 重置touch事件中的状态
    */
    resetTouchStatus () {
      this.direction = '';
      this.delatX = 0;
      this.delatY = 0;
      this.offsetX = 0;
      this.offsetY = 0;
    }
  }
});

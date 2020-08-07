<template>
  <div class="picker-column" @touchstart = "onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
    <ul class="picker-column-wrapper" ref="wrapper" :style="wrapperStyle" @transitionend="onTransitionEnd" @webkitTransitionend ="onTransitionEnd">
      <li class="picker-column-item" :style="columnItemStyle" v-for="(item,index) in columnData" :key="index" @click="onClickItem(index)">{{item}}</li>
    </ul>
  </div>
</template>
<script>
import { TouchMixins } from '@/utils/touch-mixin.js';
/**
 * 惯性滑动思路:
 * 在手指离开屏幕时；如果和上一次时的时间间隔小于`MOMENTUM_LIMIT_TIME`
 * 且move距离大于`MOMENTUM_LIMIT_DISTANCE`时，执行惯性滑动，持续`MOMENTUM_DURATION`
*/
const DEFAULT_DURATION = 200;
const MOMENTUM_DURATION = 800;
const MOMENTUM_LIMIT_TIME = 300;
const MOMENTUM_LIMIT_DISTANCE = 15;
export default {
  props: {
    // 列的数据
    columnData: {
      type: Array,
      default: function () {
        return [];
      }
    },
    // 默认处于第一行选中
    defaultIndex: {
      type: Number,
      default: 1
    },
    // 控制可见的行高数目
    visibleItemCount: {
      type: Number,
      default: 5
    },
    // 行高
    itemHeight: {
      type: Number,
      default: 44
    },
    // 当前处于第几列
    column: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      moving: false,
      offset: 0,
      duration: 0,
      currentIndex: this.defaultIndex

    };
  },
  mixins: [TouchMixins],
  created () {

  },
  computed: {
    wrapperStyle () {
      const baseOffset = (this.itemHeight * (this.visibleItemCount - 1)) / 2;
      const style = {
        transform: `translate3d(0,${this.offset + baseOffset}px,0)`,
        transitionDuration: `${this.duration}ms`,
        transitionProperty: this.duration ? 'all' : 'none',
        lineHeight: `${this.itemHeight}px`,
        transitionTimeFunction: 'cubic-bezier(0.23, 1, 0.32, 1)'
      };
      return style;
    },
    columnItemStyle () {
      const style = {};
      style.height = this.itemHeight + 'px';
      return style;
    },
    count () {
      return this.columnData.length;
    }
  },
  components: {
  },
  methods: {
    /**
     * onTouchStart touchstart事件
    */
    onTouchStart (event) {
      this.touchStart(event);
      if (this.moving) {
        const translateY = this.getElementTranslateY(this.$refs.wrapper);
        this.startOffset = Math.min(0, translateY);
      } else {
        this.startOffset = this.offset;
      }
      this.duration = 0;
      this.moving = false;
      this.touchStartTime = Date.now();
      this.transitionEndTrigger = null;
      if (isNaN(this.startOffset)) {
        this.startOffset = 0;
      }
      this.momentumOffset = this.startOffset;
    },
    /**
     * onTouchMove touchmove事件
    */
    onTouchMove (event) {
      this.moving = true;
      this.touchMove(event);
      if (this.direction === 'vertical') {
        event.preventDefault();
      }
      this.offset = this.range(this.startOffset + this.delatY, -(this.count * this.itemHeight), this.itemHeight);
      const now = Date.now();
      if (now - this.touchStartTime > MOMENTUM_LIMIT_TIME) {
        this.touchStartTime = now;
        this.momentumOffset = this.offset;
      }
    },
    /**
     * onTouchEnd touch结束事件
    */
    onTouchEnd (event) {
      const distance = this.offset - this.momentumOffset;
      const duration = Date.now() - this.touchStartTime;
      const allowMomentum = duration < MOMENTUM_LIMIT_TIME && Math.abs(distance) > MOMENTUM_LIMIT_DISTANCE;
      if (allowMomentum) {
        this.momentum(distance, duration);
        return;
      }
      if (this.offset !== this.startOffset) {
        this.duration = DEFAULT_DURATION;
        const index = this.getIndexByOffset(this.offset);
        this.setIndex(index, true);
      }
    },
    /**
     * momentum 添加滚动
    */
    momentum (distance, duration) {
      const speed = Math.abs(distance / duration);
      distance = this.offset + (speed / 0.002) * (distance < 0 ? -1 : 1);
      const index = this.getIndexByOffset(distance);
      this.duration = MOMENTUM_DURATION;
      this.setIndex(index, true);
    },
    /**
     * getElementTranslateY 获取开始滚动时的偏移
    */
    getElementTranslateY (element) {
      const style = window.getComputedStyle(element);
      const transform = style.transform || style.webkitTransform;
      const translateY = transform.slice(7, transform.length - 1).split(', ')[5];
      return Number(translateY);
    },
    range (num, min, max) {
      return Math.min(Math.max(num, min), max);
    },
    /**
     * getIndexByOffset 获取滚动到指定item
    */
    getIndexByOffset (offset) {
      return this.range(Math.round(-offset / this.itemHeight), 0, this.count - 1);
    },
    /**
     * onClickItem 添加点击事件
    */
    onClickItem (index) {
      this.duration = DEFAULT_DURATION;
      this.setIndex(index, true);
    },
    /**
     * setIndex 滚动到指定位置
    */
    setIndex (index, userAction) {
      this.offset = -index * this.itemHeight;
      const trigger = () => {
        if (index !== this.currentIndex) {
          this.currentIndex = index;
          if (userAction) {
            this.$emit('change', this.column, index);
          }
        }
      };
      if (this.moving) {
        this.transitionEndTrigger = trigger;
      } else {
        trigger();
      }
    },
    /**
     * onTransitionEnd 滚动动画结束执行
    */
    onTransitionEnd () {
      this.stopMomentum();
    },
    /**
     * stopMomentum 滚动停止时调用
    */
    stopMomentum () {
      this.moving = false;
      this.duration = 0;
      if (this.transitionEndTrigger) {
        this.transitionEndTrigger();
        this.transitionEndTrigger = null;
      }
    }
  }
};
</script>

<template>
  <div class="pull-refresh-more" ref="container" :style="container">
    <div class="pullrefresh-track" ref="track" :style="trackStyle">
      <div class="pullrefresh-head">
        <p>{{stateText}}</p>
      </div>
      <div class="refresh-more-content" v-for="(item,index) in name" :key="index">{{item}}</div>
    </div>
  </div>
</template>
<script>
import { TouchMixins } from '@/utils/touch-mixin.js';
import { PULLDOWN_START, PULLDOWN_UP, PULLDOWN_LOADING, PULLDOWN_SUCCESS, PULLDOWN_FAIL } from './constant.js';
export default {
  data () {
    return {
      touchEl: '',
      state: PULLDOWN_START,
      scrollEl: '',
      duration: 0,
      distance: 0,
      name: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']
    };
  },
  props: {
    // 滚动容器的高度
    containerHeight: {
      type: Number,
      default: 700
    },
    // 上拉刷新开关
    enableUp: {
      type: Boolean,
      default: false
    },
    // 下拉刷新开关
    enableDown: {
      type: Boolean,
      default: true
    },
    // 计算下拉最大距离使用
    headHeight: {
      type: Number,
      default: 100
    },
    // 动画时长
    animationDuration: {
      type: Number,
      default: 300
    },
    // 成功后停留时间
    successDuration: {
      type: Number,
      default: 300
    },
    downBeforeText: {
      type: String,
      default: '下拉即可刷新...'
    },
    downText: {
      type: String,
      default: '释放即可刷新...'
    },
    downLoadingText: {
      type: String,
      default: '加载中...'
    },
    downSuccessText: {
      type: String,
      default: '刷新成功!'
    },
    downFailureText: {
      type: String,
      default: '刷新失败!'
    },
    // 下拉边界值
    boundaryValue: {
      type: Number,
      default: 60
    },
    // 下拉回弹的距离，触发刷新
    springbackValue: {
      type: Number,
      default: 60
    },
    triggerUp: {
      type: Function,
      default: () => {

      }
    }
  },
  mixins: [TouchMixins],
  created () {

  },
  computed: {
    container () {
      return { height: `${this.containerHeight}px` };
    },
    touchable () {
      return (!this.enableUp) && !(this.state > PULLDOWN_START);
    },
    stateText () {
      let _stateText = '';
      switch (this.state) {
        case PULLDOWN_START:
          _stateText = this.downBeforeText;
          break;
        case PULLDOWN_UP:
          _stateText = this.downText;
          break;
        case PULLDOWN_LOADING:
          _stateText = this.downLoadingText;
          break;
        case PULLDOWN_SUCCESS:
          _stateText = this.downSuccessText;
          break;
        case PULLDOWN_FAIL:
          _stateText = this.downFailureText;
      }
      return _stateText;
    },
    trackStyle () {
      const trackStyle = {
        transitionDuration: `${this.duration}ms`,
        transform: this.distance ? `translate3d(0,${this.distance}px,0)` : ''
      };
      return trackStyle;
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.scrollEl = this.$refs.track;
      this.touchEl = document.getElementsByClassName('pullrefresh-track')[0];
      this.touchEl.addEventListener('touchstart', this.onTouchStart);
      this.touchEl.addEventListener('touchmove', this.onTouchMove);
      this.touchEl.addEventListener('touchend', this.onTouchEnd);
    });
  },
  methods: {
    onTouchStart (event) {
      console.log(this.$refs.container.scrollTop);
      if (this.$refs.container.scrollTop !== 0) {
        this.duration = 0;
        return;
      }
      if (this.state === PULLDOWN_FAIL || this.state === PULLDOWN_SUCCESS) {
        this.state = PULLDOWN_START;
      }
      if (this.touchable) {
        this.checkPullStart(event);
      }
    },
    checkPullStart (event) {
      this.ceiling = this.$refs.container.scrollTop === 0;
      if (this.ceiling) {
        this.duration = 0;
        this.state = PULLDOWN_START;
        this.touchStart(event);
      }
    },
    onTouchMove (event) {
      if (!this.ceiling) {
        this.checkPullStart(event);
      }
      if (this.$refs.container.scrollTop !== 0) {
        return;
      }
      const processStates = [
        PULLDOWN_LOADING,
        PULLDOWN_SUCCESS,
        PULLDOWN_FAIL
      ];
      if (processStates.includes(this.state)) {
        return;
      }
      this.touchMove(event);
      if (this.ceiling && this.delatY >= 0 && this.direction === 'vertical') {
        event.preventDefault();

        event.stopPropagation();
        this.setStatus(this.ease(this.delatY));
      }
    },
    onTouchEnd (event) {
      // 下拉超过触发下拉刷新的值，松手处于刷新加载数据中
      if (this.distance >= this.boundaryValue) {
        this.duration = 300;
        this.distance = this.springbackValue;
        this.state = PULLDOWN_LOADING;
        // 刷新加载后端数据
        this.triggerUp();
      } else {
        // 如果scrollTop不为零表示松手处于滚动状态
        if (this.$refs.container.scrollTop !== 0) {
          this.duration = 0;
        } else {
          // 松手下拉刷新未超过临界值；复原下拉刷新状态
          this.restart(0);
        }
      }
    },
    ease (distance) {
      const headHeight = +this.headHeight;
      if (distance > headHeight) {
        if (distance > headHeight) {
          if (distance < headHeight * 2) {
            distance = headHeight + (distance - headHeight) / 2;
          } else {
            distance = headHeight * 1.5 + (distance - headHeight * 2) / 4;
          }
        }
      }
      this.distance = distance;
      return Math.round(distance);
    },
    setStatus (distance) {
      if (this.distance >= this.boundaryValue) {
        this.state = PULLDOWN_UP;
      }
    },
    success () {
      this.state = PULLDOWN_SUCCESS;
      this.restart(200);
    },
    failure () {
      this.state = PULLDOWN_FAIL;
      this.restart(200);
    },
    restart (time) {
      setTimeout(() => {
        this.duration = 200;
        this.distance = 0;
      }, time);
    }
  }
};
</script>
<style lang="less">
@import url("../../styles/common/index.less");
@import url("../../styles/components/pullrefresh.less");
</style>

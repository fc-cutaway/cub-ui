<template>
  <div class="ui-pulldown" v-show="scroller.enableDown">
    <div class="ui-pulldown-text"><loading :rateValue="rateValue" ref="loading" :rotateClass="rotateIcon"/><span class="pulldown-text">{{stateText}}</span></div>
  </div>
</template>
<script>
import {
  PULLDOWN_START,
  PULLDOWN_UP,
  PULLDOWN_LOADING,
  PULLDOWN_SUCCESS,
  PULLDOWN_FAIL
} from './constant.js';
import loading from './loading.vue';
export default {
  data () {
    return {
      state: PULLDOWN_START,
      pullDownHeight: 60,
      pullDownOffset: 60,
      finishDelay: 450,
      rotateIcon: false,
      rateValue: -0.5// rateValue:-0.5表示开始，1.5表示满圆圈
    };
  },
  inject: ['scroller'],
  computed: {
    stateText () {
      let _stateText = '';
      switch (this.state) {
        case PULLDOWN_START:
          _stateText = this.scroller.downBeforeText;
          break;
        case PULLDOWN_UP:
          _stateText = this.scroller.downText;
          break;
        case PULLDOWN_LOADING:
          _stateText = this.scroller.downLoadingText;
          break;
        case PULLDOWN_SUCCESS:
          _stateText = this.scroller.downSuccessText;
          break;
        case PULLDOWN_FAIL:
          _stateText = this.scroller.downFailureText;
      }
      return _stateText;
    }
  },
  mounted () {
    setTimeout(() => {
      this.bscroll = this.scroller.bscroll;
      this._enable();
    }, 0);
  },
  methods: {
    _enable () {
      if (this.scroller.enableDown) {
        this.bscroll.openPullDown({
          threshold: this.pullDownHeight,
          stop: this.pullDownOffset
        });
        this.bscroll.on('pullingDown', this._pullingDownHandler);
        this.bscroll.on('scroll', this._scrollHandler);
        this.bscroll.on('scrollStart', this._scrollStartHandler);
      }
    },
    _pullingDownHandler () {
      this.state = PULLDOWN_LOADING;
      this.rotateIcon = true;
      setTimeout(() => {
        this.rateValue = 1.1;
      }, 0);
      this.$emit('loadRefresh');
    },
    _scrollHandler (ops) {
      let y = ops.y;
      const processStates = [
        PULLDOWN_LOADING,
        PULLDOWN_SUCCESS,
        PULLDOWN_FAIL
      ];
      if ((y < 0 || processStates.includes(this.state))) {
        return;
      }
      this.rateValue = y / 50 * 1.5;
      if (y > this.pullDownHeight) {
        this.rateValue = 1.6;
        this.state = PULLDOWN_UP;
      }
    },
    _scrollStartHandler () {
      if (this.bscroll.y <= 10 && (this.state === PULLDOWN_SUCCESS || this.state === PULLDOWN_FAIL)) {
        this.state = PULLDOWN_START;
        this.rotateIcon = false;
      }
    },
    // 数据请求成功后调用
    success () {
      this.rateValue = 1.5;
      this.rotateIcon = false;
      this.state = PULLDOWN_SUCCESS;
      this.$refs.loading.animateDrawTick();
      setTimeout(async () => {
        await this.$nextTick();
        this.bscroll.finishPullDown();
        this.bscroll.refresh();
      }, this.finishDelay);
    },
    // 数据请求失败后调用
    failure () {
      this.state = PULLDOWN_FAIL;
      setTimeout(async () => {
        await this.$nextTick();
        this.bscroll.finishPullDown();
        this.bscroll.refresh();
      }, this.finishDelay);
    }
  },
  components: {
    loading
  }
};
</script>

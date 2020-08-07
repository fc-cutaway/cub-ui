<template>
  <div class="ui-pulldown" v-show="scroller.enableDown">
    <p class="ui-pulldown-text"><i class="iconfont icon-text" :class="[iconClass,{rotate:rotateIcon}]"></i><span class="pulldown-text">{{stateText}}</span></p>
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
export default {
  data () {
    return {
      state: PULLDOWN_START,
      pullDownHeight: 50,
      pullDownOffset: 50,
      finishDelay: 500,
      iconClass: 'pull-icon',
      rotateIcon: false
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
      this.iconClass = 'icon-jiazaizhong ';
      this.rotateIcon = true;
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
      if (y > this.pullDownHeight) {
        this.state = PULLDOWN_UP;
        this.iconClass = 'pull-icon-refresh';
      }
    },
    _scrollStartHandler () {
      if (this.bscroll.y <= 10 && (this.state === PULLDOWN_SUCCESS || this.state === PULLDOWN_FAIL)) {
        this.state = PULLDOWN_START;
        this.iconClass = 'pull-icon';
        this.rotateIcon = false;
      }
    },
    // 数据请求成功后调用
    success () {
      this.state = PULLDOWN_SUCCESS;
      setTimeout(async () => {
        await this.$nextTick();
        this.bscroll.finishPullDown();
        this.bscroll.refresh();
      }, this.finishDelay);
    },
    // 数据请求失败后调用
    failure () {
      this.state = PULLDOWN_FAIL;
      this.bscroll.finishPullDown();
      this.bscroll.refresh();
    }
  }
};
</script>

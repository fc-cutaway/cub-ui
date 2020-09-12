<template>
  <div class="ui-pullup" :style="pullItemStyle">
    <p class="ui-pull-content"><loading :rateValue="rateValue" :rotateClass="rotateIcon" v-show="iconShow"/><span class="up-text">{{stateText}}</span></p>
  </div>
</template>
<script>
import {
  PULLUP_START,
  PULLUP_UP,
  PULLUP_LOADING,
  PULLUP_SUCCESS,
  PULLUP_FAIL,
  PULLUP_NODATA

} from './constant.js';
import loading from './loading.vue';
export default {
  data () {
    return {
      state: PULLUP_START,
      bscroll: '',
      pullDisplay: 1,
      rateValue: -0.5,
      rotateIcon: true
    };
  },
  inject: ['scroller'],
  computed: {
    stateText () {
      let _stateText = '';
      switch (this.state) {
        case PULLUP_START:
          _stateText = this.scroller.upBeforeText;
          break;
        case PULLUP_UP:
          _stateText = this.scroller.upText;
          break;
        case PULLUP_LOADING:
          _stateText = this.scroller.upLoadingText;
          break;
        case PULLUP_SUCCESS:
          _stateText = this.scroller.upSuccessText;
          break;
        case PULLUP_FAIL:
          _stateText = this.scroller.upFailText;
          break;
        case PULLUP_NODATA:
          _stateText = this.scroller.upNoDataText;
          break;
      }
      return _stateText;
    },
    iconShow () {
      let showBoolean = true;
      if (this.state === PULLUP_FAIL || this.state === PULLUP_NODATA) {
        showBoolean = false;
      }
      return showBoolean;
    },
    pullItemStyle () {
      const style = {};
      if (this.scroller.enableUp && this.state === this.pullDisplay) {
        style.opacity = 1;
      } else {
        style.opacity = 0;
      }
      return style;
    }
  },
  watch: {
    'scroller.enableUp': (val, oldVal) => {
      setTimeout(() => {
        if (!oldVal & val) {
          this._enable();
        } else if (!val) {
          this._disable();
        }
      }, 0);
    }
  },
  created () {

  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.bscroll = this.scroller.bscroll;
        this.setup();
      }, 0);
    });
  },
  methods: {
    // 设置上拉加载，滚动组件初始化完成后调用
    setup () {
      this.bscroll = this.scroller.bscroll;
      if (this.scroller.enableUp) {
        this._enable();
      } else {
        this._disable();
      }
    },
    _enable () {
      // 判断是否启用上拉加载
      if (this.scroller.enableUp) {
        this.bscroll.openPullUp({
          pullUpLoad: {
            threshold: 5
          }
        });
        this.bscroll.on('pullingUp', this._pullUpLoadHandler);
      }
    },
    _disable () {
      this.bscroll.closePullUp();
      this.bscroll.off('pullingUp', this._pullUpLoadHandler);
    },
    _pullUpLoadHandler () {
      if (this.state === PULLUP_LOADING) {
        return;
      }
      this.rateValue = 1.2;
      this.state = PULLUP_LOADING;
      this.pullDisplay = PULLUP_LOADING;
      this.$emit('loadMore');
    },
    /**
     * success 加载成功
    */
    async success () {
      this.state = PULLUP_SUCCESS;
      this.pullDisplay = PULLUP_LOADING;
      await this.$nextTick();
      this.bscroll.finishPullUp();
      this.bscroll.refresh();
    },
    /**
     * failure 加载失败
    */
    failure () {
      this.state = PULLUP_FAIL;
      this.pullDisplay = PULLUP_FAIL;
      setTimeout(() => {
        this.pullDisplay = PULLUP_LOADING;
      }, 500);
      this.bscroll.finishPullUp();
      this.bscroll.refresh();
    },
    /**
     * noData 没有数据
    */
    noData () {
      this.state = PULLUP_NODATA;
      this.pullDisplay = PULLUP_NODATA;
      setTimeout(() => {
        this.pullDisplay = PULLUP_LOADING;
      }, 500);
      this.bscroll.finishPullUp();
      this.bscroll.refresh();
    }
  },
  components: {
    loading
  }
};
</script>

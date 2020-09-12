<template>
  <div class="mview-scroll" :style="scrollerStyle" ref="scrollContainer">
    <div class="ui-scroll-content" :style="scrollContentStyle">
      <pull-down ref="pulldown" @loadRefresh = "loadRefresh"></pull-down>
      <div class="scroll-content-container">
        <slot></slot>
      </div>
      <pull-up ref="pullup" @loadMore="loadMore"></pull-up>
    </div>
  </div>
</template>
<script>
import BetterScroll from 'better-scroll';
import PullUp from './pullup.vue';
import PullDown from './pulldown.vue';
export default {
  data () {
    return {
      distance: 5,
      name: '人民网'
    };
  },
  provide () {
    return {
      scroller: this
    };
  },
  props: {
    scrollHeight: {
      type: Number,
      default: 800
    },
    // 下拉状态文本配置
    downBeforeText: {
      type: String,
      default: '下拉刷新'
    },
    // 下拉超过下拉高度后文本
    downText: {
      type: String,
      default: '释放刷新'
    },
    // 下拉刷新正在加载过程中的文本
    downLoadingText: {
      type: String,
      default: '正在刷新...'
    },
    // 下拉加载成功后文本
    downSuccessText: {
      type: String,
      default: '刷新成功'
    },
    // 下拉加载失败后文本
    downFailureText: {
      type: String,
      default: '刷新失败'
    },
    // 上拉中文本配置
    upBeforeText: {
      type: String,
      default: '加载中...'
    },
    upText: {
      type: String,
      default: '加载中...'
    },
    // 正在加载过程中的文本
    upLoadingText: {
      type: String,
      default: '加载中...'
    },
    // 加载成功后的文本
    upSuccessText: {
      type: String,
      default: '加载中...'
    },
    // 加载完成没有更多数据
    upNoDataText: {
      type: String,
      default: '没有更多数据'
    },
    upFailText: {
      type: String,
      default: '加载失败'
    },
    // 启用上拉加载
    enableUp: {
      type: Boolean,
      default: true
    },
    // 启用下拉刷新
    enableDown: {
      type: Boolean,
      default: true
    }
  },
  created () {

  },
  async mounted () {
    await this._setup();
  },
  computed: {
    scrollerStyle () {
      const style = {};
      style.height = `${this.scrollHeight}px`;
      style.overflow = 'hidden';
      return style;
    },
    scrollContentStyle () {
      const style = {};
      style.minHeight = `${this.scrollHeight + this.distance}px`;
      return style;
    }
  },
  methods: {
    async _setup () {
      const options = {
        probeType: 3,
        click: true,
        scrollX: false,
        scrollY: true,
        startY: 0,
        bounceTime: 300

      };
      await this.$nextTick();
      this.bscroll = new BetterScroll(this.$refs.scrollContainer, options);
    },
    // 刷新执行方法
    loadRefresh () {
      this.$emit('dropRefresh');
    },
    // 刷新成功调用
    dropSuccess () {
      this.$refs.pulldown.success();
    },
    // 刷新调用失败
    dropFailure () {
      this.$refs.pulldown.failure();
    },
    // 上拉加载
    loadMore () {
      this.$emit('pullMore');
    },
    // 上拉加载成功调用
    pullSuccess () {
      this.$refs.pullup.success();
    },
    // 上拉加载失败调用
    pullFailure () {
      this.$refs.pullup.failure();
    },
    // 上拉加载没有数据
    pullNoData () {
      this.$refs.pullup.noData();
    },
    // 重置滚动区域 tab切换时需要先刷新滚动区域；在滚动到底部判断
    refresh () {
      if (this.enableUp) {
        this.$refs.pullup._disable();
      }
      setTimeout(() => {
        this.bscroll.refresh();
        this.$refs.pullup._enable();
      }, 0);
    }
  },
  components: {
    PullUp,
    PullDown
  }
};
</script>
<style lang="less">
@import url("../../styles/common/index.less");
@import url("../../styles/components/scroller.less");
</style>

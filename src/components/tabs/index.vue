<template>
  <div class="view-tabs-container">
    <div class="tabs-container hairline-top-bottom" ref="nav" :class="[{'tabs-wrap-scrollable':enableScroll}]">
      <tab ref="tabs"  v-for="(item,index) in titleContent" :tabWidth="tabWidth" :isActive="currentIndex === index" :key="index" @click.native="onClick(index)">{{item}}</tab>
      <div class="tab-line" :style="lineStyle"></div>
    </div>
  </div>
</template>
<script>
import tab from './tab.vue';
export default {
  data () {
    return {
      currentIndex: this.activeIndex,
      lineStyle: {},
      tabWidth: 22,
      scrollLeftRafId: ''
    };
  },
  props: {
    /**
     * titleContent 配置tab中内容
    */
    titleContent: {
      default: () => {
        return ['张三', '李四', '小明', '小张', '大学', '小理', '小张', '小张', '小名', '小雨'];
      }
    },
    /**
     * lineWidth 底部线的宽度
    */
    lineWidth: {
      default: 0,
      type: Number
    },
    /**
     * lineHeight 底部线的高度
    */
    lineHeight: {
      default: 3,
      type: Number
    },
    /**
     * color 底部线的颜色
    */
    color: {
      type: String,
      default: '#e4393c'
    },
    /**
     * duration 动画的时间
    */
    duration: {
      type: Number,
      default: 0.3
    },
    /**
     * enableScroll 是否能滚动
    */
    enableScroll: {
      type: Boolean,
      default: true
    },
    /**
     * swipeThreshold 判断能滚动的最小tab数目
    */
    swipeThreshold: {
      default: 4,
      type: Number
    },
    /**
     * activeIndex 当前激活的tab
    */
    activeIndex: {
      default: 0,
      type: Number
    }
  },
  computed: {
    scrollable () {
      return this.titleContent.length > this.swipeThreshold;
    }
  },
  mounted () {
    this.onShow();
  },
  methods: {
    /**
     * onShow tabs初始化
    */
    onShow () {
      this.$nextTick(() => {
        this.inited = true;
        this.scrollIntoView(true);
        this.setLine(true);
      });
    },
    /**
     * onClick tab添加点击事件
    */
    onClick (index) {
      if (index === this.currentIndex) {
        return;
      }
      this.currentIndex = index;
      this.$emit('tabClick', index);
      this.scrollIntoView(false);
      setTimeout(() => {
        this.setLine();
      }, 200);
    },
    /**
     * scrollIntoView 设置滚动
     * @param {Boolean} immediate 是否开启动画
    */
    scrollIntoView (immediate) {
      let tabsEl = this.$refs.tabs;
      if (!this.scrollable || !tabsEl) {
        return;
      }
      let nav = this.$refs.nav;
      let title = tabsEl[this.currentIndex].$el;
      let to = title.offsetLeft - (nav.offsetWidth - title.offsetWidth) / 2;
      this.scrollLeftTo(nav, to, immediate ? 0 : +this.duration);
    },
    /**
     * scrollLeftTo 设置滚动
     * @param {Element} scroller 滚动元素
     * @param {Number} to 滚动距离
     * @param {Number} duration 滚动时间
    */
    scrollLeftTo (scroller, to, duration) {
      let _this = this;
      if (_this.scrollLeftRafId) {
        window.cancelAnimationFrame(this.scrollLeftRafId);
      }
      let count = 0;
      var from = scroller.scrollLeft;
      var frames = duration === 0 ? 1 : Math.round(duration * 1000 / 16);
      function animation () {
        scroller.scrollLeft += (to - from) / frames;
        if (++count < frames) {
          _this.scrollLeftRafId = window.requestAnimationFrame(animation);
        }
      }
      animation();
    },
    /**
     * setLine 设置底部切换的line 动画
     * @param {Boolean} immediate 是否不设置动画
    */
    setLine (immediate) {
      const shouldAnimate = this.inited;
      this.$nextTick(() => {
        let tabsEl = this.$refs.tabs;
        let titleTab = tabsEl[this.currentIndex].$el;
        const { lineWidth, lineHeight } = this;
        const width = lineWidth || titleTab.offsetWidth / 2;
        const left = titleTab.offsetLeft + titleTab.offsetWidth / 2;
        const lineStyle = {
          width: width + 'px',
          background: this.color,
          transform: `translateX(${left}px) translateX(-50%)`
        };
        if (shouldAnimate) {
          lineStyle.transitionDuration = (immediate ? 0 : `${this.duration}s`);
        }
        if (lineHeight) {
          lineStyle.height = lineHeight + 'px';
          lineStyle.borderRedius = lineHeight;
        }
        this.lineStyle = lineStyle;
      });
    }
  },
  components: {
    tab
  }
};
</script>
<style lang="less">
@import url("../../styles/common/index.less");
@import url("../../styles/components/tabs.less");
</style>

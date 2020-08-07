<template>
  <div class="mview-reminder" v-show="visible" style="width:100%">
    <figure>
      <em class="reminder-icon-notice iconfont icon-tongzhi"></em>
      <div class="mview-reminder-wrap" ref="wrap">
        <div class="mview-reminder-content" ref="content"
       :style="contentStyle"
        :class="animationClass"
        @animationend = "onAnimationEnd"
        @webkitAnimationEnd = "onAnimationEnd"
        >
          <slot></slot>
        </div>
      </div>
      <em class="iconfont icon-shanchu1 reminder-icon-delete" @click="close"></em>
    </figure>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visible: true,
      firstRound: true,
      wrapWidth: 0,
      duration: 0,
      offsetWidth: 0,
      animationClass: ''
    };
  },
  props: {
    // 动画延长多久执行
    delay: {
      type: Number,
      default: 0.5
    },
    // 文字动画速度
    speed: {
      type: Number,
      default: 150
    }
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
      const { wrap, content } = this.$refs;
      const wrapWidth = wrap.getBoundingClientRect().width;
      const offsetWidth = content.getBoundingClientRect().width;
      this.wrapWidth = wrapWidth;
      this.offsetWidth = offsetWidth;
      this.duration = this.offsetWidth / this.speed;
      this.animationClass = 'animate';
    });
  },
  computed: {
    /**
     * contentStyle 内容样式
    */
    contentStyle () {
      let style = {
        paddingLeft: `${this.firstRound ? 0 : this.wrapWidth}px`,
        animationDelay: `${this.firstRound ? this.delay : 0}s`,
        animationDuration: `${this.duration}s`
      };
      return style;
    }
  },
  methods: {
    /**
     * onAnimationEnd 动画结束监听
     * */
    onAnimationEnd () {
      this.firstRound = false;
      this.duration = (this.offsetWidth + this.wrapWidth) / this.speed;
      this.animationClass = 'animate-infinite';
    },
    close () {
      this.visible = false;
    }
  }
};
</script>
<style lang="less">
@import url("../../styles/common/index.less");
@import url("../../styles/components/reminder.less");
</style>

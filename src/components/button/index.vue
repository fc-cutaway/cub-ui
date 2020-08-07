<template>
  <button  class="view-btn-ui view-btn-small"
    @click="handleClick"
    @touchstart="touchstart"
    @touchend="touchend"
    :status="computedStatus"
    :disabled="disabled"
    :class="buttonClass"
    :style="calStyle"
    >
      <span v-if="$slots.default">
        <slot></slot>
      </span>
  </button>
</template>
<script>
export default {
  name: 'ViewButton',
  props: {
    // 按钮类型: default | primary1 | primary2 |
    btnType: {
      type: String,
      default: 'default'
    },
    // 按钮尺寸类型:samll
    size: {
      type: String,
      default: 'small'
    },
    // 按钮状态: disabled | active
    status: {
      type: String,
      default: ''
    },
    // 是否开启点击效果
    effect: {
      type: Boolean,
      default: true
    },
    // 是否两行
    lines: {
      type: Number,
      default: 1
    },
    height: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      // 组件内部激活状态
      active: false
    };
  },
  computed: {
    calStyle () {
      const style = {};
      if (this.width) {
        style.width = window.px2rem(this.width) + 'rem';
      }
      if (this.height) {
        style.height = window.px2rem(this.height) + 'rem';
      }
      return style;
    },
    buttonClass () {
      const classes = [];
      // 按钮类型
      if (this.btnType) {
        classes.push(`view-btn-${this.btnType}`);
      } else {
        classes.push(`view-btn-default`);
      }
      // 按钮大小标识
      if (this.size) {
        classes.push(`view-btn-${this.size}`);
      } else {
        classes.push('view-btn-small');
      }
      // 换行
      if (this.lines === 2) {
        classes.push('view-btn-wrap');
      }
      return classes;
    },
    // 如果当前是组件内部激活的话，则显示激活状态，否则显示外部设置的状态
    computedStatus () {
      return this.active ? 'active' : this.status;
    },
    disabled () {
      return this.status === 'disabled';
    }
  },
  methods: {
    /**
     * 处理按下时，如果当前按钮是非禁用状态，并且按钮已经启用效果，在按下时添加激活效果
     */
    touchstart () {
      if (this.effect && !this.disabled) {
        this.active = true;
      }
    },
    /**
     * 与激活效果对应
    */
    touchend () {
      if (this.effect) {
        this.active = false;
      }
    },
    /**
     * 处理组件被点击
     * @param {Event} options 触发事件名称
    */
    handleClick (options) {
      options.buttonStatus = this.status;
      this.$emit('click', options);
    }
  },
  watch: {
    effect (value) {
      if (!value) {
        this.active = false;
      }
    }
  }
};
</script>
<style lang="less">
@import url("../../styles/common/index.less");
@import url("../../styles/components/button.less");
</style>

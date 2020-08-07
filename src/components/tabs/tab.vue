<template>
  <div class="view-tab" :style="tabStyle" :class="{'tab-active':isActive}">
    <span>
      <slot></slot>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    tabWidth: {
      default: 0,
      type: Number
    },
    isActive: {
      default: true,
      type: Boolean
    }
  },
  data () {
    return {
      name: '人民网'
    };
  },
  computed: {
    tabStyle () {
      const style = {};
      if (this.tabWidth) {
        style.flexBasis = `${this.tabWidth}%`;
      }
      return style;
    }
  }
};
</script>

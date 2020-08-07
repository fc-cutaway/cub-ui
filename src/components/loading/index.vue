<template>
  <div class="mview-loading" v-show="visible">
    <p class="mview-loading-content iconfont icon-loading rotate"></p>
  </div>
</template>
<script>
export default {
  data () {
    return {
    };
  },
  props: {
    visible: {
      default: false,
      type: Boolean
    }
  }
};
</script>
<style lang="less">
@import url("../../styles/common/index.less");
@import url("../../styles/components/loading.less");
</style>

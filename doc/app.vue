<template>
  <div id="app">
    <!-- header部分 -->
    <div class="header">
       <navcomponent/>
    </div>
    <div class="main clearfix">
      <sliderleft/>
      <sliderright/>
    </div>
  </div>
</template>
<script>
import navcomponent from './components/nav.vue';
import sliderleft from './components/sliderleft.vue';
import sliderright from './components/sliderright.vue';
export default {
  data () {
    return {
      name: '人民网'
    };
  },
  created () {
  },
  components: {
    navcomponent,
    sliderleft,
    sliderright
  }
};
</script>
<style lang="less" scoped>
</style>

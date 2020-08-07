<template>
  <div class="slider-right">
    <div class="slider-right-container">
      <doc></doc>
    </div>
  </div>
</template>
<script>
import doc from './doc.vue';
export default {
  data () {
    return {
      name: '人民网'
    };
  },
  components: {
    doc
  }
};
</script>
<style lang="less" scoped>
.slider-right{
  position:fixed;
  left:200px;
  top:60px;
  bottom:0;
  right:0;
  background:#F5F6F9;
  overflow:scroll;
  .slider-right-container{
    width:100%;
    padding-left:20px;
  }
}
</style>

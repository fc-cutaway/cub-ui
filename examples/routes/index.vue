<template>
  <div @click="goPage">
     <p v-for="(item,index) in name" :key="index" ref="itemEl" :data-url="'/'+item" :data-title="item" class="view-item">
        {{item}}<i class="iconfont icon-arrow view-icon-arrow"></i>
     </p>
  </div>
</template>
<script>
import { name } from '../config.js';
export default {
  data () {
    return {
      name: name
    };
  },
  created () {
  },
  methods: {
    goPage (e) {
      if (e.target.nodeName === 'P') {
        let title = e.target.getAttribute('data-title');
        this.$emit('changeTitle', title);
        this.$router.push({
          path: e.target.getAttribute('data-url')
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.view-item{
  display:block;
  height:1.2rem;
  line-height:1.2rem;
  font-size:0.4rem;
  text-align:center;
  padding-left:1rem;
  position: relative;
  font-size:0.5rem;
  &::after{
    position:absolute;
    content:'';
    left:0;
    bottom:0;
    width:100%;
    height:1px;
    background:#ccc;
    transform: scaleY(0.5);
  }
  .view-icon-arrow{
    float:right;
    padding-right:0.2rem;
    font-size:0.4rem;
  }
}
</style>

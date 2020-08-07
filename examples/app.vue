<template>
    <div id ="app">
      <div class="view-header">
          <p>
            <i class="iconfont icon-jiantou view-icon-back" v-if="showBackIcon" @click="goBack"></i>{{titleName}}
          </p>
      </div>
        <article class="view-body-main">
          <RouterView @changeTitle="changeTitle"/>
        </article>
    </div>
</template>
<script>
export default {
  data () {
    return {
      showBackIcon: false,
      titleName: 'cub-ui示例'
    };
  },
  watch: {
    $route (to) {
      if (to.path == '/') {
        this.showBackIcon = false;
        this.titleName = 'cub-ui示例';
      } else {
        this.showBackIcon = true;
      }
    }
  },
  methods: {
    changeTitle (title) {
      this.titleName = title;
    },
    goBack () {
      this.$router.back();
    }
  }
};
</script>
<style lang="less" scoped>
.view-header{
  text-align: center;
  font-size:0.5rem;
  height:1.1rem;
  line-height: 1.1rem;
  position: relative;
  // width:100%;
  z-index:100;
  background:#fff;
  &::after{
    position: absolute;
    content:'';
    left:0;
    bottom:0;
    width:100%;
    height:1px;
    transform:scaleY(0.5);
    background:#ccc;
  }
  .view-icon-back{
    display:block;
    float:left;
    padding:0 0.3rem;
    font-size:0.45rem;
  }
}
</style>

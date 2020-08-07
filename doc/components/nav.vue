<template>
  <div class="nav">
      <div class="nav-left">
        <span class="icon-ui"></span>
        <p class="ui-title">em-ui</p>
        <p class="ui-github" @click="goGithub">GitHub地址</p>
      </div>
      <div class="ui-version">version:{{version}}</div>
  </div>
</template>
<script>
export default {
  name: 'navcomponent',
  data () {
    return {
      version: '1.0.2'
    };
  },
  methods: {
    goGithub () {
      location.href = 'https://github.com/fengchun666666/mview-ui';
    }
  }
};
</script>
<style lang="less" scoped>
.ui-hover:hover{
  color:#51B996;
  cursor: pointer;
}
.nav{
  width:100%;
  height:60px;
  // line-height:60px;
  background:#01122A;
  position: relative;
  vertical-align: middle;
  .nav-left{
    line-height: 60px;
    margin-left:20px;
    .icon-ui{
      display:inline-block;
      vertical-align: middle;
      margin-left:16px;
      width:40px;
      height:40px;
      display:inline-block;
      background:url('../assets/ui.png');
      background-size:100% 100%;
    }
    .ui-title{
      vertical-align: middle;
      display:inline-block;
      padding-left:10px;
      font-size:18.5px;
      color:#fff;
      margin-bottom:0;
      &:hover{
        color:#51B996;
        cursor: pointer;
      }
    }
    .ui-github{
      color:#fff;
      display:inline-block;
      font-size:16px;
      margin-left:30%;
      &:hover{
        color:#51B996;
        cursor: pointer;
      }
    }
  }
  .ui-version{
    position: absolute;
    top:50%;
    transform: translateY(-50%);
    right:25px;
    padding:3px 10px;
    width:140px;
    font-size:16px;
    color:#fff;
    border:1px solid #fff;
    border-radius: 10px;
    text-align: center;
  }
}
</style>

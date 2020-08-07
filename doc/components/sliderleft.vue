<template>
  <div class="slider-left">
    <div class="slider-left-container" @click="goPage">
      <ul class="list-item">
        <li class="list-title">开发指南</li>
        <li target="introduce" :class="{'green-color':greenClass==='introduce'}">介绍</li>
        <li target="quickstart" :class="{'green-color':greenClass==='quickstart'}">快速上手</li>
      </ul>
       <ul class="list-item">
        <li class="list-title">基础组件</li>
        <li target="button" :class="{'green-color':greenClass==='button'}">按钮</li>
        <li target="dialog" :class="{'green-color':greenClass==='dialog'}">弹框</li>
        <li target="toast" :class="{'green-color':greenClass ==='toast'}">toast提示</li>
        <li target="loading" :class="{'green-color':greenClass === 'loading'}">loading加载</li>
        <li target="reminder" :class="{'green-color':greenClass === 'reminder'}">跑马灯</li>
        <li target="indexList" :class="{'green-color':greenClass === 'indexList'}">索引列表</li>
        <li target="keyboard" :class="{'green-color':greenClass === 'keyboard'}">键盘</li>
        <li target="scroller" :class="{'green-color':greenClass === 'scroller'}">下拉刷新/上拉加载</li>
        <li target="picker" :class="{'green-color':greenClass === 'picker'}">picker组件</li>
        <li target="tabs" :class="{'green-color':greenClass==='tabs'}">tabs组件</li>
        <li target="signature" :class="{'green-color':greenClass==='signature'}">signature签名组件</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      name: '侧边栏',
      greenClass: 'dialog'
    };
  },
  created () {
    this.greenClass = 'introduce';
  },
  methods: {
    goPage (e) {
      let el = e.target;
      let key = el.getAttribute('target');
      if (el.nodeName === 'LI' && key) {
        this.greenClass = key;
        this.bus.$emit('changeDoc', key);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.slider-left{
  position:fixed;
  top:60px;
  bottom:0;
  width:200px;
  background:#fff;
  overflow: scroll;
  box-shadow: 7px 0 7px -7px #000;
  .slider-left-container{
    width:100%;
    ul{
      margin-bottom:20px;
      .list-title{
        font-size:18px;
        color:#707E85;
        font-weight: 500;
        padding-left:20px;
      }
      li{
        text-align: left;
        padding-left:30px;
        font-size:13px;
        margin:15px 0;
        color:#34495e;
        &:hover{
          color:#51B996;
          cursor: pointer;
        }
      }
      .green-color{
        color:#51B996;
      }
    }
  }
}
</style>

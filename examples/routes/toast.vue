<template>
  <div class="toast-examle">
    <p class="toast-item">
      <Button size="middle" @click="showToast('type1')">Toast success</Button>
    </p>
     <p class="toast-item">
      <Button size="middle" @click="showToast('type2')">Toast loading</Button>
    </p>
     <p class="toast-item">
      <Button size="middle" @click="showToast('type3')">Toast warn</Button>
    </p>
    <p class="toast-item">
      <Button size="middle" @click="showToast('type4')">Toast fail</Button>
    </p>
    <p class="toast-item">
      <Button size="middle" @click="showToast('type5')">Toast no-mask</Button>
    </p>
    <p class="toast-item">
      <Button size="middle" @click="showToast('type6')">Toast no-icon</Button>
    </p>
  </div>
</template>
<script>
import Vue from 'vue';
import toast from '@/plugins/toast.js';
import { Button } from 'cubui';
export default {
  data () {
    return {
      name: '人民网'
    };
  },
  created () {
    Vue.use(toast);
    console.log(this);
  },
  methods: {
    showToast (type) {
      switch (type) {
        case 'type1':
          this.$toast({
            type: 'success',
            message: '提交成功!'
          });
          break;
        case 'type2':
          this.$toast({
            type: 'loading',
            message: '加载中...'
          });
          break;
        case 'type3':
          this.$toast({
            type: 'warn',
            message: '输入的信息错误!'
          });
          break;
        case 'type4':
          this.$toast({
            type: 'fail',
            message: '请求失败!'
          });
          break;
        case 'type5':
          this.$toast({
            type: 'fail',
            maskShow: false,
            message: '请求失败!'
          });
          break;
        case 'type6':
          this.$toast({
            message: '我的家乡在东北松花江上'
          });
      }
    }
  },
  components: {
    Button
  }
};
</script>
<style lang="less" scoped>
  .toast-examle{
    .toast-item{
      width:100%;
      padding:0.5rem 0;
      display:flex;
      -webkit-display:flex;
      justify-content: center;

    }
  }
</style>

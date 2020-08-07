<template>
    <div class="dialog-example">
        <p class="dialog-item">
           <Button size="middle" @click="showDialog('type1')">dialoy type-1</Button>
        </p>
         <p class="dialog-item">
           <Button size="middle" @click="showDialog('type2')">dialog type-2</Button>
        </p>
         <p class="dialog-item">
           <Button size="middle" @click="showDialog('type3')">dialog type-3</Button>
        </p>
         <p class="dialog-item">
           <Button size="middle" @click="showDialog('type4')">dialog type-4</Button>
        </p>
    </div>
</template>
<script>
import Vue from 'vue';
import dialog from '@/plugins/dialog.js';
import { Button } from 'cubui';
export default {
  data () {
    return {
      name: '人面昂',
      dialogConfig: {
        title: '标题',
        message: '人民网'
      }
    };
  },
  created () {
    Vue.use(dialog);
  },
  methods: {
    dialogShow () {
      this.$dialog({
        title: '标题',
        message: '你好吗？',
        leftButtonShow: false
      });
    },
    showDialog (type) {
      switch (type) {
        case 'type1':
          this.$dialog({
            message: '没有title弹框',
            leftFunc: () => {
              console.log('取消按钮点击事件');
            }
          });
          break;
        case 'type2':
          this.$dialog({
            title: '标题',
            message: '你还好吗？'
          });
          break;
        case 'type3':
          this.$dialog({
            title: '标题',
            message: '没有左侧按钮',
            leftButtonShow: false
          });
          break;
        case 'type4':
          this.$dialog({
            message: '四川大学人民网',
            leftButtonShow: false
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
.dialog-example{
  .dialog-item{
    width:100%;
    padding:0.5rem 0;
    display:flex;
    -webkit-display:flex;
    justify-content: center;
  }
}
</style>

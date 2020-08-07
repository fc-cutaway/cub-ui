<template>
  <div class="picker-example">
    <Button size="big" @click="btn1Click">{{currentValue}}</Button>
    <Button size="big" @click="btn2Click">{{timeValue}}</Button>
  </div>
</template>
<script>
import { Button } from 'cubui';
import Vue from 'vue';
import picker from '@/plugins/picker.js';
export default {
  data () {
    return {
      name: 'picker组件实例',
      visible: false,
      currentValue: ['斯温', '力量'],
      timeValue: ['1991', '01', '01'],
      value1: '',
      value2: '',
      pickerData: [{
        content: [
          '剧毒',
          '蚂蚁',
          '幽鬼',
          '斯温',
          '哈斯卡',
          '敌法师',
          '发条技师',
          '末日使者',
          '宙斯'
        ]
      },
      {
        content: [
          '智力',
          '力量',
          '敏捷'
        ]
      }]
    };
  },
  created () {
    Vue.use(picker);
  },
  methods: {
    btn1Click () {
      this.$picker({
        listData: this.pickerData,
        currentValue: this.currentValue,
        cancelClick: (value) => {
          this.currentValue = value;
        },
        sureClick: (value) => {
          this.currentValue = value;
        }
      });
    },
    btn2Click () {
      this.$picker({
        listData: this.pickerData,
        currentValue: this.timeValue,
        startTime: '1989-12-20',
        pickerType: 'time',
        cancelClick: (value) => {
          this.timeValue = value;
        },
        sureClick: (value) => {
          this.timeValue = value;
        }
      });
    }
  },
  components: {
    Button
  }
};
</script>
<style lang="less" scoped>
  .picker-example{
    text-align: center;
  }
</style>

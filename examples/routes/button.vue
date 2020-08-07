<template>
    <div class="app">
        <p class="btn-item">
          <Button @click="btnClick"  :effect="false" size="middle" :lines=line>Default</Button>
        </p>
        <p class="btn-item">
          <Button @click="btnClick"  :effect="true" size="middle" :lines=line>Default Effect</Button>
        </p>
        <p class="btn-item">
          <Button @click="btnClick" btnType="primary1"  :effect="false" size="middle" :lines=line>Outline Button </Button>
        </p>
        <p class="btn-item">
          <Button @click="btnClick" btnType="primary1"  :effect="true" size="middle" :lines=line>Outline Button Effect </Button>
        </p>
        <p class="btn-item">
          <Button @click="btnClick" status="disabled" btnType="primary1"  :effect="true" size="middle" :lines=line>desabled </Button>
        </p>
        <p class="btn-item">
          <Button @click="btnClick"  :effect="false" size="small" :lines=line>Small</Button>
        </p>
        <p class="btn-item">
          <Button @click="btnClick"  :effect="false" size="middle" :lines=line>Middle</Button>
        </p>
        <p class="btn-item">
          <Button @click="btnClick"  :effect="false" size="big" :lines=line>Big</Button>
        </p>
        <p class="btn-item">
          <Button :width="width" :height="height" @click="btnClick"  :effect="false" size="big" :lines=line>自定义按钮宽高</Button>
        </p>
    </div>
</template>
<script>
import { Button } from 'cubui';
export default {
  data () {
    return {
      name: '人面昂',
      line: 1,
      width: 150,
      height: 15
    };
  },
  created () {

  },
  methods: {
    btnClick (e) {
      console.log(e);
    }
  },
  components: {
    Button
  }
};
</script>
<style lang="less" scoped>
  .btn-item{
    text-align: center;
    display:flex;
    -webkit-display:flex;
    justify-content: center;
    align-items: center;
    padding:0.5rem 0;
  }
</style>

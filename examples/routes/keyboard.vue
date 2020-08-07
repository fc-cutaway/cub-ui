<template>
  <div class="keyboard-example">
    <div class="item">
       <Keyboard :switchInput="switchInput" :placeholder="placeHolderLimit" :keyboardConfig = 'keyboardType1' @valueChanged="valueChanged1"></Keyboard>
    </div>
    <div class="item">
       <Keyboard :placeholder ="placeHolder2" :keyboardConfig = "keyboardType2"></Keyboard>
    </div>
     <div class="item">
       <Keyboard :placeholder ="placeHolder3" :keyboardConfig = "keyboardType3"></Keyboard>
    </div>
     <div class="item">
       <Keyboard :placeholder ="placeHolder1" :keyboardConfig = "keyboardType1"></Keyboard>
    </div>
     <div class="item">
       <Keyboard :placeholder="placeHolder1" :keyboardConfig = 'keyboardType1'></Keyboard>
    </div>
  </div>
</template>
<script>
import { Keyboard } from 'cubui';
export default {
  data () {
    return {
      name: 'keyboard组件',
      placeHolderLimit: '最多只能输入6位',
      placeHolder1: '数字输入',
      placeHolder2: '字母键盘输入',
      placeHolder3: '字符键盘输入',
      keyboardType1: {
        type: 'number',
        rewriteKeys: {
          bottomLeft: {
            text: 'abc',
            type: 'action',
            forbidden: false
          },
          bottomRight: {
            text: '',
            type: 'action',
            forbidden: false
          }
        }
      },
      keyboardType2: {
        type: 'lower'
      },
      keyboardType3: {
        type: 'symbol'
      },
      switchInput: true
    };
  },
  methods: {
    valueChanged1 (data) {
      if (data.oldValue.length >= 5) {
        this.switchInput = false;
      } else {
        this.switchInput = true;
      }
      if (data.key === 'del') {
        this.switchInput = true;
      }
    },
    valueChanged (data) {
      console.log(data);
    }
  },
  components: {
    Keyboard
  }
};
</script>
<style scoped>
  .item{
    padding:40px 0;
  }
</style>

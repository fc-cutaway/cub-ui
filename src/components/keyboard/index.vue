<template>
 <transition name ="slide">
    <div class="mview-keyboard" :style = "keyboardStyle" v-show="visible">
    <div class="keyboard-container">
      <div class="keyboard-content"
        @touchstart = "touchStart"
        @touchmove = "touchMove"
        @touchend = "touchEnd"
        @touchcancel = "touchCancel"
      >
        <keynumber v-show = "type === 'number' ? true :false"
         />
        <keylower v-show = "type === 'lower' ? true :false"
          />
        <keyupper v-show = "type === 'upper' ? true :false"
          />
        <keysymbol v-show = "type === 'symbol' ? true :false"
          />
      </div>
    </div>
  </div>
 </transition>
</template>
<script>
import keynumber from './en-numbercase.vue';
import keylower from './en-lowercase.vue';
import keyupper from './en-uppercase.vue';
import keysymbol from './en-symbolcase.vue';
import keypanelMixin from './keypanel-mixin.js';
export default {
  data () {
    return {
      name: ''
    };
  },
  provide () {
    return {
      keyboard: this,
      inputkoardValue: ['cursor']
    };
  },
  props: {
    // 键盘类型:number
    type: {
      type: String,
      default: 'number'
    },
    // 键盘title
    title: {
      type: String,
      default: '安全键盘'
    },
    // 控制键盘是否可见
    visible: {
      type: Boolean,
      default: false
    },
    // 键盘遮住输入框上推的值
    bottom: {
      type: String,
      default: '-1'
    },
    // 数字键盘中配置底部按钮
    rewriteKeys: {
      type: Object,
      default () {
        return {
          bottomLeft: {
            text: '.',
            type: 'action',
            forbidden: true
          },
          bottomRight: {
            text: 'X',
            type: 'action',
            forbidden: true
          }
        };
      }
    }
  },
  computed: {
    keyboardStyle () {
      return {
        bottom: this.bottom
      };
    }
  },
  mixins: [keypanelMixin],
  components: {
    keynumber,
    keylower,
    keyupper,
    keysymbol
  }
};
</script>
<style lang="less">
@import url("../../styles/common/index.less");
@import url("../../styles/components/keyboard.less");
</style>

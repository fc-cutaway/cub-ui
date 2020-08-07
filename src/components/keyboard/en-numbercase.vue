<template>
  <div class="keyboard-number">
     <div class="keyboard-title">
        <span class="iconfont icon-jianpan keyboard-icon"></span>
        安全键盘
        <span class="iconfont icon-shanchu1  delete-icon" data-key="close" data-type="key"></span>
      </div>
    <ul>
      <li class="keyboard-key-box">
        <span class="keyboard-1px"  data-type='key' data-key="1">1</span>
        <span class="keyboard-1px"  data-type='key' data-key="2">2</span>
        <span class="keyboard-1px"  data-type='key' data-key="3">3</span>
        <span class="keyboard-1px"  data-type='key' data-key="4">4</span>
        <span class="keyboard-1px"  data-type='key' data-key="5">5</span>
        <span class="keyboard-1px"  data-type='key' data-key="6">6</span>
        <span class="keyboard-1px"  data-type='key' data-key="7">7</span>
        <span class="keyboard-1px"  data-type='key' data-key="8">8</span>
        <span class="keyboard-1px"  data-type='key' data-key="9">9</span>
        <span class="keyboard-1px"  data-type='key' :data-key="keyboard.rewriteKeys.bottomLeft.text" :data-forbidden = "keyboard.rewriteKeys.bottomLeft.forbidden">{{keyboard.rewriteKeys.bottomLeft.text}}</span>
        <span class="keyboard-1px"  data-type='key' data-key="0">0</span>
        <span class="keyboard-1px"  data-type='key' :data-key="keyboard.rewriteKeys.bottomRight.text" :data-forbidden = "keyboard.rewriteKeys.bottomRight.forbidden">{{keyboard.rewriteKeys.bottomRight.text}}</span>
      </li>
      <li class="keyboard-key-action">
        <span class="keyboard-1px"  data-type='key' data-key="del">
          <i class="key-del"></i>
        </span>
        <span class="key-ok keyboard-1px"  data-type='key' data-key="finish">完成</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'keynumber',
  inject: ['keyboard'],
  data () {
    return {
      name: '数字键盘'
    };
  },
  created () {
  }
};
</script>

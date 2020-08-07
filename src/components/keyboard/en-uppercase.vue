<template>
  <div class="keyboard-lowercase">
    <div class="keyboard-title">
        <span class="iconfont icon-jianpan keyboard-icon"></span>
        安全键盘
        <span class="iconfont icon-shanchu1  delete-icon" data-key="close" data-type="key"></span>
    </div>
    <div class="keyboard-key-box">
      <p class="letter">
           <span data-key="Q" data-type="key">Q</span>
          <span data-key="W" data-type="key">W</span>
          <span data-key="E" data-type="key">E</span>
          <span data-key="R" data-type="key">R</span>
          <span data-key="T" data-type="key">T</span>
          <span data-key="Y" data-type="key">Y</span>
          <span data-key="U" data-type="key">U</span>
          <span data-key="I" datat-type="key">I</span>
          <span data-key="O" data-type="key">O</span>
          <span data-key="P" data-type="key">P</span>
      </p>
      <p class="letter">
          <span data-key="A" data-type="key">A</span>
          <span data-key="S" data-type="key">S</span>
          <span data-key="D" data-type="key">D</span>
          <span data-key="F" data-type="key">F</span>
          <span data-key="G" data-type="key">G</span>
          <span data-key="H" data-type="key">H</span>
          <span data-key="J" data-type="key">J</span>
          <span data-key="K" data-type="key">K</span>
          <span data-key="L" data-type="key">L</span>
      </p>
      <p class="letter">
          <span class="ui-change-key iconfont icon-jiantou1" data-key="lower" data-type="key"></span>
           <span data-key="Z" data-type="key">Z</span>
          <span data-key="X" data-type="key">X</span>
          <span data-key="C" data-type="key">C</span>
          <span data-key="V" data-type="key">V</span>
          <span data-key="B" data-type="key">B</span>
          <span data-key="N" data-type="key">N</span>
          <span data-key="M" data-type="key">M</span>
          <span style="position:relative" data-key="del" data-type="key">
            <i class="key-del"></i>
          </span>
      </p>
      <p class="letter">
        <span data-key="123" data-type="key">123</span>
        <span data-key="symbol" data-type="key">#+-</span>
        <span data-key="space" data-type="key">空格</span>
        <span data-key="finish" data-type="key">完成</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      name: '大写数字键盘'
    };
  }
};
</script>

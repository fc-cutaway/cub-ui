<template>
  <div class="keyboard-lowercase">
    <div class="keyboard-title">
        <span class="iconfont icon-jianpan keyboard-icon"></span>
        安全键盘
        <span class="iconfont icon-shanchu1  delete-icon" data-key="close" data-type="key"></span>
    </div>
    <div class="keyboard-key-box">
      <p class="letter">
          <span data-key="q" data-type="key">q</span>
          <span data-key="w" data-type="key">w</span>
          <span data-key="e" data-type="key">e</span>
          <span data-key="r" data-type="key">r</span>
          <span data-key="t" data-type="key">t</span>
          <span data-key="y" data-type="key">y</span>
          <span data-key="u" data-type="key">u</span>
          <span data-key="i" data-type="key">i</span>
          <span data-key="o" data-type="key">o</span>
          <span data-key="p" data-type="key">p</span>
      </p>
      <p class="letter">
          <span data-key="a" data-type="key">a</span>
          <span data-key="s" data-type="key">s</span>
          <span data-key="d" data-type="key">d</span>
          <span data-key="f" data-type="key">f</span>
          <span data-key="g" data-type="key">g</span>
          <span data-key="h" data-type="key">h</span>
          <span data-key="j" data-type="key">j</span>
          <span data-key="k" data-type="key">k</span>
          <span data-key="l" data-type="key">l</span>
      </p>
      <p class="letter">
          <span class="ui-change-key iconfont icon-jiantou1" data-key="upper" data-type="key"></span>
          <span data-key="z" data-type="key">z</span>
          <span data-key="x" data-type="key">x</span>
          <span data-key="c" data-type="key">c</span>
          <span data-key="v" data-type="key">v</span>
          <span data-key="b" data-type="key">b</span>
          <span data-key="n" data-type="key">n</span>
          <span data-key="m" data-type="key">m</span>
          <span style="position:relative" class="ui-keyboadrd-del" data-key="del" data-type="key">
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
      name: '小写数字键盘'
    };
  }
};
</script>

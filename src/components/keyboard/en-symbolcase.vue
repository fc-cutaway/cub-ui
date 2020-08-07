<template>
  <div class="keyboard-lowercase">
    <div class="keyboard-title">
        <span class="iconfont icon-jianpan keyboard-icon"></span>
        安全键盘
        <span class="iconfont icon-shanchu1  delete-icon" data-key="close" data-type="key"></span>
    </div>
    <div class="keyboard-key-box">
      <p class="letter">
       <span data-key ="!" data-type="key">!</span>
       <span data-key="@" data-type="key">@</span>
       <span data-key="#" data-type="key">#</span>
       <span data-key="$" data-type="key">$</span>
       <span data-key="%" data-type="key">%</span>
       <span data-key="^" data-type="key">^</span>
       <span data-key="&" data-type='key' >&</span>
       <span data-key='*' data-type='key'>*</span>
       <span data-key='(' data-type='key'>(</span>
       <span data-key=')' data-type='key'>)</span>
     </p>
     <p class='letter'>
       <span data-key='signle' data-type='key'>'</span>
       <span data-key='&quot;' data-type='key'>&quot;</span>
       <span data-key='=' data-type='key'>=</span>
       <span data-key='_' data-type='key'>_</span>
       <span data-key=':' data-type='key'>:</span>
       <span data-key=';' data-type='key'>;</span>
       <span data-key='?' data-type='key'>?</span>
       <span data-key='~' data-type='key'>~</span>
       <span data-key='|' data-type='key'>|</span>
       <span data-key='.' data-type='key'>.</span>
     </p>
     <p class='letter'>
      <span data-key='+' data-type='key'>+</span>
      <span data-key='-' data-type='key'>-</span>
      <span data-key='\' data-type='key'>\</span>
      <span data-key='/' data-type='key'>/</span>
      <span data-key='[' data-type='key'>[</span>
      <span data-key=']' data-type='key'>]</span>
      <span data-key='{' data-type='key'>{</span>
      <span data-key='}' data-type='key'>}</span>
      <span style='position:relative' data-key='del' data-type='key'>
        <i class='key-del'></i>
      </span>
     </p>
     <p class='letter'>
       <span data-key='123' data-type='key'>123</span>
       <span data-key='abc' data-type='key'>abc</span>
       <span data-key='.' data-type='key'>.</span>
       <span data-key=',' data-type='key'>,</span>
       <span data-key='<' data-type='key'>&lt;</span>
       <span data-key=">" data-type='key'>&gt;</span>
       <span data-key="finish" data-type='key'>完成</span>
     </p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      name: '符号键盘'
    };
  }
};
</script>

<template>
  <div class="tab-content"><slot></slot></div>
</template>
<script>
export default {
  data () {
    return {
      content: 'tab的content内容'
    };
  }
};
</script>

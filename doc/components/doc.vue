<template>
  <div class="doc">
     <vue-markdown v-html="md"></vue-markdown>
  </div>
</template>
<script>
import VueMarkdown from 'vue-markdown';
import containdocmd from '../docmd/index.js';
export default {
  data () {
    return {
      md: containdocmd['introduce']
    };
  },
  created () {
    this.md = containdocmd['introduce'];
    // key值与文档返回的字段保持一致
    this.bus.$on('changeDoc', (key) => {
      console.log(key);
      this.md = containdocmd[key];
    });
  },
  components: {
    VueMarkdown
  }
};
</script>
<style lang="less" scoped>

</style>

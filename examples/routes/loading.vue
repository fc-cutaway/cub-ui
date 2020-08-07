<template>
  <div class="loading-example">
    <p class="loading-item" style="text-align:center">
      <Button @click="showLoading">Loading Show</Button>
    </p>
  </div>
</template>
<script>
import { Button } from 'cubui';
import Vue from 'vue';
import loading from '@/plugins/loading.js';
export default {
  data () {
    return {
    };
  },
  created () {
    Vue.use(loading);
  },
  methods: {
    showLoading () {
      this.$showLoading();
      setTimeout(() => {
        this.$closeLoading();
      }, 3000);
    }
  },
  components: {
    Button
  }
};
</script>
<style lang="less" scoped>

</style>

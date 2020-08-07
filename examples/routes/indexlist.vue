<template>
  <div class="citySelect-example">
    <Indexlist @selected="selected" :data="cityData"/>
  </div>
</template>
<script>
import indexListJson from '../../mock/indexlist.json';
import { Indexlist } from 'cubui';
import Vue from 'vue';
import toast from '@/plugins/toast.js';
import loading from '@/plugins/loading.js';
export default {
  data () {
    return {
      name: 'citySlect',
      cityData: []
    };
  },
  created () {
    Vue.use(loading);
    Vue.use(toast);
    this.$showLoading();
    setTimeout(() => {
      this.cityData = indexListJson;
      this.$closeLoading();
    }, 1000);
  },
  methods: {
    selected (selectvalue) {
      this.$toast({
        message: JSON.stringify(selectvalue)
      });
    }
  },
  components: {
    Indexlist
  }
};
</script>

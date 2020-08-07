<template>
  <div class="pullrefresh-example">
    <Pullrefresh ref="pullrefresh" :triggerUp="pullTrigger"/>
  </div>
</template>
<script>
import { Pullrefresh } from 'cubui';
export default {
  data () {
    return {
      name: '我的家乡在东北松花江上'
    };
  },
  methods: {
    pullTrigger () {
      setTimeout(() => {
        console.log(3453535);
        this.$refs.pullrefresh.success();
      }, 2000);
    }
  },
  components: {
    Pullrefresh
  }
};
</script>

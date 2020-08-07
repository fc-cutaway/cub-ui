<template>
  <div class="example-tabs">
    <Tabs :titleContent="titleContent" :enableScroll="enableScroll" @tabClick="tabClick"></Tabs>
  </div>
</template>
<script>
import { Tabs } from 'cubui';
export default {
  data () {
    return {
      titleContent: ['张三', '李四', '王二麻子', '小张', '小明'],
      enableScroll: true
    };
  },
  methods: {
    tabClick (index) {
      console.log(index);
    }
  },
  components: {
    Tabs
  }
};
</script>

<template>
  <div class="reminder-example">
    <Reminder>我的家乡在东北松花江上！</Reminder>
  </div>
</template>
<script>
import { Reminder } from 'cubui';
export default {
  data () {
    return {
      name: 'reminder-example'
    };
  },
  components: {
    Reminder
  }
};
</script>
<style lang="less" scoped>
.reminder-example{
  width:100%;
  padding:0.2rem 0.1rem;
  margin:1rem 0;
}
</style>

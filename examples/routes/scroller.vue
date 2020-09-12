<template>
  <div class="example-scroller">
    <Scroller :enableDown="enableDown" ref="scroller" @dropRefresh="dropRefresh" @pullMore="pullMore" :scrollHeight="scrollHeight">
      <div class="container" slot="default">
       <p v-for="(item,index) in list" :key="index">{{item}}</p>
      </div>
    </Scroller>
  </div>
</template>
<script>
import { Scroller } from 'cubui';
export default {
  data () {
    return {
      list: [],
      enableUp: true,
      scrollHeight: 1200,
      enableDown: true
    };
  },
  created () {
    this.init();
  },
  mounted () {
    this.$nextTick(() => {
      this._scrollHeight();
    });
  },
  methods: {
    init () {
      this.list = [];
      this.addPage();
    },
    _scrollHeight () {
      let clientHeight = document.documentElement.clientHeight;
      let headerEl = document.getElementsByClassName('view-header')[0];
      this.scrollHeight = clientHeight - headerEl.clientHeight;
    },
    addPage () {
      const seq = this.list.length + 1;
      for (let i = 0; i < 10; i++) {
        this.list.push(`当前是${seq + i}行`);
      }
    },
    dropRefresh () {
      setTimeout(() => {
        this.init();
        this.$refs.scroller.dropSuccess();
        // this.$refs.scroller.dropFailure();
      }, 2000);
    },
    pullMore () {
      setTimeout(() => {
        this.addPage();
        this.$refs.scroller.pullSuccess();
      }, 1000);
    }
  },
  components: {
    Scroller
  }
};
</script>
<style lang="less" scoped>
.example-scroller{
  .container{
    text-align:center;
  }
}
</style>

<template>
  <div class="signature-example">
    <Signature @clear="clear" @confirm="confirm"/>
    <img :src="signatureImg" class="signature-img" alt="">
  </div>
</template>
<script>
import { Signature } from 'cubui';
export default {
  data () {
    return {
      signatureImg: ''
    };
  },
  methods: {
    clear () {
      this.signatureImg = '';
    },
    confirm (imgUrl) {
      this.signatureImg = imgUrl;
    }
  },
  components: {
    Signature
  }
};
</script>
<style lang="less" scoped>
  .signature-example{
    text-align: center;
    .signature-img{
      width:40%;
    }
  }
</style>

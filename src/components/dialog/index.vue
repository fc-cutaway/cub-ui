<template>
  <div class="view-dialog" v-show="visible">
    <div class="view-mask-dialog" @touchmove="onMove"></div>
    <div class="view-dialog-position">
      <div class="view-dialog-main view-dialog-center">
        <p class="view-dialog-title" v-show="config.title">{{config.title}}</p>
        <div class="view-dialog-content" :style="config.styleAlign">
          {{config.message}}
        </div>
        <div class="view-dialog-btns">
          <span class="dialog-btn dialog-left-btn" @click="btnLiftClick" v-show="config.leftButtonShow">{{config.leftButton}}</span>
          <span class="dialog-btn dialog-right-btn" @click ="btnRightClick" >{{config.rightButton}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'view-dialog',
  data () {
    return {
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    config: {
      type: Object,
      default: function () {
        return {
          title: '',
          message: '',
          leftButton: '取消',
          rightButton: '确定',
          leftButtonShow: true,
          align: 'center'
        };
      }
    }
  },
  computed: {
    styleAlign () {
      return `text-align:${this.align};`;
    }
  },
  methods: {
    onMove (e) {
      if (!this.scrollable) {
        e.preventDefault();
      }
    },
    btnLiftClick () {
      this.$emit('leftFunc');
    },
    btnRightClick () {
      this.$emit('rightFunc');
    }
  }
};
</script>
<style lang="less">
@import url("../../styles/common/index.less");
@import url("../../styles/components/dialog.less");
</style>

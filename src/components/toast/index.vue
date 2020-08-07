<template>
  <div class="view-toast" v-show="visible">
    <div class="view-toast-mask" v-show="config.maskShow"></div>
    <div class="view-toast-container">
      <div class="view-toast-content">
        <p class="iconfont view-toast-icon" :class="toastClass" v-show="iconShow"></p>
        <p class="view-toast-message">{{config.message}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ViewToast',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    config: {
      type: Object,
      default: function () {
        return {
          maskShow: true,
          type: 'warn',
          iconShow: true,
          message: ''
        };
      }
    }
  },
  data () {
    return {
      // typeClass: toast类型 对应添加icon图标
      typeClass: {
        'warn': 'icon-2',
        'fail': 'icon-fail_icon',
        'success': 'icon-chenggongtishi',
        'loading': 'icon-loading1'
      }
    };
  },
  computed: {
    // toastClass添加图标类型
    toastClass () {
      const classes = [];
      let iconType = this.typeClass[this.config.type];
      if (iconType != undefined) {
        classes.push(iconType);
      }
      // type为loading类型 添加旋转动画
      if (this.config.type === 'loading') {
        classes.push('rotate');
      }
      return classes;
    },
    // iconShow图标是否显示
    iconShow () {
      if (this.typeClass[this.config.type] == undefined || !this.config.iconShow) {
        return false;
      }
      return true;
    }
  }
};
</script>
<style lang="less" scoped>
@import url("../../styles/common/index.less");
@import url("../../styles/components/toast.less");
</style>

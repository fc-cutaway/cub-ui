/**
 * toast 插件
*/
import toastComponent from '@/components/toast';
let $vm;
const defaultConfig = {
  maskShow: true,
  iconShow: true,
  message: '',
  // 弹框显示时长
  duration: 1500
};
const toast = {
  toastCreate (config) {
    let _config = null;
    $vm.config = {};
    if (typeof config === 'string') {
      _config = Object.assign({}, defaultConfig, { message: config });
    } else {
      _config = Object.assign({}, defaultConfig, config);
    }
    $vm.config = _config;
    $vm.visible = true;
    if ($vm.visible) {
      setTimeout(() => {
        $vm.visible = false;
      }, _config.duration);
    }
  }
};
export default {
  install (Vue, options) {
    if (!$vm) {
      const ToastPlugin = Vue.extend(toastComponent);
      $vm = new ToastPlugin({
        el: document.createElement('div')
      });
      document.body.appendChild($vm.$el);
    }
    if (!Vue.$toast) {
      Vue.$toast = toast.toastCreate;
    }
    Vue.prototype.$toast = Vue.$toast;
  }
};

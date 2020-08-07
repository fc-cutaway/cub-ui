/**
 * loading 插件
*/
import loadingComponent from '@/components/loading';
let $vm;
const loading = {
  showLoading () {
    $vm.visible = true;
  },
  closeLoading () {
    $vm.visible = false;
  }
};
export default {
  install (Vue, options) {
    if (!$vm) {
      const LoadingPlugin = Vue.extend(loadingComponent);
      $vm = new LoadingPlugin({
        el: document.createElement('div')
      });
      document.body.appendChild($vm.$el);
    }
    if (!Vue.$showLoading) {
      Vue.$showLoading = loading.showLoading;
      Vue.$closeLoading = loading.closeLoading;
    }
    Vue.prototype.$showLoading = Vue.$showLoading;
    Vue.prototype.$closeLoading = Vue.$closeLoading;
  }
};

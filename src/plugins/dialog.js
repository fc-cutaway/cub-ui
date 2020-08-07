/**
 * dialog 插件
*/
import dialogComponent from '@/components/dialog';
let $vm;
function loop () {

}
const defaultConfig = {
  title: '',
  message: '',
  leftButton: '取消',
  rightButton: '确定',
  align: 'center',
  leftButtonShow: true,
  leftFunc: loop,
  rightFunc: loop

};
const dialog = {
  dialogCreate (config) {
    let _config = null;
    $vm.config = {};
    if (typeof config === 'string') {
      _config = Object.assign({}, defaultConfig, { message: config });
    } else {
      _config = Object.assign({}, defaultConfig, config);
    }
    $vm.config = _config;
    $vm.$once('leftFunc', () => {
      _config.leftFunc();
      $vm.visible = false;
    });
    $vm.$once('rightFunc', () => {
      _config.rightFunc();
      $vm.visible = false;
    });
    $vm.visible = true;
  }
};
export default {
  install (Vue, options) {
    if (!$vm) {
      const DialogPlugin = Vue.extend(dialogComponent);
      $vm = new DialogPlugin({
        el: document.createElement('div')
      });
      document.body.appendChild($vm.$el);
    }
    if (!Vue.$dialog) {
      Vue.$dialog = dialog.dialogCreate;
    }
    Vue.prototype.$dialog = Vue.$dialog;
  }
};

/**
 * picker插件
*/
import pickerComponent from '@/components/picker';
let $vm;
function loop () {
}
const defaultConfig = {
  cancelText: '取消',
  pickerTitle: 'picker标题',
  sureText: '确定',
  maskVisible: true,
  pickerType: '',
  visible: true,
  cancelClick: loop,
  sureClick: loop
};
const picker = {
  pickerCreate (config) {
    let _config = null;
    _config = Object.assign({}, defaultConfig, config);
    showPicker(_config);
  }
};
function showPicker (config) {
  for (const key of Object.keys(config)) {
    $vm[key] = config[key];
  }
  // 删除对象中绑定的多余事件
  $vm.$once('close', (value) => {
    $vm.visible = false;
    config.cancelClick(value);
    delete $vm._events.close;
    delete $vm._events.sure;
  });
  $vm.$once('sure', (value) => {
    $vm.visible = false;
    config.sureClick(value);
    delete $vm._events.sure;
    delete $vm._events.close;
  });
  $vm.visible = true;
  $vm.createMask();
  $vm.maskFunc();
  return $vm;
}
export default {
  install (Vue, options) {
    if (!$vm) {
      const PickerPlugin = Vue.extend(pickerComponent);
      $vm = new PickerPlugin({
        el: document.createElement('div')
      });
      document.body.appendChild($vm.$el);
    }
    if (!Vue.$picker) {
      Vue.$picker = picker.pickerCreate;
    }
    Vue.prototype.$picker = Vue.$picker;
  }
};

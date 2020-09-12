// 将keyboard组件封装成插件 提供给输入框input-keyboard.vue组件调用
import Keyboard from './keyboard.vue';
let installed = false;
let $vm = null;
let lastShowKeyboardConfig = {
  valueChange: loop,
  keyPress: loop
};
function loop () {}
const keyboard = {
  show (config) {
    const defaultConfig = {
      visible: true,
      type: 'number',
      title: '安全键盘',
      rewriteKeys: {
        bottomLeft: {
          text: 'abc',
          type: 'action',
          forbidden: false
        },
        bottomRight: {
          text: '.',
          type: 'action',
          forbidden: false
        }
      },
      valueChange: loop,
      keyPress: loop,
      keyboardHide: loop
    };
    // 合并传入的参数
    const _config = Object.assign(defaultConfig, config);
    $vm.$off('keypress', lastShowKeyboardConfig.keyPress);
    $vm.$on('keypress', _config.keyPress);
    for (const key of Object.keys(_config)) {
      $vm[key] = _config[key];
    }
    lastShowKeyboardConfig = _config;
    return $vm;
  },
  hide () {
    $vm.visible = false;
    return $vm;
  }
};
export default {
  install (Vue, props = { visible: false }) {
    if (installed) {
      return;
    }
    installed = true;
    const KeyboardComponent = Vue.extend(Keyboard);
    if (!$vm) {
      $vm = new KeyboardComponent({
        el: document.createElement('div'),
        propsData: {
          ...props
        }
      });
      document.body.appendChild($vm.$el);
    };
    Vue.mixin({
      created () {
      },
      methods: {
        showKeyBoard (config) {
          return keyboard.show(config);
        },
        hideKeyBoard () {
          return keyboard.hide();
        }
      }
    });
  }
};

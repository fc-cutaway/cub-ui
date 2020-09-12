<template>
  <div class="input-keyboard">
    <div class="key-board-input">
        <div class="input-keyboard-label">{{label}}</div>
        <div class="input-keyboard-content" @click="inputClick">
          <p class="keyboard-placeholder" data-placeholder="placeholder" v-show="showPlaceHolder">{{placeholder}}</p>
          <p class="keyboard-value"
             :class="{'keyboard-input-focus':focus ==true}"
          >
            <!-- <span>2</span>
            <span>4</span>
            <span class="keyboard-cursor">5</span>
            <span>4</span>
            <span>4</span> -->
            <span
            v-for ="(item,index) in inputValueArr"
            :key = "index"
            :index = "index"
            :class = "{'keyboard-cursor':(item == 'cursor')}"
            >{{item == 'cursor'?'':item}}</span>
          </p>
        </div>
      <div class="iconfont icon-shanchu delete-all-icon" v-show="showDelect" @touchend="deleteAll"></div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import KeyboardPlugin from './keyboard.js';
KeyboardPlugin.install(Vue);
window.keyOld = '';
export default {
  data () {
    return {
      name: '',
      inputContainer: '',
      showPlaceHolder: true,
      focus: false,
      inputValueArr: ['cursor'],
      showDelect: false,
      oldkeyboardValue: '', // 键盘按下前输入框的值
      keyboardValue: '', // 输入框当前的值
      newkeyboardValue: ''// 键盘按下后输入框的值
    };
  },
  props: {
    // 键盘中配置参数 参考keyboard/index.vue文件
    keyboardConfig: {
      type: Object,
      default: function () {
        return {
          type: 'number',
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
          }
        };
      }
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    label: {
      type: String,
      default: '请输入:'
    },
    showDeleteIcon: {
      type: Boolean,
      default: true
    },
    // 包含键盘输入框的元素Id
    containerId: {
      type: String,
      default: ''
    },
    // 开关控制键盘是否允许输入值
    switchInput: {
      type: Boolean,
      default: true
    }
  },
  computed: {
  },
  mounted () {
    if (!this.containerId) {
      this.inputContainer = document.body;
    } else {
      this.inputContainer = document.getElementById(this.containerId);
    }
    this.$on('keypress', this.keyPress);
    this.$nextTick(() => {
      document.addEventListener('touchend', this.checkArea, true);
    });
  },
  created () {
  },
  methods: {
    /**
     * inputClick 输入框绑定点击事件
    */
    inputClick (e) {
      if (!this.focus) {
        if (window.keyOld) {
          window.keyOld.focus = false;
          window.keyOld.showDelect = false;
          if (window.keyOld.keyboardValue === '' && window.keyOld.placeholder) {
            window.keyOld.showPlaceHolder = true;
          }
        }
        this.focus = true;
        this.showPlaceHolder = false;
        this.showMyKeyboard();
        this.fitView();
      }
      window.keyOld = this;
      this.cursorMove(e);
    },
    /**
     * cursorMove 光标移动
    */
    cursorMove (e) {
      // 获取点击的位置
      const index = e.target.getAttribute('index');
      // 获取旧光标的位置
      const oldIndex = this.inputValueArr.indexOf('cursor');
      // 删除旧光标
      this.inputValueArr.splice(oldIndex, 1);
      // 添加新光标
      if (e.target.tagName.toUpperCase() === 'P') {
        this.inputValueArr.splice(this.inputValueArr.length, 0, 'cursor');
      } else {
        this.inputValueArr.splice(index, 0, 'cursor');
      }
    },
    /**
     * showMyKeyboard 展示键盘
    */
    showMyKeyboard () {
      const defaultConfig = {
        type: 'number',
        visible: true
      };
      const config = Object.assign(defaultConfig, this.keyboardConfig, { keyPress: this.keyPress });
      this.keyboardComponent = this.showKeyBoard(config);
    },
    /**
     * keyPress 键盘中按键
    */
    keyPress (data) {
      let key = data.key;
      this.oldkeyboardValue = this.keyboardValue;
      let cursorIndex = this.inputValueArr.indexOf('cursor');
      switch (key) {
        // 空格键
        case 'space':
          return;
        // 完成按钮
        case 'finish':
          this.hideKeyboard();
          return;
        // 删除按钮
        case 'del':
          if (cursorIndex === 0) {
            return false;
          }
          this.$emit('valueChanged', { oldValue: this.oldkeyboardValue, key: key });
          this.inputValueArr.splice(cursorIndex - 1, 1);
          this.keyboardValue = this.keyboardValue.split('');
          this.keyboardValue.splice(cursorIndex - 1, 1);
          this.keyboardValue = this.keyboardValue.join('');
          if (!this.keyboardValue && this.placeholder) {
            this.showPlaceHolder = true;
          }
          break;
        // 关闭按钮
        case 'close':
          this.hideKeyboard();
          return;
        // 切换数字键盘
        case '123':
          this.keyboardComponent.type = 'number';
          return;
        // 切换小写数字键盘
        case 'abc':
          this.keyboardComponent.type = 'lower';
          return;
        // 切换大写数字键盘
        case 'upper':
          this.keyboardComponent.type = 'upper';
          return;
        // 切换小写键盘
        case 'lower':
          this.keyboardComponent.type = 'lower';
          return;
        case 'symbol':
          this.keyboardComponent.type = 'symbol';
          return;
        default:
          // 默认执行内容
          this.showPlaceHolder = false;
          this.$emit('valueChanged', { oldValue: this.oldkeyboardValue, key: key });
          if (!this.switchInput) {
            return;
          }
          this.inputValueArr.splice(cursorIndex, 0, key);
          this.keyboardValue += key;
          this.newkeyboardValue = this.keyboardValue;
          this.$emit('keyboardValue', { value: this.keyboardValue });
      }
      if (this.showDeleteIcon) {
        if (this.keyboardValue != '') {
          this.showDelect = true;
        } else {
          this.showDelect = false;
        }
      }
    },
    /**
     * hideKeyboard 关闭键盘
    */
    hideKeyboard () {
      this.focus = false;
      if (this.keyboardComponent) {
        this.keyboardComponent.visible = false;
      }
      if (!this.keyboardValue && this.placeholder) {
        this.showPlaceHolder = true;
      }
      this.showDelect = false;
      this.restoreView();
    },
    /**
     * deleteAll 删除全部输入
    */
    deleteAll () {
      this.inputValueArr = ['cursor'];
      this.keyboardValue = '';
      this.showDelect = false;
      if (this.placeholder) {
        this.showPlaceHolder = true;
      }
    },
    /**
     * checkArea 校验点击区域是否在键盘上或者输入框上
    */
    checkArea (e) {
      this.checkEl(e.target);
    },
    /**
     * checkEl 检查元素是否在输入框内或键盘内
    */
    checkEl (el) {
      let elName = el.tagName.toUpperCase();
      // 表示点击区域不在输入框内和键盘上
      if (elName === 'HTML' || !el || elName === 'BODY') {
        this.hideKeyboard();
        return;
      }
      let classString = el.className;
      if (classString.indexOf('key-board-input') >= 0 || classString.indexOf('mview-keyboard') >= 0) {
        // 表示点击区域在输入框内或者键盘上不隐藏键盘；
      } else {
        this.checkEl(el.parentElement);
      }
    },
    /**
     * fitView 调整当前组件的位置避免当前组件避免被遮挡 el当前被点击的输入框
     *
    */
    fitView () {
      this.$nextTick(() => {
        setTimeout(() => { // 添加定时器 在动画执行结束后 上推整个document
          if (this.keyboardComponent != undefined && this.keyboardComponent.visible) {
            let inputBottom = this.$el.getBoundingClientRect().bottom;
            let keyboardTop = this.keyboardComponent.$el.getBoundingClientRect().top;
            let diffy = inputBottom - keyboardTop + 2;
            if (diffy > 0) {
              this.inputContainer.style.position = 'relative';
              this.inputContainer.style.top = `${-diffy}px`;
            }
          }
        }, 350);
      });
    },
    /**
     *restoreView 恢复键盘视图
    */
    restoreView () {
      this.inputContainer.style.position = 'static';
      this.inputContainer.style.top = '0px';
    }
  },
  components: {
  }
};
</script>

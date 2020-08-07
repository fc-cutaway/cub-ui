const KEY_TYPES = ['key', 'action', 'type'];
// 保存当前被点击的元素
let target = '';
const getKeyEl = function (el) {
  if (!el) {
    return null;
  }
  const tagName = el.tagName.toUpperCase();
  if (tagName == 'BODY' || tagName == 'HTML' || tagName == 'div') {
    return null;
  }
  // 向父级元素查找
  if (tagName != 'SPAN' || !KEY_TYPES.includes(el.dataset.type)) {
    return getKeyEl(el.parentElement);
  }
  return el;
};
export default {
  data () {
    return {

    };
  },
  methods: {
    //  键盘中
    touchStart (e) {
      e.preventDefault();
      target = getKeyEl(e.target);
      if (!target || target.dataset.forbidden) {
        return;
      }
      this.addActive(target);
      this.$emit('keypress', {
        key: target.dataset.key,
        type: target.dataset.type
      });
    },
    touchMove () {

    },
    touchEnd () {
      if (!target || target.dataset.forbidden) {
        return;
      }
      this.removeActive(target);
    },
    touchCancel () {

    },
    // 按钮按下时添加class --- active
    addActive (el) {
      el.classList.add('active');
    },
    // 按钮松开时移除class --- active
    removeActive (el) {
      el.classList.remove('active');
    }
  }
};

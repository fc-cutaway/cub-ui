import Vue from 'vue';
import App from './app.vue';
import './css/splendor.min.css';
import '../src/styles/common/reset.less';
let bus = new Vue();
Vue.prototype.bus = bus;
window.app = new Vue({
  render: h => h(App)
}).$mount('#app');

/*eslint-disable*/
//引入组件样式---view-style.css
import '../src/styles/index.less';
import '@/flexible.js';
import '@/index.js';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import {name} from './config.js';
Vue.use(VueRouter);
/**
 * 获取routeConfig的配置
*/
function routeConigFn(){
  let routes = [
    {
      path:'/',
      component:resolve => require(['./routes/index.vue'],resolve)
    }
  ]
  for(let i = 0;i<name.length;i++){
    let obj = {};
    obj.path = '/'+name[i];
    obj.component = resolve => require(['./routes/'+name[i]+'.vue'],resolve);
    routes.push(obj);
  }
  return routes;
};
let routesConfig = routeConigFn();
const router = new VueRouter({
  routes:routesConfig
});
window.app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

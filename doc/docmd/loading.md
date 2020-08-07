# Loading 组件
### 使用示例
``` javascript
通过插件方式引入
import Vue from 'vue';
import {LoadingPlugin} from 'cub-ui';
created(){
  Vue.use(LoadingPlugin);
}
```
#### 展示loading
``` javascript
this.$showLoading();
```
#### 隐藏loading
``` javascript
this.$closeLoading();
```

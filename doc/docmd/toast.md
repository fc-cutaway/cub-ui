# Toast 组件
### 引入
``` javascript
通过插件的方式引入
import {ToastPlugin} from 'cub-ui';
import Vue from 'vue';
created(){
  Vue.use(ToastPlugin);
}
直接调用:
this.$toast({
  type:'success',
  message:'提交成功!'
});
````
### 参数列表
| 参数 | 类型 | 说明 |是否必填(Y/N)|默认值 | 可选值 |
|------|------|------|------|------|------|
|{}|Object|参数对象|Y|{type:'success',message:'提交成功'}|--|
|-{}对象中属性参数值-|
|type|String|toast类型|N|warn|success</br>loading</br>warn</br>fail|
|message|String|toast内容|Y|''|--|
|iconShow|Boolean|是否显示图标|N|true|true</br>false|
|maskShow|Boolean|是否显示遮罩层|N|true|true</br>false|

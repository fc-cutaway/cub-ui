# Dialog 组件
### 使用示例
``` javascript 
import {DialogPlugin} from 'cub-ui';
import Vue from 'vue';
created(){
  Vue.use(DialogPlugin);
}
直接调用:
  this.$dialog({
    title:'标题',
    message:'确认输入的信息无误!'
  });
```
### 参数列表
| 参数 | 类型 | 说明 |是否必填(Y/N)|默认值 | 可选值 |
|------|------|------|------|------|------|
|{}|Object|参数对象|Y|{&nbsp;&nbsp;&nbsp;title:'',message:'',</br>&nbsp;&nbsp;&nbsp;leftButton:'取消',rightButton:'确定',</br>&nbsp;&nbsp;&nbsp;align:'center',</br>&nbsp;&nbsp;&nbsp;leftButtonShow:true,</br>&nbsp;&nbsp;&nbsp;leftFunc:()=>{},rightFunc:()=>{}</br>}|
|-{}对象中属性参数值-|
|title|String|弹框title|N|''|--|
|message|String|弹框内容|Y|''|--|
|align|String|内容对齐方式|N|center|left</br>center</br>right|
|leftButton|String|左侧按钮内容|N||取消|--|
|rightButton|String|右侧按钮内容|N|确定|--|
|leftButtonShow|Boolean|是否显示左侧按钮|N|true|--|
|leftFunc|Function|左侧按钮回调函数|N|()=>{}|--|
|rightFunc|Function|右侧按钮回调函数|N|()=>{}|--|

# picker组件
### 使用示例
```javascript
通过插件的方式引入
import {PickerPlugin} from 'cub-ui';
import Vue from 'vue';
export default{
  data(){
    return {
      currentValue: [],
      pickerData: [{
        content: [
          '剧毒',
          '蚂蚁',
          '幽鬼',
          '斯温'
        ]
      }]
    }
  }
}
created(){
  Vue.use(PickerPlugin);
}
直接调用：
this.$picker({
    visible: true,
        currentValue: this.currentValue,
        listData: this.pickerData,
        cancelClick: (value) => {
          console.log(value);
          this.currentValue = value;
        },
        sureClick: (value) => {
          console.log(value);
          this.currentValue = value;
        }
});
```
## 参数列表
| 参数 | 类型 | 说明 |是否必填(Y/N)|默认值 | 可选值 |
|------|------|------|------|------|------|
|{}|Object|参数为对象|Y|{}|--|
|-{}-对象中属性参数值-|
|pickerTitle|String|picker的title|N|picker标题|--|
|cancelText|String|左侧按钮文案|N|取消|--|
|sureText|String|右侧按钮文案|N|确定|--|
|maskVisible|Boolean|picker调起遮罩层是否显示|N|true|--|
|pickerType|String|picker组件类型|N|''|--|
|listData|Array|picker中值|Y|[]|--|
|cancelClick|Function|picker中左侧按钮点击事件触发|Y|返回选中值[]|--|
|sureClick|Function|picker中右侧按钮点击事件触发|Y|返回选中值[]|--|

#### listData 数据结构示例
````javascript
listData:[{
        content: [
          '剧毒',
          '蚂蚁',
          '幽鬼',
          '斯温'
        ]
      }]
````

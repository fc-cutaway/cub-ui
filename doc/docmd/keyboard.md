# 键盘组件
### 使用示例
```javascript
方法一: import {Keyboard} from 'cub-ui';
<Keyboard></Keyboard>
components:{
  Keyboard
}
```
### 参数列表
|参数|类型|说明|是否必填(Y/N)|默认值|可选值|
|------|------|------|------|------|------|
|placeholder|String|输入提示|N|--|--|
|keyboardConfig|Object|键盘配置|N|见注释|--|
|valueChanged|Function|输入值变化的回调方法|N|--|--|
|keyboardValue|Function|键盘按下的回调|N|--|--|



### 注释
````javascript
  keyboardConfig:{
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
        }
  forbidden属性取值为false,true,表示当键盘类型为number时；底部自定义两个按钮是否禁止
````

# Button 组件

### 引入

``` javascript
import {Button } from 'cub-ui';
components:{
  Button
}
<Button></Button>
```

### 参数列表


| 参数 | 类型 | 说明 |是否必填(Y/N)| 默认值 | 可选值 |
|------|------|------|------|------|------|
|btnType|String|按钮类型|N|default|default</br>primary|
|size|String|尺寸大小|N|small|small</br>middle</br>big|
|status|String|按钮状态|N|''|disabled</br>active|
|effect|Boolean|是否开启点击效果|N|true|true</br>false|
|line|Number|是否换行|N|1|1</br>2|
|width|Number|按钮宽度|N|0|--|
|height|Number|按钮高度|N|0|--|

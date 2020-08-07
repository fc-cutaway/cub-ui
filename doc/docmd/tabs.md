# tabs 组件
### 引入
``` javascript
方法-：import {Tabs} from 'cub-ui';
components:{
  Tabs
}
<Tabs><Tabs>
```
### 参数列表
| 参数 | 类型 | 说明 | 是否必填(Y/N) | 默认值 | 可选值 |
|------|------|------|------|------|------|
|titleContent|Array|tabs内容|Y|[]|[]|
|lineWidth|Number|底部line|N|0|0|
|lineHeight|Number|底部line高度|N|3|--|
|color|String|底部线条颜色|N|#e4393c|--|
|duration|Number|切换tab动画时间|N|0.3|--|
|enableScroll|Boolean|tab切换是否居中|N|true|--|
|activeIndex|Number|当前激活的tab|N|0|--|

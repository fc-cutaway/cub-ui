# IndexList 组件
### 使用示例
```javascript
方式一: import {Indexlist} from 'cub-ui';
<Indexlist @selected="selected" :data="data"></Indexlist>
components:{
  Indexlist
}
methods:{
  selected(selectValue){
    console.log(selectValue);
  }
}
```
### 参数列表
|参数|类型|说明|是否必填(Y/N)|默认值|可选值|
|------|------|------|------|------|------|
|selected|Function|选中的回调函数|N|--|--|
|data|Array|列表数据|N|[]|--|


```javascript
data参数示例:
[
  {
    "label": "A",
    "items": [
      { "label":"安康", "value":1},
      { "label":"阿克苏", "value":2},
      { "label":"阿拉善", "value":3},
      { "label":"阿勒泰","value":4},
      { "label":"安庆","value":5}
    ]
  }, {
    "label": "B",
    "items": [
      { "label": "北京", "value": 1 },
      { "label": "上海", "value": 2 },
      { "label": "保定", "value": 3 },
      { "label": "包头", "value": 4 },
      { "label": "大连", "value": 5 },
      { "label": "宝鸡", "value": 6 }
    ]
  }]
  ```

# 签名 组件
### 引用
``` javascript
方法一: {Signature} from 'cub-ui';
components:{
  Signature
}
<Signature @clear="clearFunc" @confirm="confirmFunc"></Signature>
```

### 参数列表
|参数|类型|说明|是否必填(Y/N)|默认值|可选值|
|------|------|------|------|------|------|
|unSupportTel|String|不支持canvas描述语|N|对不起，当前浏览器不支持Canvas,无法使用本空件|--|
|lineWidth|Number|线的宽度|N|2|--|
|strokeStyle|String|线的颜色|N|#000|--|
|type|String|签名确认返回图片的格式|N|png|--|
|clear|Function|清除签名回调|N|--|--|
|confirm|Function|确认签名回调|N|--|--|

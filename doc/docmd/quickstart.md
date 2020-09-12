# 快速开始

### 通过npm 安装

``` javascript
npm install cub-ui --save 或者 yarn add cub-ui
```

``` javascript
全局引入样式 
import 'cub-ui/lib/style/cmui.css';
按需加载实现:
  npm install babel-plugin-component --save-dev;
  .babelrc文件配置：
  "plugins":[
    ["component",{
        "libraryName":"cub-ui",
        "styleLibrary":{
        "name":"style"
      }
    }]
  ]
例如:
  方式一: import {Button } from 'cub-ui';
  方式二: import Button from 'cub-ui/lib/button.js';
  方式三: import {Button} from 'cub-ui/lib/cubui.js';
```

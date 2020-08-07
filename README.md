# 说明文档

## 使用

## 加入贡献

### 一、 初始化开发

```bash
# 1. 初始化
  cd cub-ui && npm i 或者 cnpm i

# 2. 启动文档编写服务
  npm run server:doc

# 3. 启动example服务
  npm run server:example

# 到这里，就已经可以开始开发了。

# 4. 运行单元测试，并监听代码变化持续执行单元测试
  npm run watch:test

# 5. 构建测试环境包
  npm run build:test

# 6. 构建生成环境包
  npm run build:prd

# 二、目录结构

## 作为该项目的开发者，主要需要关注的目录有三个:

  1. src:源码目录
  2. doc:文档目录
  3. examples:组件示例目录--开发时引入到组件示例中查看结果；

# 其中src目录下包含:

  components:组件目录，下面的每一个组件是一个单独的目录
  images:公共图片
  plugins:插件目录，将组件封装成插件的调用形式
  styles:样式目录
  utils:工具目录
  flexible.js 适配js
  index.js 组件输出js,
  lib:组件输出目录(执行npm run test or npm run prd 生成lib文件夹)

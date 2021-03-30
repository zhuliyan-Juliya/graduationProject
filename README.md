# graduation project

使用 webpack4.x + Vue 全家桶搭建人事管理系统

    本系统有两种用户：企业员工、系统管理员。使用系统时，企业员工只需要登录便能查询、浏览他们所需要的信息；系统管理员要登录验证才能进入系统去修改信息，其中，管理员有权限对员工资料的查找、编辑、新建、删除。根据网站的特点，需要完成的主要的功能如下：登录功能、信息管理模块、考勤管理模块、薪资管理模块、奖惩管理模块、招聘管理模块、培训管理模块。

## 技术栈

> vue（axios、vuex、vue-router）、webpack、elementUI、Echarts、Less

## 启动步骤

1. 安装包

```bash
yarn install
```

2. 启动

```bash
yarn run dev || yarn dev

# 关于启动命令来源，可以查看 package.json 文件 这个文件 scripts 属性中就是可执行的命令
```

## 项目结构

[tree文档](https://www.runoob.com/linux/linux-comm-tree.html)

> tree /F > text.txt    打印树目录命令

```bash
│  .gitignore				# git忽略列表
│  babel.config.js			# babel插件配置文件
│  README.md				# 文档
│  webpack.common.js		# webpack 基础配置文件
│  webpack.dev.js			# webpack 测试服配置文件
│  webpack.prod.js			# webpack 正式服配置文件
│  
├─.vscode
│      settings.json		# vscode 编辑器配置文件
│      
├─dist						# 打包之后的文件夹
├─node_modules				# 包文件夹
│                  
└─src						# 源码文件夹
    │  App.vue					# 入口vue文件
    │  index.html				# 入口html文件
    │  index.js					# 入口js文件
    │  
    ├─assets				# 静态资源文件夹
    │  ├─css					# css
    │  │      
    │  ├─images					# 图片
    │  │          
    │  └─js						# js
    │          
    ├─axios					# 接口配置与接口列表
    │      
    ├─components			# 子组件列表
    │          
    ├─mixins				# vue混入
    │      
    ├─router 				# 路由
    │      
    ├─store					# vue状态管理器
    │      
    └─views					# 页面

```

## 特色功能

### ES6 代码转化成 ES5 代码

- babel-loader @babel/core @babel/preset-env

- babel-loader 只会将 ES6/7/8 语法转换成 ES5 语法，但是对新的 API 不会转化

- @babel/polyfill 按需引入 core-js@2 @babel/runtime-corejs2


### sass less stylus 转 css

- sass-loader node-sass dart-sass stylus stylus-loader less less-loader

- 3. 解析.vue 文件

- 4. 解析图片，字体等资源

- 5. 自动添加 css 各浏览器厂商的前缀

- 6. 代码热更新

- 7. 资源预加载

- 8. 每次构建代码之前清楚之前生成的代码

- 9. 定义环境变量


### 区分不同的开发环境

  webpack.dev.js 开发环境使用
  webpack.prod.js 生产环境使用
  webpack.common.js 公共配置

#### 开发环境

1. 不需要压缩代码
2. 需要热更新
3. css 不需要提取到 css 文件中
4. sourceMap
5. ....

#### 生产环境

1. 压缩代码
2. 不需要热更新
3. 提取 css，压缩 css 文件
4. sourceMap
5. 构建前清除上一次的构建
6. ....

- babel-loader 只会将 ES6/7/8 语法转换为 ES5 语法, 但是对新 api 并不会转换
  我们可以通过 babel-polyfill 对一些不支持顶语法的客户端提供新语法的实现

- sass-loader, dart-sass 主要是将 scss/sass 语法转为 css
- css-loader 主要是解析 css 文件
- style-loader 主要是将 css 解析到 HTML 页面的 style 上

- file-loader 解析文件 url, 并将文件复制到输出的目录中
- url-loader 功能与 file-loader 类似，如果文件小于限制的大小。则会返回 base64 编码。否则与 file-loader 类似。

- vue-loader 用于解析.vue 文件
- vue-template-compiler 用于编译模板
- cache-loader 用于缓存 loader 编译的结果
- thread-loader 使用 worker 池来运行 loader, 每个 worker 都是一个 node.js 进程

- 重点
  require.context(directory, useSubdirectories, regExp)
  接收三个参数：
  directory：说明需要检索的目录
  useSubdirectories：是否检索子目录
  regExp: 匹配文件的正则表达式,一般是文件名
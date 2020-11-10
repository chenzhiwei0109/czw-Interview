# 面试题
[[toc]]
[TOC]
## webpack运行方式

三种:

global

webpack index.js

local

npx webpack index.js

scripts

npm run xx

webpack默认有一套配置，工程打包需要自己配置webpack.config.js,自定义默认配置

```
npx webpack --config aaa.js
```

出口path不写会默认配置dist，path需要path.resovle(__dirname,'bundle')   //path是绝对路径,打包到bundle文件里

webpack-cli使我们能在命令行使用webpack命令


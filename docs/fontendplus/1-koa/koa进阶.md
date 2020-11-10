# webpack配置进阶

## koa配置开发热加载

```js
"server": "nodemon ./src/index.js"
```

```bash
cnpm i webpack webpack-cli -D
```

```bash
cnpm i -D clean-webpack-plugin webpack-node-externals @babel/core  @babel/node @babel/preset-env babel-loader cross-env
//webpack-node-externals	不处理nodemodules的文件
//@babel/core babel核心	
//@babel/preset 支持新特性
//@babel/node
//babel-loader 处理babel的插件
//cross-env 合并
```

```js
"start": "nodemon --exec babel-node src/index.js",
```

```json
.babelrc
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "current"
        }
      }
    ]
  ]
}

```

## 调试webpack

```js
npx node --inspect-brk ./node_modules/.bin/webpack --inline --progress
```

## 打包优化

- splitChunksPlugin避免重复引用依赖

```js
const webpackMerge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config.base')
     // uglifyjs不支持es6 
const TerserWebpackPlugin = require('terser-webpack-plugin')

const webpackConfig = webpackMerge(baseWebpackConfig, {
  mode: 'production',
  stats: { children: false, warnings: false },

  // 生产环境
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 3,
          enforce: true
        }
      }
    }
  }
})

module.exports = webpackConfig
```

cross-env保证跨平台配置正确。

### 清空dist

```js
npm i rimraf -D 
```

## 


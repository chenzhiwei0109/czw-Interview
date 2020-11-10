---
sidebarDepth: 2
---
# 框架里的Webpack
[[toc]]
[TOC]
## react

react针对小白用户隐藏，如果是老手，执行react.inject；

## vuecli

### vue.config.js

<https://cli.vuejs.org/zh/config/#vue-config-js>

#### 打包后生成的文件夹名字

```js
module.exports = {
  outputDir: 'mydist',
}
```

#### 出入口配置

```js
module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: 'src/index/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk(类库)。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    subpage: 'src/subpage/main.js'
  }
}
```

#### css.requireModuleExtension

```js
module.exports = {
  css: {
    // 是否使用css分离插件 ExtractTextPlugin 生产环境下是true,开发环境下是false
    //extract: false,

    // 是否开启 CSS source map？
    sourceMap: false,

    // 为预处理器的 loader 传递自定义选项。比如传递给
    // sass-loader 时，使用 `{ sass: { ... } }`。
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/common.scss";`,
      },
    },
    
    // true时引入....mudule.css不会影响其他组件
    // 为所有的 CSS 及其预处理文件开启 CSS Modules。
    // 这个选项不会影响 `*.vue` 文件。
		//默认情况true下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块
    requireModuleExtension: false,
  }
}

```

#### configwebpack

配置webpack原生配置

该对象将会被 [webpack-merge](https://github.com/survivejs/webpack-merge) 合并入最终的 webpack 配置。

```js
// vue.config.js
module.exports = {
  configureWebpack: {
    devServer:{//他打包时也会去static目录找内容
      contentBase:[path.resolve(__dirname,'static')]
    }
  }
}
```






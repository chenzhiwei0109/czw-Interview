# 	webpack核心概念

## 1 什么是loader?

**webpack本身不知道对一些非js文件如何处理，但是loader知道,他帮助我们解析这些非js的文件**

webpack默认只会处理js文件，而像css、png、scss、vue文件都需要相应的loader进行加载。

loader执行顺序从下到上从右到左执行顺序

**例子：图片打包**

npm install file-loader -D

```js
var imgs = require('./img.jpg')
// import avatar from './img.jpg'
var img = new Image();
img.src =  imgs;
div.append(img)
```

```
module.exports={
	module:{
		rules:[{
			test:/\.jpg$/,   //遇到符合.jpg结尾，就使用file-loader
			use:{
				loader:'file-loader'
			}
		}]
	}
}
```

```js
npm run build 
```

流程：index.js打包： npm run bundle:执行 webpack命令，他会去查找webpack.config.js，默认处理js,但是jpg文件不知道怎么办，在module里告诉他去求助file-loader。

file-loader底层帮我们做的事情：

- 把图片(txt、jpg什么的都可以)移动到dist目录，然后修改名字(可以自定义)，

- 生成文件 file.png，输出到输出目录并返回 public URL。 

  ```
  "/public/path/0dcbbaa7013869e351f.png"
  ```

  

**vue**

```
import Header from './a.vue'
```

```
module.exports = {
	module:{
		rules:[
		{
		test:/\.vue$/,
		use:{
		loader:'vue-loader'
		}
		}
		]
	}
}
```

## 2 使用loader打包静态图片

### file-loader

```
npm install --save-dev file-loader
```

**打包图片名字不变-占位符placeholder**

<https://www.webpackjs.com/loaders/file-loader/#placeholders>

options参数里配置

```js
module.exports = {
	module:{
		rules:[
			{
				test:/\.jpg$/,
                use:{
                    loader:'file-loader',
                    options:{	//placeholder 占位符  [name][hash].[ext]
                        name:'[name][hash].[ext]', //老图片名字配合哈希值和后缀,hash用来缓存
                        outputPath:'imgs/'  //打包到dist/imgs文件
                    }
                }
				
			}
		]
	}
}
```

### url-loader

`url-loader` 功能类似于 [`file-loader`](https://github.com/webpack-contrib/file-loader)，但是在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL。

**好处：小图可以减少http请求次数**

**坏处：如果图片过大，加载时间会变多，base64格式图片体积增加了1/3.**

会创建一个eval()执行语句然后创建一个base6形式

```
npm install url-loader --save-dev
```

```js
module.exports = {
    module:{
        rules:[
            {
                test:/\.(png|jgp|gif)$/,
                use:{
                    loader:'url-loader'
                    options:{
                    //placeholder 占位符
                    name:'[name][hash].[ext]', //老图片名字配合哈希值和后缀,hash用来做hash对比 
                    outputPath:'imgs/',  //打包到dist/imgs文件
                    limit:2048  //图片小于2kb，就
                	}	 
           		}
            }
        ]
    }
}
```

## 3 使用loader打包样式文件

### css文件处理

<https://www.webpackjs.com/loaders/css-loader/>

> css-loader帮我们分析出几个cssloader之间的关系最后合并这些css文件
>
> style-loader会把合并的css挂载到header里

```
npm install style-loader css-loader -D
```

```
rules:[
    {
        test:/\.css$/,
        use:['style-loader','css-loader']
    }
    }
]
```

图片大小变小，需要样式修饰图片

index.css

```
@import './xxx.css'
```

index.js

```
import './index.css';
```

### scss文件处理

```
npm install sass-loader node-sass --save-dev
```

```
div{
	div1{
		width:100px;
		height:200px
	}
}
```

```
import './index.scss'
```

```
module.exports={
	module:{
		rules:[
			{
				test:/\.scss$/,
				use:['style-loader','css-loader','sass-loader']  //右到左
			}
		]
	}
}
```

### css3前缀

使用**postcss-loader**时他需要去使用autoprefixer插件。

```bash
npm i -D postcss-loader
```

使用**autoprefixer**  plugins插件

```
npm install autoprefixer -D
```

**postcss.config.js**

```js
module.exports = {
  plugins: [
      require('autoprefixer')
  ],
}
```

**webpack.config.js**

```js
module.exports={
	module:{
		rules:[
			{
				test: /\.(css|scss)$/,
				use:['style-loader','css-loader','sass-loader','postcss-loader']  //右到左
			}
		]
	}
}
```

### 常用配置项

css-loader常用配置项

- `importLoaders: 1` 是在`css-loader` 之后指定1个数量的loader（即 postcss-loader）来处理import进来的资源
- mudules:true  开启css模块化,防止模块化的耦合冲突。

```js
rules:[
	{
		test:/\.scss$/,
		use:[
			'style-loader',
			{
				loader:'css-loader',
				options:{
					importLoaders:2    //import引入的scss文件在引入之前可能不走前两个loader,希望				 						//在index.scss里引入的xx.scss也去走前两个loaderloader.
					modules:true   // 开启样式模块化。
               	 }
                },
			'sass-loader',
			'postcss-loader'
		]
	}
]
```

modules:true   // 后应该

```
import './xxx.css'
img.classList.add('avatar')
```

改成

```
import style from './index.css'
img.classList.add(style.avatar)
```

### 打包字体文件

iconfont

```js
import './index.scss'
var root = document.getElementById('root')
root.innerHTML="<div class='iconfont icon-xxxx'>abc</div>"
```

```
rules:[
	{
		test:/\.(eot|ttf|svg)$/,
		use:{
			loader:'file-loader'
		}
	}
]
```

###  资料

<https://www.webpackjs.com/guides/asset-management/>

[加载数据](https://www.webpackjs.com/guides/asset-management/#加载数据)

## 4 plugin管理输出

<https://www.webpackjs.com/guides/output-management/>

在webpack允许的某个时刻自动帮你做的事情,比如刚打包的某个时刻，

### HtmlWebpackPlugin

> **该插件将在打包结束后生成一个 HTML5 文件，并把打包生成的结果自动引入到html文件。** 

<https://www.webpackjs.com/plugins/html-webpack-plugin/>

```
npm install --save-dev html-webpack-plugin
```

```js
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var webpackConfig = {
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js'
  },
  plugins: [new HtmlWebpackPlugin()]
};
```

**这将会产生一个包含以下内容的文件 `dist/index.html`：**

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>webpack App</title>
  </head>
  <body>
    <script src="index_bundle.js"></script>
  </body>
</html>
```

**自动生成html里有相应的配置**

```js
plugins: [
    new HtmlWebpackPlugin(
        template:'src/index.html'
    )
]
```

### cleanWebpackPlugin

> 打包之前时自动删除上次打包的内容

```shell
npm install clean-webpack-plguin -D
```

```
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
```

```js
plugins: [
    new CleanWebpackPlugin()
]
```

## 5 入口出口配置

**入口默认输出到main.js**

```
module.exports = {
	entry:'./src/index.js'等价于  entry {  main: './src/index.js'}
}
```

**打包多文件**

```js
module.exports = {
	entry:{
		main:'./index.js',
		sub:'./index.js'
	},
	output:{
		filename:'[name].js',
		path:path.resolve(__dirname,'dist');
	}
}
```

**publicPath-打包的js需要对应cdn地址**

```js
	output:{
        publicPath:'http://cdn.cn'
		filename:'[name].js',
		path:path.resolve(__dirname,'dist');
	}
```

这样所有引入的js前面都会添加一个cdn地址

## 6 SourceMap

<https://www.webpackjs.com/configuration/devtool/>

>打包完毕后可以找到出错的地方,开发环境默认添加他。
>
>SourceMap是个映射关系vlq编码集合。能够知道报错的地方。

```
module.exports={
	mode:'development',
	devtool:'none'  //报错位置出错
}
```

```
module.exports={
	mode:'development',
	devtool:'inline-source-map'  //sorcemap文件会变成base64字符串，被嵌入到main.js里
	devtool:'source-map'  //会在dist文件生成一个source-map文件，精确到哪一行哪一个点
	devtool:'inline-cheap-source-map'  //只告诉我行就可以，不会管loader和第三方模块的错
	devtool:'inline--module-cheap-source-map'  //只告诉我行就可以，也会管第三方模块的错
}
```

**sorcemap**:生成.map文件

**cheap**:只告诉我行就可以。

**inline**:sorce-map文件变成base64字符串嵌入main.js

**module**:sorcemap文件也管loader和第三方模块的错

**eval**:以eval形式生成sorcemap对应关系，这种方式执行效率最快，但是针对复杂代码，他提升不全

开发环境:cheap-module-eval-source-map

生产环境：cheap-mpdule-source-map

## 7 webpackdevServer

每次改变代码，都需要手动npm run build，然后手动打开index.html

更改源代码，自动修改:

**方法1**

webpack监听文件变化，自动重新打包，但是不会自动刷新。

```js
"watch": "webpack --watch",
npm run watch
```

**方法2**

重新打包，自动打开，重新刷新浏览器，开启web服务器。

webpack内置devServer

所有来自 `dist/` 目录的文件都做 gzip 压缩和提供为服务：

```js
module.exports={
    devServer:{
        contentBase:path.join(__dirname, "dist"),
        open:true,
        compress: true,
        port: 9000，
        proxy:{ //跨域代理
        '/api':'http://localhost:3000'
    	},
        proxy:{
            '/api':{
                target:'http://mall-pre.springboot.cn',
                changeOrigin:true,
                pathRewrite:{
                    '/api':''
                }
            }
        }
    }
}

```

```
"server":"webpack-dev-server"
```

**方法3node使用webpack**

express配合webpackDevMiddleware

```
"server":"node server.js"
```

```
npm install express webpack-dev-middleware -D
```

```
output:{
	publicPath:'/',
	//.....
}
```

package.json同级server.js

```js
const express = require('express');
const webpack = require('webpack'); //引入webpack库
const webpackDevMiddleware = require('webpack-dev-middleware') // 可以监听打包变化
const config = require('./webpack.config.js');
const complier = webpack(config) // 编译

const app = express();

app.use(webpackDevMiddleware(complier,{  //文件发送改变，就会重新运行，打包生成的就是这个path
	publicPath:config.output.publicPath
}))

app.listen(3000,()=>{
	console.log(1)
})
```

## 8.热模块替换HMR

Hot Module Replacement

```shell
"start":"webpack-dev-server"
```

webpack.config.js

只有更新的内容被替换，类似ajax那种不刷新页面。

```js
const webpack = require('webpack');

devServer:{
	hot:true,
	hotOnly:true, //即使hmr不生效，浏览器也不会自动刷新。
}
plugins:[
	new webpack.HotModuleReplacementPlugin();
]
```

#### accept方法

两个模块，如果一个模块数据改变，不能影响其他模块的变更数据。

```js

import counter from './counter';
import number from './number';

counter();
number();

//实现js需要这样。但是引入css文件不需要写，因为css-loader帮我们实现了这个。vue写代码也有这个效果。vue-loader也内置了这个,或者babelpresess也会有。
if(module.hot) { 
	module.hot.accept('./number', () => {  //如果number文件变化，就执行后面这个函数
		document.body.removeChild(document.getElementById('number'));
		number();
	})
}
```

如果我们在项目引入一些比较偏的数据文件，需要手动写module.hot.accept

#### 资料

<https://www.webpackjs.com/plugins/hot-module-replacement-plugin/>

热模块底层实现：<https://www.webpackjs.com/concepts/hot-module-replacement/>

## 9 bable

vue和react会生成es5原生代码。

<https://www.babeljs.cn/setup#installation>

```
devserver打包生成的文件在内存里，看不见，需要run build打开
```

```
npm install --save-dev babel-loader @babel/core
```

babel-loader:打包使用的工具

babel/core:babel识别js内容，转换成AST抽象语法树然后把语法树编译成向下兼容的代码

```
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
```

node_modules的代码是第三方代码，没必要做转，他们给我们做了



babel-loader并不会把es6翻译成es5,需要babel/preset-env。他有一些转换的翻译规则

```
npm install @babel/preset-env --save-dev
```

.`babelrc` 

```
{
  "presets": ["@babel/preset-env"]
}
```

或者：

```js
{
    	test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
             presets: ["@babel/preset-env"]
        }
}
```

### polyfill

webpack4下面如果在babelrc设置了        useBuiltIns: 'usage' ,就没有必要在业务代码引入bablepollify了。

需要babel pollifyll做低版本补充；

```
npm install --save @babel/polyfill
```

在代码运行之前引入

src/index.js最顶部



```
import "@babel/polyfill";
```

**按需引入**

但是main.js变特别大。需要按需引入：

```
{
    	test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
             presets: ["@babel/preset-env",{
             	useBuiltIns:'usage'，//按需引入
                "targets": {
                    "edge": "17",
                    "firefox": "60",
                    "chrome": "67", 
                    "safari": "11.1",
                },
             }]
        }
}
```

配置属性:

<https://www.babeljs.cn/docs/usage>

pollify会污染全局环境

**解决全局污染问题**:

transform-runtime

<https://www.babeljs.cn/docs/babel-plugin-transform-runtime>

```
npm install --save @babel/runtime

npm install --save-dev @babel/plugin-transform-runtime
```

不需要再index.js里引入

业务代码只需要配proeseess,并且引入就可以，这个插件会以闭包的形式引入，不污染

```
{
    	test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
            "plugins": [[
            	"@babel/plugin-transform-runtime",
                "absoluteRuntime": false,
                "corejs": 2,   //改成2需要安装npm install --save @babel/runtime-corejs2
                "helpers": true,
                "regenerator": true,
                "useESModules": false,
            ]]

        }
}
```

### bablerc

解决babel配置项问题过多

.bablerc

```
{
	"plugins": [["@babel/plugin-transform-runtime", {
	"corejs": 2,
    "helpers": true,
    "regenerator": true,
    "useESModules": false
	}]]
}
```

### 总结：

我们希望借助babel把es6代码转换成es5代码，需要在官网的设置里找webpack，让我们代码支持es6->es5,但是有些promise和map需要在低版本浏览器注入，需要引入babel pollifil,并在参数里配置 useBuilt。

但是官网这种配置解决的是业务代码。所以我们需要在官网找transform runtime进行操作。需要把corejs从false改成2，这样才会把不存在的方法打包进main.js并且需要额外安装包 runtime-corejs2


# TS

## wepback配置

### TS开发环境搭建

安装typescript并初始化配置

```bash
npm i typescript -g
tsc --init
npm init -y
```

编写测试代码，./src/index.ts

```ts
const msg = "typescript!";
function sayHello(msg) {
	return "hello, " + msg;
}
document.body.textContent = sayHello(msg);
```

创建宿主页面：./index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="index.js"></script>
    <title>Document</title>
</head>
<body>
    
</body>
</html>
```

编译

```bash
tsc ./index.ts
```



### 工程化

>使用ts-loader进行ts编译

安装webpack, webpack-cli, webpack-dev-server

```bash
cnpm i webpack webpack-cli webpack-dev-server ts-loader typescript html-webpack-plugin -D
```

配置文件：build/webpack.config.js

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'app.js'
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                use: [{
                    loader: 'ts-loader'
                }],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}
```

添加开发脚本，package.json

```json
"scripts": {
    "dev": "webpack-dev-server --config ./build/webpack.config.js
}
```

## vue环境搭建

```js
vue add @vue/typescript
```

```
Use class-style component syntax? y
不把老项目转换ts  n
```

- main.ts
- tsconfig.json
- shims-vue.d.ts
- shims-tsx.d.ts

## 类型注解和编译时类型检查

类型注解



## 装饰器

## 源码


# 底层原理

## 如何编写loader?

czw-loader

```
init -y
npm install webpack webpack-cli --save-dev
```

```
const path = require('path')
module.exports={
	entry:{
		main:'./src/main.js'
	},
	output:{
		path:path.resolve(__dirname,'dist'),
		filename:'[name].js'
	}
}
```

loders/replaceloader.js

```
module.exports = function(){  //不能是箭头函数
	
}
```






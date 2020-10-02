# sass

作用：

- 嵌套，反应层级，方便阅读
- 变量计算，减少重复代码
- 混入继承代码
- 逻辑计算，使得css有
- import css模块化

## 注释

```scss
/* 多行注释 */
// 单行注释，不会出现在css 压缩模式会去掉注释
/*! 强制注释 */
```



## sass变量和引用

- 用$定义变量($color:#fff)  
  - $height:200px !default;//默认值，会被覆盖
  - 变量是有作用域的，不可以使用在其他{}里定义的变量
- 选择器可以嵌套
- &符号引用父选择器 (&:hober &-test)
- 属性嵌套 border:{left:0;right:0}
- 特殊变量作为属性名或者选择器名或者模板内容 #{$variables}

变量格式

```scss
//定义变量abc
$color: blue;
$width: 300px;
$height: 400px;
$height: 300px;  //这个会被使用，因为200是默认值，会被覆盖
$height: 200px !default; 
.div {
    color: $color;
}
```

```scss
$str:'hello.jpeg';
$strNo:abc;
.div{
    //字符串拼接
    background-image:url('./img/'+$str); //'./img/helo.jpeg'
    //和非字符串拼接
    background-image:url('./img/'+$strNo); //'./img/abc'
    background-image:url('./img/#{$str}') //'./img/abc'
}
```

插值变量

```scss
$str:'hello.jpeg';
$class :'.div2';
$styleKey:'width'
#{$class}{
    #{$styleKey}:200px;
    background-image:url('./img/#{$str}') //'./img/abc'
}
```

## mixin

```scss
@mixin hh{
    width:100px
}
```



```scss
@mixin triangle($color:#ccc,$back){
    color:$color;
    background:$back;
}
#div1{
    @include triangle(#f00,#f0f)
}
```

## import

- import是同步引入，可以把全局scss变量使用default设置默认值防止被覆盖

```css
//scss里使用原生css引入，不会转义成scss
@import 'index.css'
```

```scss
@import 'base'; //(base.scss)
```

## 运算

```scss
//加减乘除
$width:$a+$b;
.div{
    font:10px/8;
    font:10px*8;
    width:8px+5px/2
}
```

```scss
//颜色
$color:#001100;
$color2:#020202;
.div{
    color:$color1+$color2;
    color:min($color1,$color2)
}
```





绝对值：abs(10px)

四舍五入:round(5.5)

向上向下:ceil(5.1) floor(5.1)

百分比:percentage(30px/10px)

最小值最大值: max(1,2,3)

## 数据类型

```scss
//number类型
$width:200px;  
$zoomVal:2;

//color类型
$color:red;
$color:#ff0031;

//string类型
$str = 'hello.jpeg';
.div{
    background:url('./src/'+$str)
}

//数组
$list:(100px,1,'a.jpg');
.div{
    width:nth($list,1); //100px 从1开始
	z-index:index($list,100px); //1 找指定数组下标
}

//map映射
$map:(top:1px,left:2px,bottom:3px);
.div{
  top:map-get($map,top)  
}
.div2{
    @each $key,$value in $map{
        #{$key}:$value
    }
}
```









```

```
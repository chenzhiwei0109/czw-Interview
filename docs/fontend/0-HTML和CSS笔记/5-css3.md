# CSS3

## CSS3简介

CSS3是层叠样式表语言的最新版本。它带来许多期待已久的新特性，另外CSS3带来的新特性被分为”模块“。例如新的选择器、圆角、阴影、渐变、过渡、动画。以及新的布局方式

## background

### 1.background-image

通过此属性添加背景图片。不同的背景图像和图像用逗号隔开，第一个设置的永远显示在最顶端

```
body{background-image: url(images/hello2.jpeg),url(images/timg.jpeg);background-repeat: no-repeat,repeat;background-position: center top,center top;  }
```

可以给不同的图片设置多个不同的属性

```
body{    background: url(images/hello2.jpeg) no-repeat center top,url(images/timg.jpeg) repeat center top;}
```

### 2.background-size

该属性指定背景图像的大小。CSS3之前，背景图像大小由图像的实际大小决定。

CSS3中可以指定背景图片的大小，指定的大小是父元素的宽度和高度的百分比的大小

语法：

```
background-size: cover|contain;
```

- cover 将背景图片按照原来的缩放比，将整个容器铺满
- contain 将背景图片按照原来的缩放比，完整的显示到容器中

背景图像完全填充内容区域

```CSS
div{    
    width: 400px;  
    height: 400px;   
    background: url(images/hello2.jpeg) no-repeat;  
    background-size: 100% 100%;
}
```

例子:设置大的背景图，并且随着拉伸浏览器背景图跟着等比例缩放

```CSS
body{   
    background-image: url(images/hello.jpeg);   
    background-size: cover;
}
```

### 3.background-origin

该属性指定背景图像的位置区域

`content-box`,`padding-box`和`border-box`区域内可以放置背景图像。

```css
div{   
    width: 400px;  
    height: 400px;   
    padding: 20px;    
    border: 10px solid #ff0000; 
    background: url(images/hello2.jpeg) no-repeat; 
    background-size: 100% 100%;   
    background-origin: content-box;
}
```

效果显示：

![img](D:/czw-project/learningblog/docs/.vuepress/public/assets/img/image-20190705113633636.png)

### 4.background-clip

指定绘图区域的背景

```css
div{
    width: 400px;
    height: 400px;
    padding: 20px;
    border: 10px solid #ff0000;
    background-clip: content-box; //从content区域开始向外裁剪背景。 
    background-color: yellow;
}
```

![image-20200917125034519](D:/czw-project/learningblog/docs/.vuepress/public/assets/img/image-20200917125034519.png)
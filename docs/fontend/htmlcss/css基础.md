---
sidebarDepth: 2
---
# css基础部分

## 选择器

### 选择器解析方式和性能

**选择器查找规则是从右往左进行解析,出于性能考虑。如果从左往右，他先找div 会找很多个div，如果是从右往左，就是根据他去往父级去验证**

### 选择器权重值

**权重值不会进位。**

**相同权重，后写的会覆盖先写的**

**权重值优先级**

1、!important，加在样式属性值后，权重值为 10000`color:#f00 !important;`
2、内联样式，如：style=””，权重值为1000
3、ID选择器，如：#content，权重值为100
4、类，伪类和属性选择器，如： content、:hover 权重值为10
5、标签选择器和伪元素选择器，如：div、p、:before 权重值为1
6、通用选择器（*）、子选择器（>）、相邻选择器（+）、同胞选择器（~）、权重值为0

![img](../../.vuepress/public/assets/img/20181104171830408.png)



| 选择器                 | 栗子                     |
| :--------------------- | :----------------------- |
| ID                     | #id                      |
| class                  | .class                   |
| 标签                   | p                        |
| 属性                   | [type='text']            |
| 伪类                   | :hover 选择状态  ：not   |
| 伪元素                 | ::first-line  真实的元素 |
| 相邻选择器、子代选择器 | > +                      |

before或者after这种可能需要进行兼容处理

## 非布局样式

- 字体、字重、颜色、大小、行高
- 背景、边框、
- 滚动、换行
- 粗体、斜体、下划线
- 其他

## 字体

### **字体族**

- serif衬线字体：苍劲有力
- sans-serif非衬线字体：笔画起收很规则
- 等宽字体：
- 非等宽字体
- cursive手写体
- fantasy花体：华丽的英文体

### **多字体fallback**

适配时需要考虑fallback机制

针对每一个字符去查找，找某个字体，找不到去找其他字体

![1586781100422](../../.vuepress/public/assets/img/1586781100422.png)

```css
body{
    /* font-family: "monaco"; */
    /* font-family: "monaco", "PingFang SC"; */
    font-family: "aaaaa", "monaco", "PingFang SC";  //aaa不会被渲染
}
```

```css
.chinese{
    font-family: "PingFang SC", "Microsoft Yahei", monospace;  //mac上PingFang比微软雅黑好
    /* font-family: "Microsoft Yahei", serif; */  //serif字体族不可以加引号。
    /* font-family: "serif"; */
}
```

### **网络字体、自定义字体**

```css
@font-face {
    font-family: "IF";
    src: url("./IndieFlower.ttf");
}
.custom-font{
    font-family: IF;
}
```

网络字体需要对方服务器指定cors头。否则会可能有跨域问题。

也可以使用link引入。这样就不可以有跨域问题

### **iconfont**

下载后只需要安装说明

Unicode 使用步骤如下：

**第一步：拷贝项目下面生成的 `@font-face**`

```css
@font-face {
  font-family: 'iconfont';
  src: url('iconfont.eot');
  src: url('iconfont.eot?#iefix') format('embedded-opentype'),
      url('iconfont.woff2') format('woff2'),
      url('iconfont.woff') format('woff'),
      url('iconfont.ttf') format('truetype'),
      url('iconfont.svg#iconfont') format('svg');
}
```

**第二步：定义使用 iconfont 的样式**

```css
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

**第三步：挑选相应图标并获取字体编码，应用于页面**

```html
<span class="iconfont">&#x33;</span>
```

## 行高

- line-height:0;  可以是百分比，根据自身字体大小设置。可以是数字，是字体的比例

- 文字(或者行内元素)内容+行距会生成行内框，因此不设置height也会有背景和元素；
- vertical-align:middle;vertical-align:5px也可以用像素,向上移动

![1586784305081](../../.vuepress/public/assets/img/1586784305081.png)

- 行高根据基线距离对齐。

![1586784321274](../../.vuepress/public/assets/img/1586784321274.png)

- 行距=line-height减去font-size

![1586784379494](../../.vuepress/public/assets/img/1586784379494.png)

### 图片空白

尤雨溪：为什么img底部有空白<https://www.zhihu.com/question/21558138/answer/18615056>

img是基线对齐的，而这个大小是按照字体大小排序。 

- 方法1：vertical-align-bottom

## 背景

### 背景颜色

```css
.c1{
    height:90px;
    background:rgba(255,0,0, .3);
    background:hsl(0,100%,50%);  //色相0-360  饱和度50%  亮度80%
    background:url(./test.png);
}
```

### 渐变色背景

```css
.c2{
    height:90px;
    /* background: -webkit-linear-gradient(left, red, green); */ 兼容写法 从左向右
    /* background: linear-gradient(to right, red, green); */   标准写法 ，同上
    /* background: linear-gradient(180deg, red, green); */ 顺时针 0°从下到上，45°从左下到右下
    /* background: linear-gradient(135deg, red 0, green 10%, yellow 50%, blue 100%); */
    //百分之50的地方颜色变成这样。。。
    
    background: linear-gradient(135deg, transparent 0, transparent 49.5%, green 49.5%, green 50.5%, transparent 50.5%, transparent 100%),    
        linear-gradient(45deg, transparent 0, transparent 49.5%, red 49.5%, red 50.5%, transparent 50.5%, transparent 100%);
    background-size: 30px 30px;
}
```

### **多背景叠加**面试题

![1586829544549](../../.vuepress/public/assets/img/1586829544549.png)

加背景大小后

![1586829581130](../../.vuepress/public/assets/img/1586829581130.png)



```css
.c2{
    height:90px;
    //多背景叠加   0到49.5是透明的，   相当于在50%的地方画了个绿线，前后透明。
    background: linear-gradient(135deg, transparent 0, transparent 49.5%, green 49.5%, green 50.5%, transparent 50.5%, transparent 100%),
    //第二个背景 和上面那个相反
        linear-gradient(45deg, transparent 0, transparent 49.5%, red 49.5%, red 50.5%, transparent 50.5%, transparent 100%);
    //
    background-size: 30px 30px;  //背景大小
}
```

### 背景图片和属性

**背景图的控制**

```css
.c1{
    height:900px;
    background:red url(./test_bg.png);  //默认重复
    background-repeat: no-repeat;  //不平铺 repeat-y 横向平铺  
    /* background-position: center top; */   横向中间 纵向上面
    /* background-position: 20px 30px; */   距离左边二十 距离上边三十
    /* background-size:100px 50px; */	指定背景图片大小  宽*高
}
```

**雪碧图**

偏移坐标和图标坐标相反

![1586830341378](../../.vuepress/public/assets/img/1586830341378.png)

```css
.c2{
    width:20px;
    height:20px;
    background:url(./test_bg.png) no-repeat;
    background-position: -17px -5px;  
    background-size: 261px 113px;
}
.c3{
    width:20px;
    height:20px;
    background:url(./test_bg.png) no-repeat;
    background-position: -169px -23px;//相对于容器而不是图片。
    background-size: 261px 113px; 
}
```

![1586830463973](../../.vuepress/public/assets/img/1586830463973.png)

### 多分辨率适配

移动端里一个像素对应很多像素，所以要把一个大图片缩小然后去做。

### base64

随便找个在线工具

缺点：图片本身体积增大3/1

这种情况只适合小图片

在传输上有优势，http连接数减少

但是增大了体积和解码的开销，所以只能适合小图标。

```css
.c1{
    height:900px;
    /* background:red url(data:image/png;base64,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); */
    background-repeat: no-repeat;
}
```

## 边框

### 边框属性

线形：dashed solid

```css
.c1{
    width:400px;
    height: 200px;
    /* border: 1px solid red; */
    /* border:5px solid red; */
    /* border:5px dotted red; */
    border:5px dashed red;
}
```

### 边框背景图

少用

![1586832260852](../../.vuepress/public/assets/img/1586832260852.png)

```css
.c2{
    width:400px;
    height: 200px;
    /* border-width: 30px; */
    border:30px solid transparent;
    border-image:url(./border.png) 30 round;//30表示角落几个像素 round表示中间图案整数个，如果不能整除会压缩 
}
```

### 边框衔接-三角形

边框衔接是按照对角线衔接的

```
.c3 {
    width: 0;
    border-radius:20px;
    border-bottom: 30px solid red;
    border-right:30px solid blue;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
}
```

## 滚动

overflow:hidden  默认auto;

![1586833291816](../../.vuepress/public/assets/img/1586833291816.png)

内容超出容器就会产生滚动，滚动会效果的文字会触发渲染流程的分层。

## 文字折行

如果文字显示不下，就需要遇到换行问题；

- overflow-wrap(兼容写法word-wrap) 通用换行控制:是否要换行，或者换行时是否单词保留。
  - break-word:太长的单词折行,尽量保持单词完整性
  - break-all:单词肯定会被换行。
  - keep-all :中文的句子和英文单词都保持完整，不换行
- word-break:是否把字母作为一个单位，  cjk中日韩语言是否一个单位。
  - 中文句子也是单词
- white-space 空白处是否断行
  - nowrap  长文本不换行

```html
<div class="c1">
    This is a long and Supercalifragilisticexpialidocious sentence. 一二三四五六，七八九零一二，这是一句巨长巨长又没有空间可以换行的句子哦。
</div>
```

```css
.c1{
    border: 1px solid;
    width: 8em;
    overflow-wrap: normal;
    word-break: normal;
    white-space: normal;
}
```

结果：

![1586833653722](../../.vuepress/public/assets/img/1586833653722.png)

## 装饰属性(字重下划线斜体等等)

- 字重 font-weight:
  - normal 400
  - bold  700
  - bolder 
  - 100 -900
- 斜体 font-style:itatic   //意大利斜塔
- 下划线 text-decoration :none 
- 指针 cursor 鼠标移入上 point 手型

## Hack

- 不一定合法，只在特定浏览器生效
- 用于区分不同浏览器
- 缺点:难以理解 维护
- 替代方案
  - 特性检测，检测浏览器是否有某个特性
  - 针对性加class ie6下 写.ie6怎么样

css hack现在使用的很少了，但是如果需要兼容ie678需要使用他

```

```

![1586834251519](../../.vuepress/public/assets/img/1586834251519.png)

## 案例

**checkbox案例**

如何使用纯css实现？

```html
<style>
    .checkbox{

    }
    .checkbox input{  
        display: none;
    }
    .checkbox input + label{  //不被选中后的情况
        background:url(./checkbox1.png) left center no-repeat;
        background-size:20px 20px;
        padding-left:20px;
    }
    .checkbox input:checked + label{  //选中后label的样式改变
        background-image:url(./checkbox2.png);
    }
</style>
<div class="checkbox">
    <input type="checkbox" id="handsome"/>
    <label for="handsome">我很帅</label>
</div>
```

**选项卡**

单选被选中时内容display:block等等

**案例-tree**

![1586834829837](../../.vuepress/public/assets/img/1586834829837.png)

## 面试题

### 1.选择器优先级

important>内联>id >class 属性 >

- 后写的生效

### 2.雪碧图作用

利用background,利用他的大小，位置，最主要的是bg-positon来移动

- 减少http请求数
- 有些情况下减少图片的大小，比如png图片颜色基本一样，每个图片大小大于加起来的大小

### 3.自定义字体使用场景

原理:用一个网络字体，在css中使用他

- 1.宣传、品牌、banner等固定文案
- 2.吸引一些流量明星的粉丝使用
- 3.字体图标，代替图片，减少http请求数。

### 4.base64使用

把图片变成文本内嵌到css里

- 减少http请求
- 增加了加载性能，
- 体积会增大三分之一
- 适合小图片

### 伪类和伪元素区别？

- 伪类表状态，比如悬停，点击，离开等等
- 伪元素：是真实存在到DOM里的元素
- before after这种需要单冒号双冒号都写，因为有些浏览器只接受单冒号

### 如何美化checkbox

- label[for]和id
- 隐藏元素Input
- :checked+label
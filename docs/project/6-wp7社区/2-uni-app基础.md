# uni-app基础笔记

## 尺寸

upx差不多是px的一半

750upx在任何屏幕下都是充满宽度

## view和text和动画

[view](https://uniapp.dcloud.io/component/view)

```html
<view class="box animate__animated" hover-class="box-hover animate__bounceIn" >1</view>
<text selectable=true space="nbsp">文本\n 文本\n</text>
```

## 选择器

[选择器](https://uniapp.dcloud.io/frame?id=%e9%80%89%e6%8b%a9%e5%99%a8)

- 在 `uni-app` 中不能使用 `*` 选择器。
- `page` 相当于 `body` 节点，例如

目前支持的选择器有：

| 选择器           | 样例           | 样例描述                                            |
| :--------------- | :------------- | :-------------------------------------------------- |
| .class           | .intro         | 选择所有拥有 class="intro" 的组件                   |
| #id              | #firstname     | 选择拥有 id="firstname" 的组件                      |
| element          | view           | 选择所有 view 组件                                  |
| element, element | view, checkbox | 选择所有文档的 view 组件和所有的 checkbox 组件      |
| ::after          | view::after    | 在 view 组件后边插入内容，**仅微信小程序和App生效** |
| ::before         | view::before   | 在 view 组件前边插入内容，**仅微信小程序和App生效** |

```css
.view:nth-of-type(odd){
.view:first-of-type
```

## flex布局

容器

- flex-direction: row | row-reverse | column | column-reverse;主轴方向
- flex-wrap: nowrap | wrap | wrap-reverse;是否换行
- flex-flow: \<flex-direction> || \<flex-wrap>;
- justify-content: flex-start | flex-end | center | space-between | space-around;主轴
- align-items: flex-start | flex-end | center | baseline | stretch;交叉轴
- align-content: flex-start | flex-end | center | space-between | space-around | stretch;多根轴线

item

- order:\<integer>;item的排列顺序。数值越小，排列越靠前，默认为0

- flex-grow: \<number>; /* default 0 */定义项目的放大比例，默认为`0`，即如果存在剩余空间，也不放大。

  如果所有项目的`flex-grow`属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的`flex-grow`属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

- flex-shrink:\<number>; /* default 1 */定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小一份,如果是0就不缩小。

- flex-basis:类似于width，分配多余空间之前，项目占据的主轴空间

- `flex` ：none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]

  该属性有两个快捷值：`auto` (`1 1 auto`) 和 none (`0 0 auto`)。

- align-self: auto | flex-start | flex-end | center | baseline | stretch;同容器的align-item属性，单个项目


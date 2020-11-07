# css常用属性

## 文本和段落

- 加载本地字体

  ```js
  font-family:Arial,"Microsoft Yahei",sans-serif; //中文字体雅黑里包括英文字体，所以一般把英文字体放前面，保底字体sans-serif放后面
  ```

- 加载web字体

  ```js
  @font-face{
    font-family:'webfont',
    src:url('webfont.ttf')
  }
  font-family:'webfont',Arial,"Microsoft Yahei",sans-serif
  ```

  
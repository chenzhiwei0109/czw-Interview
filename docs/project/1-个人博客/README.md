---
sidebarDepth: 2
---

# vuepress搭建个人博客
给自己写的搭建指南，从0采坑，忘记了就来看一下。

## 安装初始化（有坑）

**大坑:项目名不能写中文和大写字母，否则不能更新md内容**

**尽量在项目内使用git bush命令框而不是终端**

```bash
npm install -g vuepress
```

```bash
npm init -y
```

```js
"scripts": {
	"docs:dev": "vuepress dev docs",
	"docs:build": "vuepress build docs"
},
```

```bash
mkdir docs
# 新建一个 markdown 文件
cd docs
echo # Home > docs/README.md
```

```shell
# 开始写作
npm run docs:dev 
```

## 目录结构

```
.
├─ docs
│  ├─ README.md
│  └─ .vuepress
│     └─ config.js
└─ package.json
```

1. 在`docs`目录下创建`.vuepress`目录,新建总配置文件`.vuepress/config.js`

   ```bash
   cd docs
   mkdir .vuepress
   cd .vuepress
   touch config.js
   ```

2. ```
   //项目根目录下
   npm init -y
   ```

3. config.js配置

   ```js
   module.exports = {
     title: '陈志伟的文档',
     description: '学习总结'
   }
   ```


VuePress 遵循 **“约定优于配置”** 的原则，推荐的目录结构如下：

```
.
├── docs
│   ├── .vuepress (可选的)
│   │   ├── components (可选的)
│   │   ├── theme (可选的)
│   │   │   └── Layout.vue
│   │   ├── public (可选的)
│   │   ├── styles (可选的)
│   │   │   ├── index.styl
│   │   │   └── palette.styl
│   │   ├── templates (可选的, 谨慎配置)
│   │   │   ├── dev.html
│   │   │   └── ssr.html
│   │   ├── config.js (可选的)
│   │   └── enhanceApp.js (可选的)
│   │ 
│   ├── README.md
│   ├── guide
│   │   └── README.md
│   └── config.md
│ 
└── package.json
```

## 初始化配置

1. 配置默认主题：

   docs/README.md

   ```
   ---
   home: true
   heroImage: /hero.png
   heroText: Hero 标题
   tagline: Hero 副标题
   actionText: 快速上手 →
   actionLink: /
   features:
   - title: 简洁至上
     details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
   - title: Vue驱动
     details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
   - title: 高性能
     details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
   footer: MIT Licensed | Copyright © 2018-present Evan You
   ---
   ```

2. 配置首页图片和icon图标

   图片放入`.vuepress/public文件内

   ```js
   module.exports = {
       head: [
           ['link', { rel: 'icon', href: '/logo.png' }]
       ]
   }
   ```

## nav导航栏配置

### 导航栏 Logo

你可以通过 `themeConfig.logo` 增加导航栏 Logo ，Logo 可以被放置在[公共文件目录](https://www.vuepress.cn/guide/assets.html#public-files)：

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    logo: '/assets/img/logo.png',
  }
}
```

 ### 导航栏链接

你可以通过 `themeConfig.nav` 增加一些导航栏链接:

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'External', link: 'https://google.com' },
    ]
  }
}
```

外部链接 `<a>` 标签的特性将默认包含`target="_blank" rel="noopener noreferrer"`，你可以提供 `target` 与 `rel(css链接)`，它们将被作为特性被增加到 `<a>` 标签上：

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      { text: 'External', link: 'https://google.com', target:'_self', rel:'' },
      { text: 'Guide', link: '/guide/', target:'_blank' }
    ]
  }
}
```

  当你提供了一个 `items` 数组而不是一个单一的 `link` 时，它将显示为一个 `下拉列表` ：

```js
module.exports = {
  themeConfig: {
    nav: [
      {
        text: 'Languages',
        ariaLabel: 'Language Menu',
        items: [
          { text: 'Chinese', link: '/language/chinese/' },
          { text: 'Japanese', link: '/language/japanese/' }
        ]
      }
    ]
  }
}
```

此外，你还可以通过嵌套的 `items` 来在 `下拉列表` 中设置分组：  

```js
module.exports = {
  themeConfig: {
    nav: [
      {
        text: 'Languages',
        items: [
          { text: 'Group1', items: [/*  */] },
          { text: 'Group2', items: [/*  */] }
        ]
      }
    ]
  }
}
```

### 禁用导航栏

你可以使用 `themeConfig.navbar` 来禁用所有页面的导航栏：

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    navbar: false
  }
}
```

你也可以通过 `YAML front matter` 来禁用某个指定页面的导航栏：

```yaml
---
navbar: false
---
```

## 侧边栏

配置 `themeConfig.sidebar`，基本的配置，需要一个包含了多个链接的**数组(只适合单页面)**：

### 适合导航页的侧边栏

**只适合单readme文件页面，配合导航页跳转**

点击Home、关于、项目会跳到不同页面，并且导航栏随之变化

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: [
      '/',  //首页
      '/about',   //关于
      ['/project/', '项目']  
    ]
  }
}
```

###  侧边栏分组

你可以通过使用**对象**来将侧边栏划分成多个组：

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
        sidebar: [
        	['/', '首页'] //首页
       		'/about',   //关于
        	{
                title: '面试',   // 必要的
                path: '/interview/',      // 可选的, 应该是一个绝对路径
                collapsable: false, // 可选的, 默认值是 true,
                sidebarDepth: 1,    // 可选的, 默认值是 1
                children: [
                    '/interview/htmlcss',
                    '/interview/js'
                ]
        	}
     	]
  }
}
```

### 多个侧边栏

如果你想为不同的页面组来显示不同的侧边栏，首先，将你的页面文件组织成下述的目录结构：

```text
.
├─ README.md
├─ contact.md
├─ about.md
├─ foo/
│  ├─ README.md
│  ├─ one.md
│  └─ two.md
└─ bar/
   ├─ README.md
   ├─ three.md
   └─ four.md
```

接着，遵循以下的侧边栏配置：

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: {
      '/foo/': [
        '',     /* /foo/ */
        'one',  /* /foo/one.html */
        'two'   /* /foo/two.html */
      ],

      '/bar/': [
        '',      /* /bar/ */
        'three', /* /bar/three.html */
        'four'   /* /bar/four.html */
      ],

      // fallback
      '/': [
        '',        /* / */
        'contact', /* /contact.html */
        'about'    /* /about.html */
      ]
    }
  }
}
```

>确保 fallback 侧边栏被最后定义。VuePress 会按顺序遍历侧边栏配置来寻找匹配的配置。

## 最后更新时间

你可以通过 `themeConfig.lastUpdated` 选项来获取每个文件最后一次 `git` 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部：

```js
module.exports = {
  themeConfig: {
    lastUpdated: 'Last Updated', // string | boolean
  }
}
```

git add docs/xx.md 把xx加入到跟踪

git commit -m 'commit'		

```js
const moment = require('moment');

module.exports = {
  plugins: [
    [
      '@vuepress/last-updated',
      {
        transformer: (timestamp, lang) => {
          // 不要忘了安装 moment
          const moment = require('moment')
          moment.locale('zh-cn')
          return moment(timestamp).fromNow()
        }
      }
    ]
  ]
}
```

<http://momentjs.cn/>

## 发布到github

### 部署方式

部署到github二级域名

```
https://<USERNAME>.github.io/
```

- 创建仓库xx.github.io

- 建立文件deploy.sh

  ```sh
  #!/usr/bin/env sh
  
  # 确保脚本抛出遇到的错误
  set -e
  
  # 生成静态文件
  npm run docs:build
  
  # 进入生成的文件夹
  cd docs/.vuepress/dist
  
  git init
  git add -A
  git commit -m 'deploy'
  
  # 如果发布到 https://<USERNAME>.github.io
  # git push -f git@github.com:xx/xx.github.io.git master
  
  cd -
  ```

  ```
  bash deploy.sh
  ```


### 一键部署

1. 验证仓库是否部署:**git config -l**

2.    ```
   module.exports = {
       base:'/learningblog/',
   }
   // 执行run dev
   ```

   ><http://localhost:8080/learningblog/>

3. ```
   #!/usr/bin/env sh
   
   # 确保脚本抛出遇到的错误
   set -e
   
   # 生成静态文件
   npm run docs:build
   
   # 进入生成的文件夹
   cd docs/.vuepress/dist
   
   # 如果是发布到自定义域名
   # echo 'www.example.com' > CNAME
   
   git init
   git add -A
   git commit -m 'deploy'
   
   # 如果发布到 https://<USERNAME>.github.io
   # git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master
   
   # 如果发布到 https://<USERNAME>.github.io/<REPO>
   git push -f git@github.com:chenzhiwei0109/learningblog.git master:gh-pages
   
   cd -
   ```

4. ```
   "docs:dev": "vuepress dev docs",
   "docs:build": "vuepress build docs",
   "deploy": "bash deploy.sh"
   ```


配置命令

TIP

你可以在你的持续集成的设置中，设置在每次 push 代码时自动运行上述脚本。

1. 在 `docs/.vuepress/config.js` 中设置正确的 `base`。

   如果你打算发布到 `https://<USERNAME or GROUP>.github.io/`，则可以省略这一步，因为 `base` 默认即是 `"/"`。

   如果你打算发布到 `https://<USERNAME or GROUP>.github.io/<REPO>/`（也就是说你的仓库在 `https://github.com/<USERNAME>/<REPO>`），则将 `base` 设置为 `"/<REPO>/"`。

2. 在项目的根目录创建一个名为 `.travis.yml` 的文件；

3. 在本地执行 `yarn` 或 `npm install` 并且提交生成的 lock 文件（即 `yarn.lock` 或 `package-lock.json`）；

4. 使用 GitHub Pages 部署提供程序模板并遵循 [Travis 文档](https://docs.travis-ci.com/user/deployment/pages/)。

```yaml
language: node_js
node_js:
  - lts/*
install:
  - yarn install # npm ci
script:
  - yarn docs:build # npm run docs:build
deploy:
  provider: pages
  skip_cleanup: true
  local_dir: docs/.vuepress/dist
  github_token: $GITHUB_TOKEN # 在 GitHub 中生成，用于允许 Travis 向你的仓库推送代码。在 Travis 的项目设置页面进行配置，设置为 secure variable
  keep_history: true
  on:
    branch: master
```

## markdown扩展

代码高亮

```
​```js{3,4,5}
```

代码警告

```
：：：tip 警告
这是警告
	npm install -g vuepress
:::
```

## SEO

.vuepress/config.js

```js
module.exports = {
    title: '前端学习笔记', // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
    description: '前端,HTML,CSS,webpack,前端学习,前端面试', // meta 中的描述文字，用于SEO
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        ['link', 
            { rel: 'icon', href: 'title.jpg' }
            //浏览器的标签栏的网页图标，第一个'/'会遍历public文件夹的文件
        ],  
    ],
}
```

## PWA

## 坑点汇总

- 安装不要安装在中文和大写字母目录下，否则markdown热更新无效
- 这个网站热更新没有用，改变主题状态需要从启动
- 注意路径问题，路径真的太坑。 默认/是docs下的目录
- 图片路径问题采用typroa优先使用相对路径解决
- 尽量不使用终端，使用git bush命令
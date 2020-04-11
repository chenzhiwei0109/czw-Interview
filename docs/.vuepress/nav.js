module.exports = [
  // /是docs下d1
  { text: '首页', link: '/' },
  { text: '面试', link: '/interview/' },
  { text: '前端学习', link: '/fontend/' },
  { text: '项目及采坑记录', link: '/project/' },
  // 前端文档
  {
    text: '前端文档',
    items: [
      {
        text: '官方文档',
        ariaLabel: '官方文档菜单',
        items: [{ text: 'W3C', link: 'https://www.w3school.com.cn/' },
        { text: 'MDN文档', link: 'https://developer.mozilla.org/zh-CN/' },
        { text: '网道JS教程', link: 'https://wangdoc.com/javascript/' },
        { text: 'jquery文档', link: 'http://jquery.cuishifeng.cn/' },
        { text: 'ES6阮一峰', link: 'https://es6.ruanyifeng.com/' },
        { text: 'Vue官方文档', link: 'https://cn.vuejs.org/' },
        { text: 'Uni-app官网', link: 'https://uniapp.dcloud.io/' },
        { text: 'Webpack官方文档', link: 'https://www.webpackjs.com/' },
        { text: 'React官方文档', link: 'https://react.docschina.org/' },
        { text: '维基百科', link: 'https://www.wikipedia.org/' },]
      },
      {
        text: '组件库',
        ariaLabel: '组件库菜单',
        items: [
          { text: 'VUE-element-ui', link: 'https://element.eleme.cn/#/zh-CN' },
          { text: 'VUE-vue-press博客搭建', link: 'https://www.vuepress.cn/' },
          { text: 'VUE-vant', link: 'https://youzan.github.io/vant/#/zh-CN/' },
          { text: 'MUI文档', link: 'https://dev.dcloud.net.cn/mui/' },
          { text: 'AntDesign', link: 'https://ant.design/index-cn' },
        ]
      }
    ]
  },
  // 工具
  {
    text: '工具',
    items: [
      { text: 'echart图', link: 'https://www.echartsjs.com/zh/index.html' },
      { text: '腾讯AI', link: 'https://ai.qq.com/' },
      { text: 'lodash中文', link: 'https://www.lodashjs.com/' },
      { text: '动画animate', link: 'https://daneden.github.io/animate.css/' },
      { text: '随机数据mock', link: 'http://mockjs.com/' },
      { text: '阿里图标', link: 'https://www.iconfont.cn/' },
    ]
  },

  // 大佬论坛
  {
    text: '大佬博客论坛',
    items: [
      {
        text: '博客论坛',
        items: [
          { text: '阮一峰博客', link: 'http://www.ruanyifeng.com/blog/' },
          { text: '张鑫旭博客', link: 'https://www.zhangxinxu.com/' },
          { text: '尤雨溪知乎', link: 'https://www.zhihu.com/people/evanyou' },
          { text: '尤雨溪微博', link: 'https://weibo.com/arttechdesign?is_hot=1' },
          { text: '思否', link: 'https://segmentfault.com/' },
          { text: '掘金', link: 'https://juejin.im/timeline' },
          { text: '极客时间', link: 'https://time.geekbang.org/' },
          { text: '简书', link: 'https://www.jianshu.com/' },
        ]
      },

      {
        text: '他人笔记',
        items: [
          { text: 'Vue源码', link: 'https://ustbhuangyi.github.io/vue-analysis/v2/prepare/' },
          { text: '小慕读书文档', link: 'http://www.youbaobao.xyz/admin-docs/' },
          { text: 'JS数据结构和算法', link: 'https://www.jianshu.com/p/38853c044156' },
          { text: '小猿圈', link: 'https://book.apeland.cn/details/314/' },
          { text: '面试题-看云', link: 'https://www.kancloud.cn/hanxuming/vue-iq/945437' },
          { text: '面试题-github榜1', link: 'https://github.com/haizlin/fe-interview' },
        ]
      }
    ]
  },
  { text: '源码', link: 'https://github.com/chenzhiwei0109/learningblog', target: '_blank' },
]
module.exports = [
  // /是docs下d1

  {
    text: '面试',
    items: [
      { text: '面经汇总', link: '/interview/0-面经汇总/面经.md' },
      { text: 'CSS', link: '/interview/1-css面试题/' },
      { text: 'JS', link: '/interview/2-js面试题/' },
      { text: 'H5和移动端', link: '/interview/3-h5移动端/' },
      { text: 'Webpack', link: '/interview/4-webpack面试题/' },
      { text: 'Vue', link: '/interview/5-vue面试题/' },
      { text: 'React', link: '/interview/6-react面试题/' },
      { text: '综合', link: '/interview/7-综合面试题/' },
      { text: '数据结构与算法', link: '/interview/8-数据结构与算法/' },
      { text: '其他技术栈', link: '/interview/9-其他技术栈/' },
      { text: '知识点速记', link: '/interview/10-知识点速记/' },
    ]
  },
  {
    text: '前端基础',
    items: [
      { text: 'HTML和CSS笔记', link: '/fontend/0-HTML和CSS笔记/' },
      { text: 'JavaScript笔记', link: '/fontend/1-JavaScript笔记/' },
      { text: 'H5移动端笔记', link: '/fontend/2-HTML5和移动端/' },
      { text: 'ECMAScript6笔记', link: '/fontend/3-ES6/' },
      { text: 'Webpack笔记', link: '/fontend/4-Webpack/' },
      { text: 'Vue笔记', link: '/fontend/5-Vue/' },
      { text: 'React笔记', link: '/fontend/6-React/' },
      { text: '数据结构与算法', link: '/fontend/数据结构与算法/' },
      { text: 'http协议相关', link: '/fontend/http协议/' },
    ]
  },
  {
    text: '项目及采坑记录',
    items: [
      { text: '博客总结', link: '/project/blog/' },
      { text: '采坑点', link: '/project/bug/' },
      // { text: '小米商城', link: '/project/xiaomi/' }
    ]
  },
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
          { text: 'Swiper', link: 'https://www.swiper.com.cn/' },
          { text: 'cube', link: 'https://didi.github.io/cube-ui/#/zh-CN' },
        ]
      }
    ]
  },
  // 工具
  {
    text: '工具文档',
    items: [
      { text: 'echart图', link: 'https://www.echartsjs.com/zh/index.html' },
      { text: 'better-scroll', link: 'https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/' },
      { text: '腾讯AI', link: 'https://ai.qq.com/' },
      { text: 'lodash中文', link: 'https://www.lodashjs.com/' },
      { text: '动画animate', link: 'https://daneden.github.io/animate.css/' },
      { text: '随机数据mock', link: 'http://mockjs.com/' },
      { text: '阿里图标', link: 'https://www.iconfont.cn/' },
      { text: '跨域处理-服务器代理', link: 'https://bird.ioliu.cn/' },
      { text: '正则可视化', link: 'https://regexper.com/' },
      { text: 'base64', link: 'http://tool.chinaz.com/tools/imgtobase/' }
    ]
  },

  {
    text: '博客论坛笔记',
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
      },
      {
        text: '刷题',
        items: [
          { text: '牛客', link: 'https://www.nowcoder.com/contestRoom' },
          { text: 'leetcode', link: 'https://leetcode-cn.com/' }
        ]
      }
    ]
  },
  { text: '源码', link: 'https://github.com/chenzhiwei0109/learningblog', target: '_blank' },
]
module.exports = {
    base: '/learningblog/',
    title: '学习笔记', // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
    description: '前端,HTML,CSS,webpack,前端学习,前端面试', // meta 中的描述文字，用于SEO
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        ['link', { rel: 'icon', href: '/title.jpg' }],
        ['meta', { name: 'keywords', content: 'vuepress 学习 笔记' }],
        ['meta', { name: 'author', content: 'Chen' }]
    ],
    themeConfig: require('./themeconfig.js')
}
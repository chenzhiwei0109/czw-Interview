# 项目介绍

![image-20200810081349935](../../.vuepress/public/assets/img/image-20200810081349935.png)

- 本项目是由uni-app开发的在线视频网站。

- 本项目前端使用uni-app进行开发，使用iconfont作为图标库，使用animate管理动画样式，使用vuex结合本地存储管理状态，app端结合subnvue实现自定义播放器，支持浏览器端，app端。
  - 后端采用egg.js进行开发，使用mysql进行数据存储，使用egg-sequelize加载模型对象，使用crypto进行加密，egg-jwt进行鉴权，使用redis进行后端状态缓存。
- 本项目部署到阿里云，并采用腾讯云点播进行视频转储。
# 礼物支付

## 创建订单和微信支付

### 配置egg-tenpay

这里借用他人的微信支付https://www.imooc.com/article/31607

安装插件：egg-tenpay

```
npm i egg-tenpay --save
```

> 插件地址：https://www.npmjs.com/package/egg-tenpay

```js
// config/plugin.js
tenpay: {
    enable: true,
    package: 'egg-tenpay'
}
//config/config.default.js
config.webUrl = 'http://127.0.0.1:7001'
// 微信支付配置，这里使用网上的微信支付
config.tenpay = {
    client: {
      appid: 'wxc559eade7d0a3bde',//appid
      mchid: '1554108981',//商户id
      partnerKey: '8b07811ec793049f1c97793464c7049f',
      notify_url: config.webUrl + '/api/gift/notify', //支付成功后通知
      // sandbox: true
    }
};
```

路由

```js
router.post('/api/gift/wxpay', controller.api.gift.wxpay);
router.post('/api/gift/notify', controller.api.gift.notify);
```

### 订单创建和支付流程

微信支付流程:

1. 在config里进行配置
2. 支付需要进行token验证，验证后获取用户id,然后获取到请求体的price。

3. 创建订单号,根据egg-pay说明把参数传入。并返回给前端

支付回调流程

1. 获取回调信息
2. 判断是否支付失败
3. 查询当前订单，修改订单状态
4. 查询用户余额，把回调里的充值数量进行添加并保存

### api编写

控制器：app/controller/api/gift.js

```js
'use strict';

const Controller = require('egg').Controller;

class GiftController extends Controller {
  // 微信支付
  async wxpay() {
    const { ctx, app } = this;
    let user_id = ctx.authUser.id
    // 参数验证
    ctx.validate({
      price: {
        type: "int",
        required: true,
        desc: "充值金额"
      }
    })
    let { price } = ctx.request.body

    // if (price < 1) {
    //   return ctx.apiFail('至少充值1元')
    // }
    // 创建订单号
    let no = ctx.randomString(20)
    let order = await app.model.Order.create({
      no,
      user_id,
      price
    })
    if (!order) {
      return ctx.apiFail('创建订单失败')
    }
    // 支付
    // 价格单位是分
    let result = await app.tenpay.getAppParams({
      out_trade_no: no,
      body: '支付价格',
      total_fee: price * 100,
      trade_type: "APP"
    });

    // ctx.logger.error('开始支付');
    // ctx.logger.error(result);
    ctx.apiSuccess(result);
  }

  // 支付回调
  async notify() {
    const { ctx, app, service } = this;
      //拿到weixin的信息
    let info = ctx.request.weixin;
	
    //错误处理
    if (!info || info.result_code !== 'SUCCESS') {
      return ctx.reply('支付失败');
    }

    // 查询当前订单
    let order = await app.model.Order.findOne({
      where: {
        no: info.out_trade_no
      }
    })
	
    
    if (!order) {
      return ctx.reply('订单不存在');
    }

    // 修改订单状态
    order.status = 'success'
    // 保存订单
    order.save()

    // 修改用户余额
    let user = await service.user.exist(order.user_id)
    if (user) {
      user.coin += parseInt(info.total_fee) / 100
      user.save()
    }

    // 回复消息(参数为空回复成功, 传值则为错误消息)
    ctx.reply();
  }
}

module.exports = GiftController;

```

app\service\user.js

```js
'use strict';

const Service = require('egg').Service;

class UserService extends Service {
    // 用户是否存在
    async exist(id) {
        const { app } = this

        return await app.model.User.findOne({
            where:{
                id
            }
        })
    }
}

module.exports = UserService;
```

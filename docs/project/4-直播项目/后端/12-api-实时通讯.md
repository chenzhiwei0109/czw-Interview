# 实时通信

直播间的进入出去要实时改变，金币，送礼物，弹幕都要实时的去修改

## socket.io插件安装

- 文档地址：https://eggjs.org/zh-cn/tutorials/socketio.html
- 配置可以直接根据官网的配置进行配置

安装

```js
npm i egg-socket.io --save
```

启用插件

```js
// config/plugin.js
io: {
    enable: true,
    package: 'egg-socket.io',
},
```

配置：

```js
// config/config.default.js
config.io = {
    init: {
      wsEngine: 'ws',//ws引擎
    },
    namespace: {
      '/': {
        connectionMiddleware: [
          //'auth',//连接中间件
        ],
        packetMiddleware: [],
      }
    },
    redis: { //redis存储的db不能和其他的一样！！！
      host: '127.0.0.1',
      port: 6379,
      db: 2,
    },
  };
```

部署: package.json

```json
{
    "scripts": {
        "start": "egg-scripts start --daemon --title=egg-server-cilicl-live --sticky",
        "dev": "egg-bin dev --sticky",
        "start": "egg-scripts start --sticky"
    }
}
```

Nginx 配置

```
location / {
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection "upgrade";
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header Host $host;
  proxy_pass   http://127.0.0.1:7001;

  # http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_bind
  # proxy_bind       $remote_addr transparent;
}
```

## 进入直播间

```js

```







## 控制器编写

socket.io插件控制器：app/io/controller/nsp.js

```js
'use strict';

const Controller = require('egg').Controller;
const PREFIX = 'room';
class NspController extends Controller {
    async checkToken(token){
        const { ctx, app, service, helper } = this;
        const nsp = app.io.of('/');
        const socket = ctx.socket;
        const id = socket.id;

        // 用户验证
        if (!token) {
            socket.emit(id, ctx.helper.parseMsg('error', '您没有权限访问该接口!'));
            return false
        }
        //2. 根据token解密，换取用户信息
        let user = {};
        try {
            user = ctx.checkToken(token);
        } catch (error) {
            let fail = error.name === 'TokenExpiredError' ? 'token 已过期! 请重新获取令牌' : 'Token 令牌不合法!';
            socket.emit(id, ctx.helper.parseMsg('error', fail));
            return false
        }
        //3. 判断当前用户是否登录
        let t = await ctx.service.cache.get('user_' + user.id);
        if (!t || t !== token) {
            socket.emit(id, ctx.helper.parseMsg('error', 'Token 令牌不合法!'));
            return false
        }

        //4. 获取当前用户，验证当前用户是否被禁用
        user = await app.model.User.findByPk(user.id);
        if (!user) {
            socket.emit(id, ctx.helper.parseMsg('error', '用户不存在或已被禁用'));
            return false
        }

        return user
    }
    // 直播间发送消息
    async comment() {
        const { ctx, app, service, helper } = this;
        const nsp = app.io.of('/');
        const message = ctx.args[0] || {};
        const socket = ctx.socket;
        const id = socket.id;

        const { live_id, data,token } = message;

        let user = await this.checkToken(token)
        if(!user){
            return
        }

        try {
            // 验证当前直播间是否存在且是否处于开播中
            let msg = await service.live.checkStatus(live_id)
            if (msg) {
                socket.emit(id, ctx.helper.parseMsg('error', msg));
                return
            }

            const room = 'live_' + live_id
            // 推送消息到直播间
            nsp.to(room).emit('comment', {
                user: {
                    id: user.id,
                    name: user.nickname || user.username,
                    avatar: user.avatar,
                },
                content: data
            });

            app.model.Comment.create({
                content: data,
                live_id,
                user_id: user.id
            })

        } catch (error) {
            app.logger.error(error);
        }
    }

    // 进入直播间
    async joinLive() {
        const { ctx, app, service, helper } = this;
        const nsp = app.io.of('/');
        const message = ctx.args[0] || {};
        const socket = ctx.socket;
        const id = socket.id;

        const { live_id,token } = message;

        let user = await this.checkToken(token)
        if(!user){
            return
        }

        // 验证当前直播间是否存在且是否处于开播中
        let msg = await service.live.checkStatus(live_id)
        if (msg) {
            socket.emit(id, ctx.helper.parseMsg('error', msg));
            return
        }

        const room = 'live_' + live_id
        // 用户加入
        console.log('#join', room);
        socket.join(room);

        const rooms = [room];
        // 在线列表
        // nsp.adapter.clients(rooms, (err, clients) => {
        //     console.log('#online_join', clients);
        // });

        // 加入存储中
        let list = await service.cache.get('userList_' + room);
        list = list ? list : [];
        list = list.filter(item => item.id !== user.id)
        list.unshift({
            id: user.id,
            name: user.nickname || user.username,
            avatar: user.avatar,
        })
        service.cache.set('userList_' + room, list)

        // 更新在线用户列表
        nsp.adapter.clients(rooms, (err, clients) => {
            console.log('#online_join', clients);
            nsp.to(room).emit('online', {
                clients,
                action: 'join',
                user: {
                    id: user.id,
                    name: user.nickname || user.username,
                    avatar: user.avatar,
                },
                data: list
            });
        });

        // 加入播放历史记录
        let liveUser = await app.model.LiveUser.findOne({
            where: {
                user_id: user.id,
                live_id
            }
        })
        if (!liveUser) {
            app.model.LiveUser.create({
                user_id: user.id,
                live_id
            })
            // 总观看人数+1
            let live = await service.live.exist(live_id)
            live.increment({
                look_count: 1
            })
        }

    }

    // 离开直播间
    async leaveLive() {
        const { ctx, app, service, helper } = this;
        const nsp = app.io.of('/');
        const message = ctx.args[0] || {};
        const socket = ctx.socket;
        const id = socket.id;

        const { live_id,token } = message;

        let user = await this.checkToken(token)
        if(!user){
            return
        }

        // 验证当前直播间是否存在且是否处于开播中
        let msg = await service.live.checkStatus(live_id)
        if (msg) {
            socket.emit(id, ctx.helper.parseMsg('error', msg));
            return
        }

        const room = 'live_' + live_id
        // 用户离开
        console.log('#leave', room);
        socket.leave(room);

        const rooms = [room];
        // 在线列表
        nsp.adapter.clients(rooms, (err, clients) => {
            console.log('#online_join', clients);

            // 更新在线用户列表
            nsp.to(room).emit('online', {
                clients,
                action: 'leave',
                user: {
                    id: user.id,
                    name: user.nickname || user.username,
                    avatar: user.avatar,
                },
            });
        });

        let list = await service.cache.get('userList_' + room);
        if (list) {
            list = list.filter(item => item.id !== user.id)
            service.cache.set('userList_' + room, list)
        }
    }

    // 直播间送礼物
    async gift() {
        const { ctx, app, service, helper } = this;
        const nsp = app.io.of('/');
        const message = ctx.args[0] || {};
        const socket = ctx.socket;
        const id = socket.id;

        const { live_id, gift_id, token } = message;

        let user = await this.checkToken(token)
        if(!user){
            return
        }

        try {
            // 验证当前直播间是否存在且是否处于开播中
            let live = await service.live.checkStatus(live_id,true)
            if (typeof live === 'string') {
                socket.emit(id, ctx.helper.parseMsg('error', live));
                return
            }

            // 验证礼物是否存在
            let gift = await app.model.Gift.findOne({
                where: { id: gift_id }
            })
            if (!gift) {
                socket.emit(id, ctx.helper.parseMsg('error', '该礼物不存在'));
                return
            }
            // 金币不足
            if (user.coin < gift.coin) {
                socket.emit(id, ctx.helper.parseMsg('error', '金币不足，请先充值'));
                return
            }
            // 扣除金币
            user.coin -= gift.coin
            await user.save()

            // 写入礼物记录表
            app.model.LiveGift.create({
                live_id,
                user_id: user.id,
                gift_id
            })

            // 直播间增加金币数
            live.coin += gift.coin
            live.save()

            const room = 'live_' + live_id
            // 推送消息到直播间
            nsp.to(room).emit('gift', {
                avatar: user.avatar,
                username: user.nickname || user.username,
                gift_image: gift.image,
                gift_name: gift.name,
                num: 1
            });

        } catch (error) {
            app.logger.error(error);
        }
    }
}

module.exports = NspController;
```

扩展：app/extend/helper.js

```js
module.exports = {
  parseMsg(action, payload = {}, metadata = {}) {
    const meta = Object.assign({}, {
      timestamp: Date.now(),
    }, metadata);

    return {
      meta,
      data: {
        action,
        payload,
      },
    };
  },
}
```

插件路由：app/router.js

```js
  io.of('/').route('comment', io.controller.nsp.comment);
  io.of('/').route('joinLive', io.controller.nsp.joinLive);
  io.of('/').route('leaveLive', io.controller.nsp.leaveLive);
  io.of('/').route('gift', io.controller.nsp.gift);
```

### token验证

```js
//验证用户token
async checkToken() {
    const { ctx, app, service, helper } = this;
    const socket = ctx.socket
    const id = socket.id

    // 用户验证
    if (!token) {
        // 通知前端，您没有服务该接口权限
        socket.emit(id, ctx.helper.parseMsg('error', '用户未登录'))
    }

    let user = {}
    try {
        user = ctx.checkToken(token)
    } catch (err) {
        let fail = error.name === 'TokenExpiredError' ? '登录已过期,请重新登陆' : 'Token 令牌不合法!';
        socket.emit(id, ctx.helper.parseMsg('error', fail))
        return false
    }
    // 判断用户是否登录
    let t = await ctx.service.cache.get('user_' + user.id)
    if (!t || t !== token) {
        socket.emit(id, ctx.helper.parseMsg('error', 'Token 令牌不合法!'))
        return false
    }

    // 4.判断用户是否存在
    user = await app.model.User.findOne({
        where: {
            id: user.id
        }
    })
    if (!user) {
        socket.emit(id, ctx.helper.parseMsg('error', '用户不存在'))
        return false
    }

    return user
}
```

### 进入直播间api

```
- 验证用户token
- 验证直播间是否处于开播状态，获取直播间id
- 把用户的socket加入直播间
- 用户加入redis存储，方便后期其他成员拿到在线情况，因为数据库不如redis读写快
- 更新在线用户列表
- 加入播放历史记录，方便后台查看你的直播间人气
```

```js

```

app\service\live.js

```js
'use strict';

const await = require('await-stream-ready/lib/await');

const Service = require('egg').Service;

class LiveService extends Service {
  async exist(id){
    return await this.app.model.Live.findOne({
      where:{
        id
      }
    })
  }
  async checkStatus(id) {
    let live = await this.app.model.Live.fondOne({
      where: {
        id
      }
    })

    if (!live) {
      return '直播间不存在'
    } else if (live.status == 0) {
      return '未开播'
    } else if (live.status == 3) {
      return '直播已结束'
    }
    return false

  }
}

module.exports = LiveService;

```

  ```
{
    "msg": "ok",
    "data": {
        "data": {
            "created_time": "2020-10-21 11:37:58",
            "id": 30,
            "title": "测试2啊啊13",
            "cover": "",
            "user_id": 12,
            "look_count": 0,
            "coin": 0,
            "key": "W5ICDWlityKffeTLFK7k",
            "status": 0,
            "updated_time": "2020-10-21T03:45:00.050Z",
            "userId": 12
        },
        "sign": "1603351900-32e9bddc4fed965b1059ea63b6eb2d73"
    }
}
  ```

```
{
    "msg": "ok",
    "data": {
        "data": {
            "created_time": "2020-10-21 11:37:58",
            "id": 30,
            "title": "测试2啊啊134",
            "cover": "",
            "user_id": 12,
            "look_count": 0,
            "coin": 0,
            "key": "W5ICDWlityKffeTLFK7k",
            "status": 0,
            "updated_time": "2020-10-21T03:45:21.528Z",
            "userId": 12
        },
        "sign": "1603351921-c4c71c8dde8f28c291eadec9652b8a7f"
    }
}
```


---
sidebarDepth: 2
---
# vue多媒体

入口文件引入

```js
//main.js
import '@/assets/js/rem.js'
import '@/assets/css/reset.css'
```

tab页跳转逻辑

- 跳转时修改标题和颜色

```js
this.colorName = item.color;
this.titleName = item.name;
this.$router.push(item.routerPath);
```

## 刷新后状态初始化问题解决

```html
//刷新页面
this.$emit("changeNav", { title: "音乐", color: "music" });
```

```html
//路由
<router-view class="content" @changeNav="change" /> 
```



假设当前页面是聊天，我们刷新的created阶段

## 电影

https://github.com/Duanzihuang/heimamovie

## 跨域代理

```
let url = `https://bird.ioliu.cn/v1?url=`
```

## 图片防盗链

```html
<img :src="'https://images.weserv.nl/?url='+item.images.small" />
```

## 上拉加载

可视区域高度+当前滚动高度 >=滚动条可滚动高度，并且当前未处于加载状态时，获取下五条数据。

如果

```js
window.onscroll = () => {
    let clientHeight = document.documentElement.clientHeight; //可视区域高度
    let scrollTop = document.documentElement.scrollTop; //当前滚动高度
    let scrollHeigth = document.documentElement.scrollHeight; //滚动条可滚动高度
    if (
        clientHeight + scrollTop >= scrollHeigth - 100 &&
        !this.isLoading &&
        this.dataList.length != 55
    ) {
        this.nextStart += 5;
        this.getData();
    }
    if (this.dataList.length == 55) {
        this.isEnd = true;
    }
};
```

## 腾讯智能聊天AI算法

```js
getSign(params, key) {
    //params对象
    let arr = Object.keys(params).sort(); //把key按照升序排序
    let str = "";
    arr.forEach(item => {
        if (params[item] != "") {
            //参数不是空才会参与签名 或者一开始就不加sign,后面加个属性,就不用写这步 我觉得文档这步完全是多此一举
            str += item + "=" + encodeURI(params[item]) + "&";
        }
    });
    // 将应用密钥以app_key为键名，组成URL键值拼接到字符串T末尾，
    str += "app_key=" + key;
    str = md5(str).toUpperCase();
    return str;
},
   
```

```js
send(){
    let message = this.msg;
    this.msg = "";
    let params = {
        app_id: 2123846932,
        time_stamp: parseInt(
            Date.now()
            .toString()
            .substr(0, 10)
        ),
        nonce_str: Math.random()
        .toString(36)
        .substr(2),
        session: "10000",
        question: message,
        sign: ""
    };
    params.sign = this.getSign(params, "ocSwiIc3hBoYeoVu");
}
```

## 聊天框自动聚焦

```html
<ul  ref="gundong">
    <li v-for="(item, index) in talkList" :key="index">
			//.....
    </li>
</ul>
```

```js
axios({
    url:
    "https://bird.ioliu.cn/v2?url=https://api.ai.qq.com/fcgi-bin/nlp/nlp_textchat",
    method: "post",
    data: { ...params }
}).then(res => {
    let obj = {
        question: message,
        answer: res.data.data.answer
    };
    this.talkList.push(obj);//聊天列表添加项
    this.msg = "";
    this.$nextTick(() => {
        let a = this.$refs.gundong; // 获取对象
        a.scrollTop = a.scrollHeight; // 滚动高度
    });
});
```

## 拼图游戏

```html
<li
    v-for="(val,index) in list"
    @click="move(index)"
    :style="val===''?{backgroundImage:'none'}:{backgroundPosition:-100*(val%3)+'px -'+100*Math.floor(val/3)+'px'}"
    :key="val"
    >{{val}}</li>
```

```js
export default {
    data() {
        return {
            list: []
        };
    },
    methods: {
        init() {
            let arr = [];
            for (var i = 0; i < 8; i++) {
                arr.push(i);
            }
            arr.push("");
            arr.sort(function() {
                return Math.random() - 0.5;
            });
            this.list = arr;
        },
        move(index) {
            let current = this.list[index],
                left = this.list[index - 1],
                right = this.list[index + 1],
                top = this.list[index - 3],
                bottom = this.list[index + 3];
            if (left === "" && index % 3 != 0) {
                this.$set(this.list, index - 1, current);
                // Vue.set(this.list,index-1,curret)
                this.$set(this.list, index, "");
            } else if (right === "" && index % 3 != 2) {
                this.$set(this.list, index + 1, current);
                this.$set(this.list, index, "");
            } else if (top === "") {
                this.$set(this.list, index - 3, current);
                this.$set(this.list, index, "");
            } else if (bottom === "") {
                this.$set(this.list, index + 3, current);
                this.$set(this.list, index, "");
            }
            this.pass();
        },
        // 验证是否闯关成功
        pass() {
            // 如果第九个是空
            if (this.list[8] === "") {
                // 让ispass等于 截取这个数组从0-7的元素,每一个的内容都等于索引，所有的都符合ele==index就返回true 如果一个不行就返回false
                let isPass = this.list.slice(0, 8).every(function(element, index, arr) {
                    // console.log(elem,index);
                    return element === index;
                });
                if (isPass) {
                    setTimeout(() => {
                        alert("闯关成功");
                        this.init();
                    }, 1000);
                }
            }
        }
    },
    created() {
        this.init();
        let obj = { title: "游戏", color: "game" };
        this.$emit("changeNav", obj);
    }
};
```




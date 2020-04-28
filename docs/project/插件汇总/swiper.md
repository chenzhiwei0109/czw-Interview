# swiper笔记和坑

## vue-swiper使用

```
npm install swiper vue-awesome-swiper --save
yarn add swiper vue-awesome-swiper
```

### **全局安装**

```js
import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// import style
import 'swiper/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
```

### **局部安装**

```js
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  }
}
```

Swiper.vue

```vue
<template>
  <swiper :options="swiperOptions">
    <swiper-slide>
      <img class="swiper-img" src="https://imgs.qunarzz.com/vc/6d/9f/35/b8ad5468f73fd60ec0ced086f6.jpg_92.jpg" alt />
    </swiper-slide>
    <swiper-slide>
      <img class="swiper-img" src="https://imgs.qunarzz.com/vc/e3/a1/71/f498dfd3bed948d623c9093252.jpg_92.jpg" alt />
    </swiper-slide>
    <swiper-slide>
      <img  class="swiper-img" src="https://imgs.qunarzz.com/vc/44/e9/86/95bc36c9e1c06ebd68bdfe222e.jpg_92.jpg" alt />
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  export default {
    name: "carrousel",
    data() {
      return {
        swiperOptions: {
          pagination: {
            el: ".swiper-pagination"
          },
          autoplay: {
            delay: 2000,
            //当用户滑动图片后继续自动轮播 默认为true：停止。
            disableOnInteraction: true
          }
        }
      };
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper;
      }
    },
    mounted() {
      console.log("Current Swiper instance object", this.swiper);
      this.swiper.slideTo(3, 1000, false);
    }
  };
</script>
<style lang="scss" scoped>
.swiper-img{
  width: 100%;
}
</style>
```

### 宽高自适应

```html
<div class="wrapper">
    <swiper :options="swiperOptions">
    </swiper>
</div>
```

```css
.wrapper {
    width: 100%;
    height: 0;
    overflow: hidden;
    padding-bottom: 31.25%;  //宽高比例相等，相对
    .swiper-img {
        width: 100%;
    }
}
```



```js
data() {
  return {
    swiperOptions: {
      pagination: {  //底部滑动小点 https://www.swiper.com.cn/api/pagination/362.html
        el: ".swiper-pagination"
      },
      effect : 'fade',//切换效果  		https://www.swiper.com.cn/api/effects/193.html  
      fadeEffect: {  //淡入淡出
          crossFade: true,
      }
    }
  };
},
```




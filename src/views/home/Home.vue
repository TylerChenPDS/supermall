<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>
    <tab-control
      ref="tabControl1"
      :ctitles="['流行','新款','精选']"
      @tabClick="tabClick"
      class="tab-control"
      v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pullUpLoad="true"
            @pullingUp="loadMore">
      <home-swipper
        :banners="banners"
        @swipperImageLoad="swipperImageLoad"></home-swipper>
      <home-recommend-view :recommends="recommend"></home-recommend-view>
      <home-feature-view></home-feature-view>
      <tab-control
        ref="tabControl2"
        :ctitles="['流行','新款','精选']"
        @tabClick="tabClick"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!--监听组件的点击必须这样-->
    <back-top v-show="isShow" @click.native="backTop"></back-top>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import HomeSwipper from "@/views/home/childComps/HomeSwipper";
  import HomeRecommendView from "./childComps/HomeRecommendView";
  import HomeFeatureView from "./childComps/HomeFeatureView";
  import GoodsList from "@/components/content/goods/GoodsList";
  import TabControl from "@/components/content/tabControl/TabControl";
  import Scroll from "@/components/common/scroll/Scroll";
  import BackTop from "@/components/content/backTop/BackTop";
  import {itemListenerMixin} from "../../common/mixin";

  import {
    getHomeMutidata,
    getHomeGoods
  } from "@/network/home";

  export default {
    name: "Home",
    components: {
      HomeFeatureView,
      HomeRecommendView,
      NavBar, HomeSwipper, GoodsList, TabControl, Scroll, BackTop
    },
    data() {
      return {
        result: null,
        banners: null,
        recommend: null,
        keywords: null,
        dKeyword: null,
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: "pop",
        isShow: false,
        tabOffsetTop: 0,
        isTabFixed: false, //tancontrol是否需要吸顶
        saveY: 0,

        // timer:null
      }

    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      //1,请求多个数据
      getHomeMutidata().then(res => {
        this.result = res;
        this.banners = res.data.banner.list;
        this.recommend = res.data.recommend.list;
        this.keywords = res.data.keywords;
        this.dKeyword = res.data.dKeyword;
      })
      //2，请求商品数据
      this.getHomeGoods("pop")
      this.getHomeGoods("new")
      this.getHomeGoods("sell")
    },
    mounted() {
      //监听图片加载完成
      //这个地方的代码 放到混入中复用
      // const refresh = debounce(this.$refs.scroll.refresh, 500)
      // this.itemImgListener = () => {
      //   // console.log("加载完成");
      //   // this.$refs.scroll.refresh(); 这个调用太频繁，如果调用一次，下一秒后才能调用下一次（防抖动）
      //   refresh();
      // }
      // this.$bus.$on("itemImageLoad", this.itemImgListener)

      //获取tabControl的OffsetTop
      // console.log(this.$refs.tabControl.$el);
    },
    mixins:[itemListenerMixin],
    methods: {
      /**
       * 网络请求相关方法
       * @param type
       */
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list) //传入可变参数
          this.goods[type].page++
        })
      },
      /**
       * 事件监听
       */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = "pop";
            break;
          case 1:
            this.currentType = "new";
            break;
          case 2:
            this.currentType = "sell";
            break;
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backTop() {
        this.$refs.scroll.scrollTo(0, 0);
      },
      contentScroll(position) {
        //判断backtop是否显示
        this.isShow = position.y < -1000 ? true : false
        //决定tabcontrol是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
        // console.log("上拉加载更多");
      },
      swipperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      }

    },
    activated() {
      // console.log("激活");
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      // console.log("失活");
      //离开时，保存home scroll.y的值
      this.saveY = this.$refs.scroll.scroll.y;

      //2,取消全局事件的监听
      this.$bus.$off("itemImageLoad",this.itemImgListener)
    }

  }

</script>

<style scoped="scoped">
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  /* vh 视口高度*/
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /*position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;*/
  }

  .content {
    height: calc(100% - 93px);
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

</style>

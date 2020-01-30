<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="navbar"></detail-nav-bar>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <detail-swipper :top-images="topImages" @imgageLoad="imageLoad"></detail-swipper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comments-info ref="comment" :comment-info="commentInfo"></detail-comments-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>

  </div>

</template>

<script>
  import DetailNavBar from "./childComponent/DetailNavBar";
  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "../../network/detail";
  import DetailSwipper from "./childComponent/DetailSwipper";
  import DetailBaseInfo from "./childComponent/DetailBaseInfo";
  import DetailShopInfo from "./childComponent/DetailShopInfo";
  import Scroll from "../../components/common/scroll/Scroll";
  import DetailGoodsInfo from "./childComponent/DetailGoodsInfo";
  import DetailParamInfo from "./childComponent/DetailParamInfo";
  import DetailCommentsInfo from "./childComponent/DetailCommentsInfo";
  import GoodsList from "../../components/content/goods/GoodsList";
  import {itemListenerMixin} from "../../common/mixin";
  import {debounce} from "../../common/utils";

  export default {
    name: "Detail",
    components: {
      DetailSwipper, DetailNavBar, DetailBaseInfo,
      DetailShopInfo, Scroll, DetailGoodsInfo, DetailParamInfo, DetailCommentsInfo, GoodsList
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopy: [],
        getThemeTopy: null,
        currentIndex: 0
      }
    },
    created() {
      //保存存入的iid
      this.iid = this.$route.params.iid

      //根据iid请求详细数据
      getDetail(this.iid).then(res => {
        console.log(res);
        const data = res.result
        //1,获取顶部的轮播数据
        this.topImages = data.itemInfo.topImages

        //2,获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //3,创建店铺信息
        this.shop = new Shop(data.shopInfo)

        //4,保存商品的详情数据
        this.detailInfo = data.detailInfo

        //5,获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //6，获取评论信息
        if (data.rate.cRate != 0) {
          this.commentInfo = data.rate.list[0]
        }
      })

      getRecommend().then(res => {
        this.recommends = res.data.list
      })

      this.getThemeTopy = debounce(() => {
        this.$refs.scroll.refresh()
        this.themeTopy = []
        this.themeTopy.push(0);
        this.themeTopy.push(this.$refs.params.$el.offsetTop)
        this.themeTopy.push(this.$refs.comment.$el.offsetTop)
        this.themeTopy.push(this.$refs.recommend.$el.offsetTop)
        console.log(this.themeTopy)
      }, 500)

    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
        this.getThemeTopy()
      },
      titleClick(index) {
        if (this.themeTopy[index] !== undefined)
          this.$refs.scroll.scrollTo(0, -this.themeTopy[index])
      },
      contentScroll(position) {
        // console.log(position);
        const positionY = -position.y

        //和主题中的值进行对比
        // console.log(positionY)
        for (let i = 0; i < this.themeTopy.length - 1; i++) {
          // console.log(i, this.themeTopy[i], this.themeTopy[i + 1])
          // if (this.currentIndex == i)
          //   continue
          // if (i != this.themeTopy.length - 1) {
          //   if (positionY >= this.themeTopy[i] && positionY < this.themeTopy[i + 1]) {
          //     this.currentIndex = i
          //     this.$refs.navbar.currentIndex = this.currentIndex
          //     break;
          //   }
          // } else {
          //   if (positionY >= this.themeTopy[i]) {
          //     this.currentIndex = i
          //     this.$refs.navbar.currentIndex = this.currentIndex
          //     break;
          //   }
          // }
          if (this.currentIndex !== i
            && ((i != this.themeTopy.length - 1
              && positionY >= this.themeTopy[i]
              && positionY < this.themeTopy[i + 1])
              || (i == this.themeTopy.length - 1
                && positionY >= this.themeTopy[i]))) {
            this.currentIndex = i
            this.$refs.navbar.currentIndex = this.currentIndex
            break;
          }

        }


      }
    },
    mounted() {

    },
    updated() {

    },
    destroyed() {
      this.$bus.$off("itemImageLoad", this.itemImgListener)
    },
    mixins: [itemListenerMixin]
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 10;
    background-color: #fff;
    height: 100vh;
  }

  .content {

    height: calc(100% - 44px);
  }

  .detail-nav {
    position: relative;
    z-index: 1;
    background-color: #fff;
  }
</style>

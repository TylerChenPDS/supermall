<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <span slot="center">购物车({{goodsCount}})</span>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <cart-list></cart-list>
    </scroll>

    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import Scroll from "../../components/common/scroll/Scroll";
  import NavBar from "../../components/common/navbar/NavBar";
  import CartList from "./childComponents/CartList";
  import CartBottomBar from "./childComponents/CartBottomBar";

  import { mapGetters } from 'vuex'
  export default {
    name: "Shopcart",
    components: {NavBar,CartList,Scroll,CartBottomBar},
    computed:{
      ...mapGetters(["goodsCount"]),//将getters中的方法混入组件
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped="scoped">
  .cart{
    height: 100vh;

  }
  .nav-bar{
    background-color: var(--color-tint);
    color: white;
    z-index: 10;
  }
  .content{
    height: calc(100% - 44px - 49px - 40px);
    overflow: hidden;
  }
</style>

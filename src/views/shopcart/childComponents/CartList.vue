<template>
<div class="cart-list">
  <cart-list-item v-for="(item,index) in cartList" :key="index" :product="item"></cart-list-item>
</div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import CartListItem from "./CartListItem";

  export default {
    name: "CartList",
    components:{
      CartListItem
    },
    computed: {
      // 使用对象展开运算符将 getter 混入 computed 对象中
      ...mapGetters([
        'cartList',
        // ...
      ])
    },

  }
</script>

<style scoped>
  .cart-list{

  }

</style>

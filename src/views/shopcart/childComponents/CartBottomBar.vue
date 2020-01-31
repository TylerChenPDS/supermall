<template>
  <div class="cart-bottom-bar">
    <div class="total-check">
      <check-button :is-check="isAllChecked"  @click.native="selectAllClick"></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">
      <span>合计：￥{{priceAndCount.price}}</span>
    </div>
    <div class="calc">
      去结算({{priceAndCount.count}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "../../../components/content/checkButton/CheckButton";
  import {SELECT_ALL} from "../../../store/mutation-types";
  import { mapGetters } from 'vuex'
  export default {
    name: "CartBottomBar",
    components:{
      CheckButton
    },
    methods:{
      selectAllClick(){
        if(this.isAllChecked)
          this.$store.commit(SELECT_ALL,false)
        else
          this.$store.commit(SELECT_ALL,true)
      }
    },
    computed:{
      ...mapGetters({
        priceAndCount :"getTotalCheckedPriceAndCheckedCount",
        isAllChecked: "isAllChecked"
      })
    }
  }
</script>

<style scoped>
  .cart-bottom-bar {
    width: 100%;
    height: 40px;
    position: fixed;
    bottom: 49px;
    background: #eeeeee;
    display: flex;
    line-height: 40px;
    text-align: center;
  }
  .total-check {
    width: 25%;
    display: flex;
    justify-content: center;
  }
  .total-price {
    width: 50%;
  }
  .calc {
    width: 25%;
    background-color: #ff5028;
    color:#fff;
  }
</style>

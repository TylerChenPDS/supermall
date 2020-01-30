<template>
  <swiper class="swiper">
    <swiper-item v-for="(item,index) in topImages" :key="item">
      <img :src="item" @load="imgageLoad" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from "@/components/common/swiper"

  export default {
    name: "DetailSwipper",
    components: {
      Swiper, SwiperItem
    },
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods:{
      imgageLoad(){
        this.$emit("imgageLoad")
      }
    }
  }
</script>

<style scoped>
  .swiper {
    height: 300px;
  }
</style>

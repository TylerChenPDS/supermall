<template>
  <swiper>
    <swiper-item v-for="(item,index) in banners" :key="item.background">
      <a :href="item.link">
        <img :src="item.image" @load="imageLoad" alt="">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from "@/components/common/swiper"

  export default {
    name: "HomeSwipper",
    data(){
      return {
        isLoad: false
      }
    },
    components: {
      Swiper, SwiperItem
    },
    props:{
      banners:{
        type:Array,
        default(){
          return []
        }
      }
    },
    methods:{
      imageLoad(){
        //只需要发送一次事件
        if(!this.isLoad){
          this.$emit("swipperImageLoad")
          this.isLoad = true
        }

      }
    }
  }
</script>

<style scoped>

</style>

<template>
<!--
  ref 如果是绑定在组件中的，通过this.$ref.refname获取到的是组件对象
  如果绑定的是普通元素，  通过this.$ref.refname获取到的元素对象。相当于document.query***()
-->
  <div class="wrapper" ref="wrapper">
    <div class="aaa">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props:{
      probeType: {
        type:Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default: false
      }

    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper,{
        click:true,
        probeType: this.probeType,
        //这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加
        pullUpLoad:this.pullUpLoad
      })
      if(this.probeType === 2|| this.probeType ===3){
        this.scroll.on("scroll",(position)=>{
          // console.log(position);
          this.$emit("scroll",position)
        })
      }
     if(this.pullUpLoad){
       this.scroll.on("pullingUp",()=>{
         //等数据请求完成后，将新的数据显示出来时
         this.$emit("pullingUp")
         setTimeout(()=>{
           this.scroll.finishPullUp();
         },2000)
       })
     }
    },
    methods:{
      scrollTo(x,y,time=1000){
        this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x,y,time)
      },
      refresh(){
        // console.log(111)
        this.scroll && this.scroll.refresh && this.scroll.refresh()
      }
    }
  }
</script>

<style scoped>
/*.aaa{*/
/*  height: 100%;*/
/*}*/
</style>

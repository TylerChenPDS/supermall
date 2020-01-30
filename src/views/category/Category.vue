<template>
  <div class="wrapper">

    <ul>
      <li><button @click="test">按钮</button></li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
    </ul>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name:"Category",
    created() { //组件创建完，但模板没有挂载

    },
    mounted() {
      //默认情况下，BScroll不能监听实时位置
      let wrapper = document.querySelector('.wrapper')
      let scroll = new BScroll(wrapper,{
        //0 1都是不监听
        //2，在手指滚动的过程中侦测，手机离开后的惯性不侦测
        //3，只要是滚动都侦测0
        probeType: 3,
        //这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加
        pullUpLoad:true
      })
      scroll.on("scroll",(position)=>{
        // console.log(position)
      })


      scroll.on("pullingUp",()=>{

        //等数据请求完成后，将新的数据显示出来时
        console.log("加载");
        setTimeout(()=>{
          scroll.finishPullUp();
        },2000)
      })
    },
    methods:{
      test(){
        console.log("aaaa");
      }
    }

  }
</script>

<style scoped="scoped">
  .wrapper{
    height: 150px;
    background-color: orange;
    overflow: hidden;
  }
</style>

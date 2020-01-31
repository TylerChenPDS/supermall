import {debounce} from "./utils";

export const itemListenerMixin = {
  data(){
    return {
      itemImgListener: null
    }
  },
  mounted(){
    //监听图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 500)
    this.itemImgListener = () => {
      // console.log("加载完成");
      // this.$refs.scroll.refresh(); 这个调用太频繁，如果调用一次，下一秒后才能调用下一次（防抖动）
      refresh();
    }
    this.$bus.$on("itemImageLoad",this.itemImgListener)
  }
}



import BackTop from "../components/content/backTop/BackTop";
export const backTopMixin = {

  data(){
    return {
      isShow : false
    }
  },
  components:{
    BackTop
  },
  methods:{
    backTop() {
      this.$refs.scroll.scrollTo(0, 0);
    }
  }
}

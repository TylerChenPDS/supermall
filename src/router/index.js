import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//配置懒加载
const home = () => import("@/views/home/Home.vue")
const category = () => import("@/views/category/Category.vue")
const shopcart = () => import("@/views/shopcart/Shopcart.vue")
const profile = () => import("@/views/profile/profile.vue")


const routes = [
  {
    path: "",
    redirect: "/home"
  },
  {
    path: "/home",
    component: home
  },
  {
    path: "/category",
    component: category
  },
  {
    path: "/profile",
    component: profile
  },
  {
    path: "/shopcart",
    component: shopcart
  }

]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

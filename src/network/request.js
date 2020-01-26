import axios from "axios"
export function request(config) {
  //创建axios的实例
  const instance = axios.create({
    baseURL: "http://123.207.32.32:8000",//123.207.32.32:8000/home/multidata
    timeout: 5000
  })
  // 对axios的请求拦截
  instance.interceptors.request.use(config => { //请求成功时 参数时配置信息
    // console.log(config)
    //一般做的事情
    //config 中的一些配置不符合服务器要求
    //每次发送网络请求时都需要在界面显示一个请求的图标
    //某些网络请求,必须携带一些特殊的信息,如token
    return config //这个地方必须return
  }, err => { //请求失败时
    console.log(err)
  })
  //对axios的响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res)
    return res.data //这个地方要return
  }, err => {

  })
  return instance(config)
}

export function request1(config, success, failure) {
  //创建axios的实例
  const instance = axios.create({
    baseURL: "http://123.207.32.32:8000",
    timeout: 5000
  })
  instance(config)
    .then(res => {
      success(res)
    })
    .catch(err => {
      failure(err)
    })
}

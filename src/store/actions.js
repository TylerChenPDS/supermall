import {ADD_NEW_PRODUCT, ADD_COUNTER} from "./mutation-types";

export default {
  addCart(context, payload) {
    return new Promise(((resolve, reject) => {
      // state.carList.push(payload)
      let oldProduct = null
      for (let item of context.state.carList) {
        if (item.iid === payload.iid) {
          oldProduct = item;
          break;
        }
      }
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        resolve("当前的商品数量加一")
      } else {
        context.commit(ADD_NEW_PRODUCT, payload)
        resolve("添加了一个新商品")
      }
    }))
  }
}

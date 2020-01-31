import {ADD_COUNTER,ADD_NEW_PRODUCT,SELECT_ALL} from "./mutation-types";

export default {
  //mutations 的唯一作用就是修改state中的状态
  //mutations 中的每个方法尽可能完成的事情比较单一
  [ADD_COUNTER](state,payload){ //商品数量加一
    payload.count ++;
  },
  [ADD_NEW_PRODUCT](state,payload){
    payload.count = 1
    state.carList.push(payload)
  },
  [SELECT_ALL](state,payload){//全选
    for(let item of state.carList){
      item.isCheck = payload
    }
  }
}

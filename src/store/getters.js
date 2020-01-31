export default {
  //获取商品的数量
  goodsCount(state){
    let all = 0;
    for(let item of state.carList){
      all += item.count
    }
    return all
  },
  cartList(state){
    return state.carList
  },
  getTotalCheckedPriceAndCheckedCount(state){
    let obj = {
      price: 0,
      count: 0
    }
    for(let item of state.carList){
      if(item.isCheck){
        obj.count += item.count
        obj.price += item.count * item.price
      }
    }
    return obj
  },
  isAllChecked(state){//是否是全选的状态
    let isAllChecked = true;
    for(let item of state.carList){
      if(!item.isCheck){
        isAllChecked = false;
        break;
      }
    }
    return isAllChecked
  }
}

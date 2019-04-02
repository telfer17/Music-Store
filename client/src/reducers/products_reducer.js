import {
  GET_PRODUCTS_BY_SALES,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_BRANDS,
  GET_TYPES,
  GET_PRODUCTS_TO_SHOP
  } from '../actions/types';

export default function(state={}, action){
  switch(action.type){
    case GET_PRODUCTS_BY_SALES:
      return {...state, bySold: action.payload}
    case GET_PRODUCTS_BY_ARRIVAL:
      return {...state, byArrival: action.payload}
    case GET_BRANDS:
      return {...state, brands: action.payload}
    case GET_TYPES:
      return {...state, types: action.payload}
    case GET_PRODUCTS_TO_SHOP:
      return {
        ...state,
        toShop: action.payload.models,
        toShopSize: action.payload.size
      }
    default:
      return state;
  }
}

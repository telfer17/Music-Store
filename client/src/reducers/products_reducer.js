import {
  GET_PRODUCTS_BY_SALES,
  GET_PRODUCTS_BY_ARRIVAL
  } from '../actions/types';

export default function(state={}, action){
  switch(action.type){
    case GET_PRODUCTS_BY_SALES:
      return {...state, bySold: action.payload}
    case GET_PRODUCTS_BY_ARRIVAL:
      return {...state, byArrival: action.payload}
    default:
    return state;
  }
}

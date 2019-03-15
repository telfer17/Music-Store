import axios from 'axios';
import {
  GET_PRODUCTS_BY_SALES,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_BRANDS,
  GET_MODELS
 } from './types';

 import { PRODUCT_SERVER } from '../components/utils/misc';

 export function getProductsBySales(){
   // ?sortBy=sold&order=desc&limit=4
   const request = axios.get(`${PRODUCT_SERVER}/models?sortBy=sold&order=desc&limit=4`)
                    .then(response => response.data);

    return {
      type: GET_PRODUCTS_BY_SALES,
      payload: request
    }

 }

 export function getProductsByArrival(){
   // ?
   const request = axios.get(`${PRODUCT_SERVER}/models?sortBy=createdAt&order=desc&limit=4`)
                    .then(response => response.data);

    return {
      type: GET_PRODUCTS_BY_ARRIVAL,
      payload: request
    }
 }


export function getBrands(){

  const request = axios.get(`${PRODUCT_SERVER}/brands`)
        .then(response => response.data);

  return {
    type: GET_BRANDS,
    payload: request
  }

}

export function getModels(){

  const request = axios.get(`${PRODUCT_SERVER}/models`)
        .then(response => response.data);

  return {
    type: GET_MODELS,
    payload: request
  }

}

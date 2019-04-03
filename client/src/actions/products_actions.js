import axios from 'axios';
import {
  GET_PRODUCTS_BY_SALES,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_BRANDS,
  GET_TYPES,
  GET_PRODUCTS_TO_SHOP,
  ADD_PRODUCT,
  CLEAR_PRODUCT
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
   const request = axios.get(`${PRODUCT_SERVER}/models?sortBy=createdAt&order=desc&limit=4`)
                    .then(response => response.data);

    return {
      type: GET_PRODUCTS_BY_ARRIVAL,
      payload: request
    }
 }

 export function getProductsToShop(skip, limit, filters = [], previousState = []){
   const data = {
     limit,
     skip,
     filters
   }

   const request = axios.post(`${PRODUCT_SERVER}/shop`, data)
          .then(response => {
            let newState = [
              ...previousState,
              ...response.data.models
            ];

            return {
              size: response.data.size,
              models: newState
            }
          });

    return {
      type: GET_PRODUCTS_TO_SHOP,
      payload: request
    }
 }

 export function addProduct(dataToSubmit){

   const request = axios.post(`${PRODUCT_SERVER}/model`, dataToSubmit)
          .then(response => response.data);

   return {
     type: ADD_PRODUCT,
     payload: request
   }
 }

 export function clearProduct(){
   return {
     type: CLEAR_PRODUCT,
     payload: ''
   }
 }

 /////////////////////////
 // CATEGORIES
 /////////////////////////


export function getBrands(){

  const request = axios.get(`${PRODUCT_SERVER}/brands`)
        .then(response => response.data);

  return {
    type: GET_BRANDS,
    payload: request
  }
}

export function getTypes(){

  const request = axios.get(`${PRODUCT_SERVER}/types`)
        .then(response => response.data);

  return {
    type: GET_TYPES,
    payload: request
  }
}

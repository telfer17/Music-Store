import axios from 'axios';
import {
  GET_PRODUCTS_BY_SALES,
  GET_PRODUCTS_BY_ARRIVAL
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

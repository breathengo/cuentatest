import axios from "axios";

export const USER_CREATE = "USER_CREATE";
export const PRODUCT_CREATE = "PRODUCT_CREATE";
export const GET_USER = "GET_USER";
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const PRICE_CREATE = "PRICE_CREATE";
export const LOADING = "LOADING";
export const GET_ALL_PRICES = "GET_ALL_PRICES";
export const PAYMENT_LINK_CREATE = "PAYMENT_LINK_CREATE";
export const PLAN_CREATE = "PLAN_CREATE";
export const  GET_ALL_PLANS = "GET_ALL_PLANS";

export function userCreate(payload) {
  return async (dispatch) => {
    try {
      const json = await axios.post(`http://localhost:3002/payment/createUser`, payload);
      console.log(json.data, "HOLA SOY JSON.DATA")
      return dispatch({
        type: USER_CREATE,
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}
// export function productCreate(payload) {
//   return async (dispatch) => {
//     console.log(payload, "HOLA SOY PAYLOAD")
//     try{
//       const json = await axios.post(`http://localhost:3002/payment/createProduct`, payload);
//       console.log(json.data, "HOLA SOY JSON.DATA DE CREATE PRODUCT")
//       return dispatch({
//         type: PRODUCT_CREATE,
//         payload: json.data,
//       });
//     } catch (err) {
//       console.log(err);
//     }
// }};


export function productCreate( payload, email) {
  return async (dispatch) => {
   console.log(email, "hola soy el email de la ACTION ")
   console.log(payload, "hola soy el payload de la ACTION ")
    try{
      dispatch({
        type:LOADING,
        payload:true,
      })
      const json = await axios.post(`http://localhost:3002/payment/createProduct?email=${email}`, payload);
      console.log(json.data, "HOLA SOY DATA DE CREATE PRODUCT DE LA ACTION")
      dispatch({
        type:LOADING,
        payload:false,
      })
      return dispatch({
        type: PRODUCT_CREATE,
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
}};

export function getUser(email) {
  return async (dispatch) => {
    //console.log(email, "hola soy el email")
    try{
      const json = await axios.get(`http://localhost:3002/users/getUser?email=${email}` );
      //console.log(json.data, "HOLA SOY DATA DE GET USE")
      return dispatch({
        type: GET_USER,
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
}};

export function getAllProducts(email){
  return async (dispatch) => {
    try{
      const json = await axios.get(`http://localhost:3002/payment/getAllProducts?email=${email}` );
      console.log(json.data, "HOLA SOY DATA DE GET ALL PRODUCTS")
      return dispatch({
        type: GET_ALL_PRODUCTS,
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
}}

export  function priceCreate(payload, email, productId) {
  console.log(payload,"soy el payload de la action de price")
  console.log(email,"soy el email de la action de price")
  return async(dispatch) => {
    try{
      dispatch({
        type:LOADING,
        payload:true,
      })
      const json = await axios.post(`http://localhost:3002/payment/createPrice/${productId}/?email=${email}`, payload);
      console.log(json.data, "HOLA SOY json.DATA DE CREATE PRICE")
      dispatch({
        type:LOADING,
        payload:false,
      })
      return dispatch({
        type: PRICE_CREATE,
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
}};


export function getAllPrices(email){
  return async (dispatch) => {
    try{
      const json = await axios.get(`http://localhost:3002/payment/getAllPrices?email=${email}` );
      console.log(json.data, "HOLA SOY DATA DE GET ALL PRICES")
      return dispatch({
        type: GET_ALL_PRICES,
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
}}
export  function paymentLinkCreate(payload, email, id) {
  console.log(payload,"soy el payload de la action de price")
  console.log(email,"soy el email de la action de price")
  return async(dispatch) => {
    try{
      dispatch({
        type:LOADING,
        payload:true,
      })
      const json = await axios.post(`http://localhost:3002/payment/paymentLink/${id}/?email=${email}`, payload);
      console.log(json.data, "HOLA SOY json.DATA DE payment link")
      dispatch({
        type:LOADING,
        payload:false,
      })
      return dispatch({
        type: PAYMENT_LINK_CREATE,
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
}};

export  function planCreate(payload, email, productId) {
  console.log(payload,"soy el payload A ")
  console.log(email,"soy el email A ")
  console.log(productId,"soy el productId   A  ")
  return async(dispatch) => {
    try{
      dispatch({
        type:LOADING,
        payload:true,
      })
      const json = await axios.post(`http://localhost:3002/payment/createPlan/${productId}/?email=${email}`, payload);
      console.log(json.data, "HOLA SOY json.DATA DE CREATE PRICE")
      dispatch({
        type:LOADING,
        payload:false,
      })
      return dispatch({
        type: PLAN_CREATE,
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
}};

export function getAllPlans(email){
  return async (dispatch) => {
    try{
      const json = await axios.get(`http://localhost:3002/payment/getAllPlans?email=${email}` );
      console.log(json.data, "HOLA SOY DATA DE GET ALL PRICES")
      return dispatch({
        type: GET_ALL_PLANS,
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
}}
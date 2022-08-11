import axios from "axios";

export const USER_CREATE = "USER_CREATE";
export const PRODUCT_CREATE = "PRODUCT_CREATE";
export const GET_USER = "GET_USER";


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
export function productCreate(payload) {
  return async (dispatch) => {
    try{
      const json = await axios.post(`http://localhost:3002/payment/createProduct`, payload);
      console.log(json.data, "HOLA SOY JSON.DATA")
      return dispatch({
        type: PRODUCT_CREATE,
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
}};
export function getUser() {
  return async (dispatch) => {
    try{
      const json = await axios.get(`http://localhost:3002/users/:email`, );
      console.log(json.data, "HOLA SOY GET_USER")
      return dispatch({
        type: GET_USER,
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
}};


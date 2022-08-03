import axios from "axios";

export const USER_CREATE = "USER_CREATE";


export function userCreate(payload) {
  return async (dispatch) => {
    try {
      const json = await axios.post(`http://localhost:3002/users/createUser`, payload);
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
  
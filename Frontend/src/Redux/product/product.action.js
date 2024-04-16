import {
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_LOADING,
  GET_PRODUCTS_SUCCESS,
} from "./product.types";

export const getProducts = () => (dispatch) => {
  dispatch({ type: GET_PRODUCTS_LOADING });
  try {
    fetch(`https://arba-assignment-n2dy.onrender.com/product`)
      .then((res) => res.json())
      .then((res) => {
        console.log("API Response:", res);
        let arr = res.products.map((e) =>
          !e.quantity ? { ...e, quantity: 1, added: false } : e
        );
        dispatch({ type: GET_PRODUCTS_SUCCESS, payload: arr });
        return arr;
      })
      .catch((error) => {
        console.error("Fetch Error:", error); 
        dispatch({ type: GET_PRODUCTS_ERROR });
      });
  } catch (error) {
    console.error("Try/Catch Error:", error); 
    dispatch({ type: GET_PRODUCTS_ERROR });
  }
};


export const ChangeQuanity = (data, id, val) => (dispatch) => {
  dispatch({ type: GET_PRODUCTS_LOADING });
  try {
    let arr = data?.map((e) => (e.id === id ? { ...e, quantity: val } : e));
    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: arr });
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_ERROR });
  }
};
export const AddtoCart = (data, id) => (dispatch) => {
  dispatch({ type: GET_PRODUCTS_LOADING });
  try {
    let arr = data?.map((e) => (e.id == id ? { ...e, added: true } : e))
    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: arr });
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_ERROR });
  }
};
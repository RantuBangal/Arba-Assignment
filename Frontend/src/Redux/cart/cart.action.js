import {
    GET_CARTS_ERROR,
    GET_CARTS_LOADING,
    GET_CARTS_SUCCESS,
  } from "./cart.types";
  
  export const addToCart = (productId) => (dispatch, getState) => {
    dispatch({ type: GET_CARTS_LOADING });
    try {
      const { cart } = getState();
      const updatedCart = cart.data.map((item) =>
        item._id === productId ? { ...item, added: true } : item
      );
      dispatch({ type: GET_CARTS_SUCCESS, payload: updatedCart });
    } catch (error) {
      dispatch({ type: GET_CARTS_ERROR });
    }
  };
  
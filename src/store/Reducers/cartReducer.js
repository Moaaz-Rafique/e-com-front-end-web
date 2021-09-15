import { REMOVE_CART, ADD_CART, SET_CARTS, SET_CART_COUNT } from "../types";

const INITIAL_STATE = {
  carts: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CARTS:
      return {
        ...state,
        carts: action.payload,
      };

    case ADD_CART:
      let newCarts = [...state.carts];

      newCarts[newCarts.findIndex((obj) => obj._id == action.payload._id)] =
        action.payload;
      return {
        ...state,
        carts: newCarts,
      };
    case SET_CART_COUNT:
      let updateCarts = [...state.carts];
      updateCarts[
        updateCarts.findIndex((obj) => obj._id == action.payload._id)
      ] = action.payload;

      return {
        ...state,
        carts: updateCarts,
      };
    case REMOVE_CART:
      let updatedCarts = [...state.carts];
      let index = updatedCarts.findIndex(
        (obj) => obj._id == action.payload._id
      );
      if (index > -1) {
        updatedCarts.splice(index, 1);
      }
      // console.log(updatedCarts);
      return {
        ...state,
        carts: updatedCarts,
      };
    default:
      return state;
  }
};

export default reducer;

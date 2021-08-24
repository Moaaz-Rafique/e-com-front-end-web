import { SET_CART } from "../types";

const INITIAL_STATE = {
  cart: {},
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;

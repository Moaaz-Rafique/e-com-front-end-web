import { SET_PRODUCT_DETAILS, SET_PRODUCT_LIST } from "../types";
const INITIAL_STATE = {
  product_list: [],
  product_details: {},
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PRODUCT_DETAILS:
      return {
        ...state,
        product_details: action.payload,
      };
    case SET_PRODUCT_LIST:
      return {
        ...state,
        product_list: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;

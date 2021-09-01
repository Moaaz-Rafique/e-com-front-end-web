import {
  SET_PRODUCT_DETAILS,
  SET_PRODUCT_LIST,
  SET_SIMILAR_PRODUCTS,
} from "../types";
const INITIAL_STATE = {
  product_list: [],
  product_details: {},
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PRODUCT_DETAILS:
      // console.log(action.payload);

      let product_detail = { ...state.product_details };
      product_detail[action.payload._id] = action.payload;
      return {
        ...state,
        product_details: product_detail,
      };
    case SET_PRODUCT_LIST:
      return {
        ...state,
        product_list: action.payload,
      };
    case SET_SIMILAR_PRODUCTS:
      return {
        ...state,
        similar: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;

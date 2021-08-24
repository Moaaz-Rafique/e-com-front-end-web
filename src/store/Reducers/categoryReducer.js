import { SET_CATEGORIES } from "../types";

const INTIAL_STATE = {
  categories: [{ color: "", title: "" }],
};

const reducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;

import { SET_USER_DETAILS, SET_CURRENT_USER } from "../types";

const INTIAL_STATE = {
  current_user: null,
  user_details: {
    name: "Guest User",
  },
};

const reducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER_DETAILS:
      return {
        ...state,
        user_details: action.payload,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        current_user: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;

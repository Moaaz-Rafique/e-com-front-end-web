import {
  SET_USER_DETAILS,
  SET_CURRENT_USER,
  LOGOUT_USER,
  SET_USERS,
} from "../types";

const INTIAL_STATE = {
  current_user: null,
  user_details: {
    _id: "6123a3b8b1094424685248cc",
    name: "Guest User",
  },
  users: [],
};

const reducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER_DETAILS:
      // console.log(action?.payload);
      return {
        ...state,
        current_user: action?.payload?._id,
        user_details: action.payload,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        current_user: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        current_user: null,
        user_details: null,
      };
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;

import { SET_CURRENT_ROUTE, SET_PREV_ROUTE } from "../types";

const INTIAL_STATE = {
  currentRoute:"",
  prevRoute:''
};

const reducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_ROUTE:
        console.log("i was here")
      return {
        ...state,
        currentRoute: action.payload,
      };
      case SET_PREV_ROUTE:
        console.log("i was here")
        return {
        ...state,
        prev: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;

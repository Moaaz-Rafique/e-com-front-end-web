import { ADD_CATEGORY, SET_CATEGORIES, UPDATE_CATEGORY_REDUX } from "../types";

const INTIAL_STATE = {
  categories: [{ _id: "", color: "", title: "" }],
};

const reducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case UPDATE_CATEGORY_REDUX:
      const newCategories = [...state.categories];
      const index = newCategories.findIndex(
        (obj) => obj?._id == action?.payload?._id
      );
      if (index > -1) {
        newCategories[index] = action.payload;
        // console.log(ne);
      }
      return {
        ...state,
        categories: newCategories,
      };
    case ADD_CATEGORY:
      const addedCategories = state.categories;
      const prevIndex = addedCategories.findIndex(
        (obj) => obj?._id == action?.payload?._id
      );
      if (prevIndex < 0) {
        addedCategories.push(action.payload);
      }
      return {
        ...state,
        categories: addedCategories,
      };

    default:
      return state;
  }
};

export default reducer;

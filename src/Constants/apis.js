const api = "/api";
const IS_DEV = false;
export const BASE_URL = IS_DEV
  ? `http://localhost:3001`
  : "https://thawing-fjord-25254.herokuapp.com";

// export const BASE_URL = "http://localhost:3001";
const URL = BASE_URL + api;

//Product apis
export const FETCH_ALL_PRODUCTS = `${URL}/catalog/products`;
export const FETCH_PRODUCT = `${URL}/catalog/product?`;
export const ADD_PRODUCT = `${URL}/catalog/product/add`;
export const REMOVE_PRODUCT = `${URL}/catalog/product/remove`;
export const UPDATE_PRODUCT = `${URL}/catalog/product/update`;

//Category apis
export const FETCH_CATEGORY = `${URL}/catalog/category`;
export const FETCH_ALL_CATEGORIES = `${URL}/catalog/categories`;
export const ADD_CATEGORY = `${URL}/catalog/category/add`;
export const REMOVE_CATEGORY = `${URL}/catalog/category/remove`;
export const UPDATE_CATEGORY = `${URL}/catalog/category/update`;

//Cart apis
export const FETCH_CART = `${URL}/catalog/cart`;
export const FETCH_ALL_CART = `${URL}/catalog/carts`;
export const ADD_CART = `${URL}/catalog/cart/add`;
export const REMOVE_CART = `${URL}/catalog/cart/remove`;
export const UPDATE_CART = `${URL}/catalog/cart/update`;
export const GET_CURRENT_CART = `${URL}/catalog/user/cart/current`;

//User apis
export const FETCH_ALL_USER = `${URL}/catalog/users`;
export const UPDATE_USER = `${URL}/catalog/user/update`;
export const FETCH_USER = `${URL}/catalog/user`;
export const LOGIN_USER = `${URL}/catalog/login`;
// export const SIGNUP_USER_WITH_EMAIL = `${URL}/catalog/signupwithemail`;
export const SIGNUP_USER = `${URL}/catalog/signup`;

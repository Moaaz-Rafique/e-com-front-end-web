import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import userReducer from "./Reducers/userReducer";
import productReducer from "./Reducers/productReducer";
import cartReducer from "./Reducers/cartReducer";
import categoryReducer from "./Reducers/categoryReducer";
import linkReducer from './Reducers/linkReducer.js'
const persistConfig = {
  key: "root",
  storage,
  blackList: [linkReducer]
};

const rootReducer = combineReducers({
  userReducer,
  productReducer,
  cartReducer,
  categoryReducer,
  linkReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configStore = () => {
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return { store, persistor };
};
export default configStore;

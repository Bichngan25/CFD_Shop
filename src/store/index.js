import thunkMiddleware from "redux-thunk";
import authReducer from "./reducer/authReducer";
import { ENV } from "../constants/environments";
import { configureStore } from "@reduxjs/toolkit";


// configureStore se thay the creastore
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  // configureStore sử dụng redux-thunk như default middleware
  // middleware: (getDefaultMiddleware) =>
  // 	getDefaultMiddleware().concat(thunkMiddleware),
  devTools: ENV === "development",
});

export default store;
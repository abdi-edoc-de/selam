import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);
const configureSt = () =>
  configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
  });
  export default configureSt
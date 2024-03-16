import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "../redux/user/userSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({ user: userReducer });

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const perReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: { user: perReducer },
});

export const persistor = persistStore(store);

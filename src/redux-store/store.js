import { combineReducers, configureStore } from "@reduxjs/toolkit";
import TodoSlice from "./TodoSlice";
import DialogSlice from "./DialogSlice";

const reducer = combineReducers({
  todo: TodoSlice,
  dialogBox: DialogSlice,
});

export const store = configureStore({
  reducer,
});

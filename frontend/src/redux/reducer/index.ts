import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "@/redux/reducer/user";
import taskReducer from "@/redux/reducer/task";

const appReducer = combineReducers({
  user: userReducer,
  task: taskReducer,
});

export default appReducer;

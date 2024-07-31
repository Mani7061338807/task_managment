import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "@/redux/reducer";

const store: any = configureStore({
  reducer: rootReducer,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

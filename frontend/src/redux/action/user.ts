import { AppDispatch } from "..";
import { setUser } from "../reducer/user";

export const userAction = (name: string, email: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setUser({ name, email }));
  };
};

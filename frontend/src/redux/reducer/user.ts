import { createSlice } from "@reduxjs/toolkit";

type IUser = {
  name: string;
  email: string;
};

const initialState: { user: IUser } = {
  user: {
    name: "",
    email: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

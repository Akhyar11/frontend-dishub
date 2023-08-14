import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "adminSlice",
  initialState: {
    username: "",
    statusLogin: false,
  },
  reducers: {
    updateAdmin: (state, action) => {
      state.username = action.payload.username;
      state.statusLogin = action.payload.statusLogin;
    },
  },
});

export const { updateAdmin } = adminSlice.actions;
export default adminSlice.reducer;

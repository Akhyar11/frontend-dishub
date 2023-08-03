import { createSlice } from "@reduxjs/toolkit";

const rambuSlice = createSlice({
  name: "rambuSlice",
  initialState: {
    total: 10,
  },
  reducers: {
    updateRambu: (state, actior) => {
      state.total = actior.payload.total;
    },
  },
});

export const { updateRambu } = rambuSlice.actions;
export default rambuSlice.reducer;

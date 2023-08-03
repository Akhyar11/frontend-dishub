import { createSlice } from "@reduxjs/toolkit";

const ruasJalanSlcie = createSlice({
  name: "RuasJalan",
  initialState: {
    total: 10,
  },
  reducers: {
    updateRuasJalan: (state, actior) => {
      state.total = actior.payload.total;
    },
  },
});

export const { updateRuasJalan } = ruasJalanSlcie.actions;
export default ruasJalanSlcie.reducer;

import { configureStore } from "@reduxjs/toolkit";
import ruasJalanReducer from "../utils/ruasJalanSlice";
import rambuReducer from "../utils/rambuSlice";

const store = configureStore({
  reducer: {
    ruasJalan: ruasJalanReducer,
    rambu: rambuReducer,
  },
});

export default store;

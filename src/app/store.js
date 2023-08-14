import { configureStore } from "@reduxjs/toolkit";
import ruasJalanReducer from "../utils/ruasJalanSlice";
import rambuReducer from "../utils/rambuSlice";
import adminReducer from "../utils/adminSlice";

const store = configureStore({
  reducer: {
    ruasJalan: ruasJalanReducer,
    rambu: rambuReducer,
    admin: adminReducer,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./slices/carsSlice";

export const store = configureStore({
  reducer: {
    cars: carsReducer,
  },
});

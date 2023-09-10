import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./slices/movieSlice";
import cartSlice from "./slices/cartSlice";


export const store = configureStore({
  reducer: {
    movies: movieSlice,
    carts:cartSlice
  },
});

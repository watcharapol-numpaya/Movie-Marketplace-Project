import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./slices/movieSlice";


export const store = configureStore({
  reducer: {
    movies: movieSlice,
 
  },
});

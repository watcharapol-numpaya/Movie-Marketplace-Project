import { configureStore } from "@reduxjs/toolkit";
import { movieSlice } from "./slices/movileSlice";

export const store = configureStore({
  reducer: { movies: movieSlice },
});

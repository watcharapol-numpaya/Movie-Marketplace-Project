import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartList: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
};

const cartSlice = createSlice({
  name: "cartList",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartList.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cartList));
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;

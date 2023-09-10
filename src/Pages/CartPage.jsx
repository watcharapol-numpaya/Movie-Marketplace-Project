import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartCard from "../component/CartCard";
import { clearItemInCart, removeItemFromCart } from "../storage/slices/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartList } = useSelector((state) => state.carts);
  const [imageUrl, setImageUrl] = useState(
    "https://www.themoviedb.org/t/p/w220_and_h330_face"
  );

  const handleRemoveItem = (cartItemId) => {
    dispatch(removeItemFromCart(cartItemId));
  };
  const handleClearAllItem = () => {
    dispatch(clearItemInCart());
  };

  const renderCartPage = () => {
    const renderItemList = () => {
      return (
        <div className="space-y-1">
          {cartList &&
            cartList.map((movie, index) => (
              <React.Fragment key={index}>
                <CartCard movie={movie} onRemove={handleRemoveItem} />
              </React.Fragment>
            ))}
        </div>
      );
    };

    return (
      <div className="xl:container mx-auto w-full h-full">
        <div className="flex p-2  h-full">
          <div className="bg-green-600 w-3/4 h-full  min-h-screen rounded-lg p-4  ">
            <div>
              <p className="text-xl font-semibold">My Cart</p>
              <div className={`${cartList.length!==0?"":"hidden"} w-full flex justify-end`}  >
                <button
                  onClick={handleClearAllItem}
                  className="bg-yellow-500 p-1 px-2 rounded-full text-base font-semibold"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            <div className="py-2">{renderItemList()}</div>
          </div>
          <div className="bg-green-400 flex w-1/4    rounded-lg   "></div>
        </div>
      </div>
    );
  };

  return <div className="w-full">{renderCartPage()}</div>;
};

export default CartPage;

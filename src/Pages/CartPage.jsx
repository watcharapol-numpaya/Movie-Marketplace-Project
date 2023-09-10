import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartCard from "../component/CartCard";
import {
  clearItemInCart,
  removeItemFromCart,
} from "../storage/slices/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartList } = useSelector((state) => state.carts);
  const [imageUrl, setImageUrl] = useState(
    "https://www.themoviedb.org/t/p/w220_and_h330_face"
  );
  const numberOfItem = cartList.length;
  const discount = numberOfItem >= 3 ? (numberOfItem >= 5 ? 20 : 10) : 0;
  const [totalPrice, setTotalPrice] = useState(0);
  const [summaryPrice, setSummaryPrice] = useState(0);

  useEffect(() => {
    calculatePrice();
  }, [discount,numberOfItem]);

  const handleRemoveItem = (cartItemId) => {
    dispatch(removeItemFromCart(cartItemId));
  };
  const handleClearAllItem = () => {
    dispatch(clearItemInCart());
  };

  const calculatePrice = () => {
    let sumPrice = 0;
    cartList.forEach((movie) => {
      sumPrice += parseInt(movie.price);
    });
    const totalPrice = sumPrice;
    setTotalPrice(totalPrice);

    const summaryPrice = sumPrice-(sumPrice * (discount / 100));
    setSummaryPrice(summaryPrice);
  };

  const renderOrderSummaryBar = () => {
    return (
      <div className="p-2  w-full">
        <p className="text-lg font-semibold ">Order Summary</p>

        <div id="details" className="  w-full px-4 mt-4 font-medium ">
          <div className="flex justify-between  w-full  ">
            <p>Total Price </p>
            <div>{totalPrice} ฿ </div>
          </div>
          <div className="flex justify-between  w-full   ">
            <p>Discount </p>
            <div>{discount}% </div>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between  w-full   ">
            <p>Summary Price</p>
            <div>{summaryPrice} ฿</div>
          </div>
        </div>
      </div>
    );
  };

  const renderCartPage = () => {
    const renderItemList = () => {
      return (
        <div className="space-y-1">
          {cartList &&
            cartList.map((movie) => (
              <React.Fragment key={movie.cartItemId}>
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
              <div
                className={`${
                  cartList.length !== 0 ? "" : "hidden"
                } w-full flex justify-end`}
              >
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
          <div className="bg-green-400 flex w-1/4 rounded-lg   ">
            {renderOrderSummaryBar()}
          </div>
        </div>
      </div>
    );
  };

  return <div className="w-full">{renderCartPage()}</div>;
};

export default CartPage;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartCard from "../component/CartCard";
import {
  clearItemInCart,
  removeItemFromCart,
} from "../storage/slices/cartSlice";
import CancelIcon from "@mui/icons-material/Cancel";
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
  const [showPopUp, setShowPopUp] = useState(false);

  useEffect(() => {
    calculatePrice();
  }, [discount, numberOfItem]);

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

    const summaryPrice = sumPrice - sumPrice * (discount / 100);
    setSummaryPrice(summaryPrice);
  };

  const handleShowPopUp = () => {
    setShowPopUp(true);
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
          <hr className="my-2" />
          <div className="flex justify-end  w-full  my-2 ">
            <button
              onClick={handleShowPopUp}
              className="bg-green-500 hover:bg-green-600 px-2 py-1 rounded-full"
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderPaymentPopUp = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white w-96 h-96 p-2 rounded-lg">
          <div className="flex justify-end">
            <button
              className="  top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={() => setShowPopUp(false)}
            >
              <CancelIcon />
            </button>
          </div>
          <div className="">
            <p className="font-semibold text-lg text-center ">Transfer To</p>
            <div className="flex justify-center">
              <div className="w-20 rounded-lg overflow-hidden  ">
                <img
                  src="https://play-lh.googleusercontent.com/TYntMuWUSpA900sMKKxncXq2bI3wsOnkOn0M3nQ3r-a4l8aiWNP0LQArBcUP4vIgJ0c"
                  alt="bank"
                />
              </div>
            </div>

            <p className=" text-center text-lg my-1">Bualuang bank</p>
            <p className=" text-center">Account Number: XXXX-XXXX-XXXX-XXXX </p>
            <div className="flex justify-center">
              <div className=" ">
                <div className="w-28 rounded-lg overflow-hidden  ">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                    alt="bank"
                  />
                </div>
                <p className="text-center">Ref:9999</p>
                <p className="text-center">{""} s</p>
              </div>
            </div>
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

  return (
    <div className="w-full ">
      {renderCartPage()}

      {showPopUp && renderPaymentPopUp()}
    </div>
  );
};

export default CartPage;

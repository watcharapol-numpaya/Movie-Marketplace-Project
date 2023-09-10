import React, { useState } from "react";
import ImageNotFound from "./ImageNotFound";
import CancelIcon from "@mui/icons-material/Cancel";

const CartCard = ({ movie, onRemove }) => {
  const [imageUrl, setImageUrl] = useState(
    "https://www.themoviedb.org/t/p/w220_and_h330_face"
  );

  const handleRemoveFromCart = () => {
 
    onRemove(movie.cartItemId);
  };

  return (
    <div className="flex justify-between w-full bg-white border-b border-gray-200 rounded-lg overflow-hidden">
      <div className="flex items-center h-44 p-2   ">
        <div className="w-28 h-40  rounded-lg overflow-hidden">
          {movie.poster_path ? (
            <img
              className="w-full h-full "
              src={`${imageUrl}/${movie.poster_path}`}
              alt="poster"
            />
          ) : (
            <ImageNotFound />
          )}
        </div>
        <div id="info" className="mx-2   h-full">
          <p className="font-medium text-lg">{movie.title}</p>{" "}
          <span className="text-base font-semibold">Price:</span>
          <span> {movie.price}</span>
        </div>
      </div>

      <div className="flex p-2">
        <div className="  flex flex-col-reverse w-40">
          <div>
            <span className="text-base font-semibold">Price:</span>
            <span> {movie.price} ฿</span>
          </div>
        </div>
        <div>
          <button className=" text-gray-500 hover:text-red-500" onClick={handleRemoveFromCart}>
            <CancelIcon fontSize="medium" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;

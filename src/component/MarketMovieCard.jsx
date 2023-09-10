import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link, useNavigate } from "react-router-dom";
import ImageNotFound from "./ImageNotFound";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const MarketMovieCard = ({ movie, onAddMovieToCart }) => {
  const [imageUrl, setImageURL] = useState(
    "https://www.themoviedb.org/t/p/w780"
  );

  const handleSelectMovie = () => {
    onAddMovieToCart(movie);
  };

  return (
    <>
      <div className="flex flex-col bg-white shadow-xl rounded-xl xsm:h-96 xsm:w-52  h-80  w-44   border-t border-gray-100 sm:hover:scale-105 p-2 relative cursor-pointer">
        <div className="xsm:w-48 xsm:h-72 w-40 h-60  rounded-xl overflow-hidden  ">
          {movie.poster_path ? (
            <img
              className=" h-full w-full "
              alt="poster"
              src={imageUrl + movie.poster_path}
            />
          ) : (
            <ImageNotFound className=" " />
          )}
        </div>

        <span className="font-medium pt-1 px-1 text-sm  overflow-hidden text-black">
          {movie.title}
        </span>
        <div className="absolute  rounded-r-lg text-black bg-amber-400 h-8 w-16 left-0 bottom-24 flex items-center justify-center">
          <span id="vote-point">฿{movie.price}</span>
        </div>
        <div className="absolute  rounded-l-lg rounded-tr-lg m-1 text-black top-0 right-0 bg-green-400 hover:bg-green-600 p-1 " onClick={handleSelectMovie}>
          <ShoppingCartIcon />
        </div>
      </div>
    </>
  );
};

export default MarketMovieCard;

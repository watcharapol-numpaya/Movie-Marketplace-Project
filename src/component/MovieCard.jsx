import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link, useNavigate } from "react-router-dom";
import ImageNotFound from "./ImageNotFound";
import { useDispatch, useSelector } from "react-redux";

const MovieCard = ({ movie }) => {
  const [imageUrl, setImageURL] = useState(
    "https://www.themoviedb.org/t/p/w780"
  );
  const dispatch = useDispatch();

  return (
    <>
      <Link to={`/movieInfo/${movie.id}`}>
        <div className="flex flex-col bg-white shadow-xl rounded-xl xsm:h-96 xsm:w-52  h-80  w-44   border-t border-gray-100 sm:hover:scale-105 p-2 relative   ">
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
            <span id="vote-point">฿1,000</span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default MovieCard;

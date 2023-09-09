import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMovieToMarket,
  getAllMovies,
  getMovieDetailByID,
} from "../storage/slices/movieSlice";
import MovieCard from "./../component/MovieCard";
import MarketMovieCard from "../component/MarketMovieCard";

const HomePage = () => {
  const { onSellMovieList, onSellMovieIdList } = useSelector(
    (state) => state.movies
  );
  const dispatch = useDispatch();

  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    const moviePromise = onSellMovieIdList.map((movie) => {
      return dispatch(getMovieDetailByID(movie.id));
    });

    const resultPromise = await Promise.all(moviePromise);

    resultPromise.forEach((movie) => {
      dispatch(addMovieToMarket(movie.payload));
    });
  };

  const handleAddToCart = (movieId) => {
    //add to card
  };

  const renderMovie = () => {
    return (
      <div className="flex gap-1 p-4 bg-red-600">
        {onSellMovieList &&
          onSellMovieList.map((movie) => (
            <React.Fragment key={movie.id}>
              <MarketMovieCard movie={movie} onSelectMovie={handleAddToCart} />;
            </React.Fragment>
          ))}
      </div>
    );
  };

  const renderHomePage = () => {
    return (
      <div className="xl:container mx-auto">
        <div>Market</div>
        <div className="  ">{renderMovie()}</div>
      </div>
    );
  };

  return <div className="h-full w-full  ">{renderHomePage()}</div>;
};

export default HomePage;

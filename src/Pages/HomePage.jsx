import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMovieToMarket,
  getAllMovies,
  getMovieDetailByID,
} from "../storage/slices/movieSlice";
import MovieCard from "./../component/MovieCard";
import MarketMovieCard from "../component/MarketMovieCard";
import AppPagination from "./../component/AppPagination";
import { addToCart } from "../storage/slices/cartSlice";
import { v4 as uuidv4 } from 'uuid';

const HomePage = () => {
  const {
    allMovie,
    onSellMovieList,
    onSellMovieIdList,
    totalPages,
    searchList,
  } = useSelector((state) => state.movies);
  const [page, setPage] = useState(1);
  const [selectMovie, setSelectMovie] = useState(null);
  const limitedTotalPages = totalPages > 500 ? 500 : totalPages;
  const isSearch = searchList.length !== 0;
  const showMovie = isSearch ? searchList : allMovie;

  const dispatch = useDispatch();

  useEffect(() => {}, []);

  // const fetchMovie = async () => {
  //   const moviePromise = onSellMovieIdList.map((movie) => {
  //     return dispatch(getMovieDetailByID(movie.id));
  //   });

  //   const resultPromise = await Promise.all(moviePromise);

  //   resultPromise.forEach((movie) => {
  //     dispatch(addMovieToMarket(movie.payload));
  //   });
  // };

  const handleAddToCart = (movie) => {
    const data = {
      id: movie.id,
      cartItemId:uuidv4(),
      title:movie.title,
      poster_path: movie.poster_path,
      price: movie.price,
    };

    dispatch(addToCart(data));
    //add to card
  };

  useEffect(() => {
    handleGetMovie();
  }, [page]);

  const handleGetMovie = () => {
    let data = { page: page };

    dispatch(getAllMovies(data));
  };

  const renderMovie = () => {
    return (
      <div className="w-full ">
        <div className={`${isSearch ? "hidden" : ""} flex justify-center `}>
          <AppPagination
            setPage={setPage}
            page={page}
            numberOfPage={limitedTotalPages}
          />
        </div>
        <div className="flex flex-wrap justify-center p-4 gap-6">
          {showMovie &&
            showMovie.map((movie) => (
              <React.Fragment key={movie.id}>
                <MarketMovieCard
                  movie={movie}
                  onAddMovieToCart={handleAddToCart}
                />
              </React.Fragment>
            ))}
        </div>
      </div>
    );
  };

  const renderHomePage = () => {
    return (
      <div className="xl:container mx-auto">
        <div className="py-4">
          <p className="uppercase font-semibold text-2xl">Market</p>
        </div>
        <div className=" flex w-full  ">{renderMovie()}</div>
      </div>
    );
  };

  return <div className="h-full w-full  ">{renderHomePage()}</div>;
};

export default HomePage;

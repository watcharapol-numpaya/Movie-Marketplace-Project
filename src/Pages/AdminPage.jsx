import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "./../storage/slices/movieSlice";
import MovieCard from "./../component/MovieCard";

const AdminPage = () => {
  const dispatch = useDispatch();
  const { allMovie } = useSelector((state) => state.movies);
  const [page, setPage] = useState(1);
  const [selectMovie, setSelectMovie] = useState({});

  useEffect(() => {
    handleGetMovie();
  }, []);

  const handleGetMovie = (genre) => {
    let data = { page: page };

    dispatch(getAllMovies(data));
  };

  const renderMovieEditSection = () => {
    return (
      <div className="p-4">
        <div className=" ">
          <span className="text-lg font-bold">TITLE:</span>
          <span className="text-md font-medium"> {selectMovie.title}</span>
        </div>
        <div>
          <span className="text-lg font-bold">ID:</span>
          <span className="text-md font-medium"> {selectMovie.id}</span>{" "}
        </div>

        <div>
          <label htmlFor="price">Price: </label>
          <input id="price"className="outline-none"/>
        </div>
      </div>
    );
  };

  const handleSelectMovie = (movieId) => {
    setSelectMovie(movieId);
  };

  const renderMovie = () => {
    return (
      <div className="flex flex-wrap justify-around gap-3 py-4">
        {allMovie &&
          allMovie.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onSelectMovie={handleSelectMovie}
            />
          ))}
      </div>
    );
  };

  const renderAdminPage = () => {
    return (
      <div className="xl:container mx-auto">
        {console.log(allMovie)}
        <div className="w-full flex  bg-red-200">
          <div className="w-4/6 bg-green-200 h-full">{renderMovie()}</div>
          <div className="w-2/6 bg-green-400 ">{renderMovieEditSection()}</div>
        </div>
      </div>
    );
  };
  return <div>{renderAdminPage()}</div>;
};

export default AdminPage;

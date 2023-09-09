import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "./../storage/slices/movieSlice";
import MovieCard from "./../component/MovieCard";

const AdminPage = () => {
  const dispatch = useDispatch();
  const { allMovie } = useSelector((state) => state.movies);
  const [page, setPage] = useState(1);

  useEffect(() => {
    handleGetMovie();
  }, []);

  const handleGetMovie = (genre) => {
    let data = { page: page };

    dispatch(getAllMovies(data));
  };

  const renderMovie = () => {
    return (
      <div className="flex flex-wrap justify-around gap-3 py-4">
        {allMovie &&
          allMovie.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    );
  };

  const renderAdminPage = () => {
    return (
      <div className="xl:container mx-auto">
        {console.log(allMovie)}
        <div className="w-full flex  bg-red-200">
          <div className="w-4/6 bg-green-200 h-full">{renderMovie()}</div>
          <div className="w-2/6 bg-green-400"></div>
        </div>
      </div>
    );
  };
  return <div>{renderAdminPage()}</div>;
};

export default AdminPage;

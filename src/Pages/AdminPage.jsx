import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies, updatePriceById } from "./../storage/slices/movieSlice";
import MovieCard from "./../component/MovieCard";

const AdminPage = () => {
  const dispatch = useDispatch();
  const { allMovie } = useSelector((state) => state.movies);
  const [page, setPage] = useState(1);
  const [selectMovie, setSelectMovie] = useState(null);
  const [newPrice, setNewPrice] = useState(0);

  useEffect(() => {
    handleGetMovie();
  }, []);

  const handleGetMovie = (genre) => {
    let data = { page: page };

    dispatch(getAllMovies(data));
  };

  const handleSetPrice = (e) => {
    setNewPrice(e.target.value);
  };
  const handleUpdatePrice = () => {
    const data = { id: selectMovie.id, price: parseInt(newPrice) };

    dispatch(updatePriceById(data));
  };

  const handleAddNewMovie = (e) => {
    e.preventDefault();

    if (text) {
      const newTodo = {
        id: uuidv4(),
        todo: text,
        isFinish:false
      };
      setTodoList([...todoList, newTodo]);
      setText("");
    }
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

        <div className="mt-2 flex">
          <label htmlFor="price">Price: </label>
          <input
            id="price"
            type="number"
            className="outline-none h-8 rounded-full p-2 ml-2"
            onChange={handleSetPrice}
          />
          <button
            onClick={handleUpdatePrice}
            className="h-8 ml-1 bg-red-200 p-1 px-2 font-medium rounded-full text-sm"
          >
            UPDATE
          </button>
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
        {/* {console.log(allMovie)} */}
        <div className="w-full flex  bg-red-200">
          <div className="w-4/6 bg-green-200 h-full">{renderMovie()}</div>
          <div className="w-2/6 bg-green-400  ">
            <p className="px-4 text-lg uppercase font-bold pt-4">Edit Form</p>
            {selectMovie !== null ? renderMovieEditSection() : ""}
          </div>
        </div>
      </div>
    );
  };
  return <div>{renderAdminPage()}</div>;
};

export default AdminPage;

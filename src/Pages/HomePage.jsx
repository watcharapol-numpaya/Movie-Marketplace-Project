import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllMovies } from "../storage/slices/movieSlice";

const HomePage = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getAllMovies())
  },[])

  const renderHomePage = () => {
    
    return <div className="xl:container mx-auto"></div>;
  };

  
  return <div className="h-full w-full bg-red-200">{renderHomePage()}</div>;
};

export default HomePage;

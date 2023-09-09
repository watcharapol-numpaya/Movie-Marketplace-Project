import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getMovieByKeyword } from "../storage/slices/movieSlice";


const SearchBar = () => {
  const dispatch = useDispatch()
  const handleSearch = (e)=>{
 
    dispatch(getMovieByKeyword(e.target.value))
  }
  

  return (
    <div className="relative flex shadow-sm rounded-full overflow-hidden">
      {/* {console.log(currentPath)} */}
      <input onChange={handleSearch} className="h-10 w-80   outline-none p-4 pr-12 " />
      <div className="h-10 w-12   absolute right-0 rounded-r-full flex justify-center items-center    ">
        <SearchIcon className=" " />
      </div>
    </div>
  );
};

export default SearchBar;

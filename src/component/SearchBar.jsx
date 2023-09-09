import React from "react";
import SearchIcon from "@mui/icons-material/Search";
const SearchBar = () => {
  return (
    <div className="relative flex shadow-ทก rounded-full overflow-hidden">
      <input className="h-10 w-80   outline-none p-4 pr-12    " />
      <div className="h-10 w-12   absolute right-0 rounded-r-full flex justify-center items-center    ">
        <SearchIcon className=" " />
      </div>
    </div>
  );
};

export default SearchBar;

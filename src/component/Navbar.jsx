import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
 

const Navbar = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const isAdminPage = currentPath==="/admin"?true:false

 

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);



  return (
    <div className="h-14 bg-blue-500">
      <div className="lg:container mx-auto">
        <div className="flex">
          <Link to="/home" className="w-2/12 h-14 flex items-center ">
            <p className="uppercase font-bold text-lg text-white cursor-default">
              Movie Marketplace
            </p>
          </Link>
          <div className={`${isAdminPage?"hidden":""} w-8/12 h-14   flex justify-center items-center `} >
            <SearchBar/>
          </div> 
          <div className={`${isAdminPage?"":"hidden"} w-8/12 h-14 `} >
          
          </div>
          <div className="w-2/12 h-14">
            <ul className="flex w-full h-full bg-red items-center cursor-pointer ">
              <li className=" w-full h-full   hover:bg-blue-600">
                <Link to="/home" className=" w-full h-full flex justify-center items-center">
                  <HomeIcon />
                  Home
                </Link>
              </li>
              <li className=" w-full h-full   hover:bg-blue-600">
                <Link to="/cart" className=" w-full h-full flex justify-center items-center relative">
                  <p className="absolute top-0 right-1 bg-yellow-400 rounded-full px-1 text-sm">
                    20
                  </p>
                  <ShoppingCartIcon />
                  Cart
                </Link>
              </li>
              <li className=" w-full h-full bg-red-400  hover:bg-red-600">
                <Link to="/admin" className=" w-full h-full flex justify-center items-center">
                  <SupervisorAccountIcon />
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

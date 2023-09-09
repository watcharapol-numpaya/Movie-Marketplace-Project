import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Route, Routes } from "react-router-dom";
import HomePage from "./component/HomePage";


const App = () => {
 
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/home" element={<HomePage/>}></Route>
      </Routes>
    </>
  );
};

export default App;

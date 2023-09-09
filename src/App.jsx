import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Route, Routes } from "react-router-dom";
 
import Navbar from "./component/Navbar";
import HomePage from "./Pages/HomePage";
import AdminPage from "./Pages/AdminPage";
import CartPage from "./Pages/CartPage";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/cart" element={<CartPage />} />

      </Routes>
    </>
  );
};

export default App;

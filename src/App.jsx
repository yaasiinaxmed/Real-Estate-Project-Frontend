import React from "react";

// Css
import "./App.css";

// Packages
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Pages
import Home from "./pages/home/Home";
import Properties from "./pages/properties/Properties";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="w-full">
      {/* Header  */}
      <Header/>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Properties" element={<Properties />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<SignUp />} />
      </Routes>

      {/* react-hot-toast container */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* footer */}
      <Footer/>
    </div>
  );
}

export default App;

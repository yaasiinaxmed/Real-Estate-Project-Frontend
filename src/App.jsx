import React, { useEffect, useState } from "react";

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
import PropertyDetails from "./pages/properties/PropertyDetails";
import PrivateRoute from "./PrivateRoute";
import AddProperty from "./pages/properties/AddProperty";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/Profile/EditProfile";

function App() {

  return (
    <div className="w-full">
      {/* Header  */}
      <Header />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Properties" element={<Properties />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/Property/:id/:property" element={<PropertyDetails/>} />

        {/* Private Routes */}
        <Route element={<PrivateRoute/>}>
          <Route path="Add-property" element={<AddProperty/>} />
          <Route path="Profile/:name" element={<Profile/>} />
          <Route path="Profile/Edit" element={<EditProfile/>} />
        </Route>
      </Routes>

      {/* react-hot-toast container */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* footer */}
      <Footer/>
    </div>
  );
}

export default App;

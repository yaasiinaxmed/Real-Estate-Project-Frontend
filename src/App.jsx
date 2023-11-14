import React from "react";

// Css
import "./App.css";

// Packages
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Pages
import Home from "./pages/home/Home";

function App() {
  return (
    <>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      {/* react-hot-toast container */}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;

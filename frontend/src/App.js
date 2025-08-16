import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./all css/Home.css";
import Nav from "./components.js/nav";
import Home from "./components.js/Home";
import Login from "./components.js/login";
import Pricing from "./components.js/Price";
import Work from "./components.js/Work";
import Support from "./components.js/support";
import Contact from "./components.js/contact";
import Register from "./components.js/Register";
import { AppProvider } from "./context/AppContext";

const AppWrapper = () => {
  const location = useLocation();
  const hideNav = location.pathname === "/" || location.pathname === "/signup";

  return (
    <>
      {!hideNav && <Nav />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/work" element={<Work />} />
        <Route path="/support" element={<Support />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <AppProvider>
      <div className="App">
        <AppWrapper />
      </div>
    </AppProvider>
  );
}

export default App;

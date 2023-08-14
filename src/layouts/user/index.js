import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Detail from "./Detail";
import Login from "../admin/login";

const User = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-gray-100">
              <Navbar />
              <div className="p-8 pt-28 lg:mx-72">
                <Dashboard />
              </div>
              <Footer />
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/detail/:id"
          element={
            <div className="min-h-screen bg-gray-100">
              <Navbar />
              <div className="p-8 pt-28 lg:mx-72">
                <Detail />
              </div>
              <Footer />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default User;

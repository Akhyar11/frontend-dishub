import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardAdmin from "./adminDashboard";
import Login from "./login";
import AddJalan from "./addJalan";
import Detail from "./detail";

const Admin = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/admin" element={<DashboardAdmin />} />
        <Route path="/dashboard/admin/add/jalan" element={<AddJalan />} />
        <Route path="/dashboard/admin/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Admin;

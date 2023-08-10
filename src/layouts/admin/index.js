import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardAdmin from "./adminDashboard";

const Admin = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard/admin" element={<DashboardAdmin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Admin;

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardAdmin from "./adminDashboard";
import Login from "./login";
import AddJalan from "./addJalan";
import Detail from "./detail";
import AddRambu from "./addRambu";
import AddGambar from "./addGambar";
import DetailRambu from "./detailRambu";
import UpdateJalan from "./editJalan";
import UpdateRambu from "./editRambu";
import UpdateStatus from "./editStatus";
import Riwayat from "./Riwayat";

const Admin = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/admin" element={<DashboardAdmin />} />
        <Route path="/dashboard/admin/riwayat" element={<Riwayat />} />
        <Route path="/dashboard/admin/add/jalan" element={<AddJalan />} />
        <Route
          path="/dashboard/admin/update/jalan/:id"
          element={<UpdateJalan />}
        />
        <Route path="/dashboard/admin/add/rambu/:id" element={<AddRambu />} />
        <Route
          path="/dashboard/admin/add/jalan/gambar/:id"
          element={<AddGambar />}
        />
        <Route
          path="/dashboard/admin/update/gambar/:id"
          element={<UpdateRambu />}
        />
        <Route
          path="/dashboard/admin/update/status/:id"
          element={<UpdateStatus />}
        />
        <Route path="/dashboard/admin/detail/:id" element={<Detail />} />
        <Route
          path="/dashboard/admin/detail/rambu/:id"
          element={<DetailRambu />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Admin;

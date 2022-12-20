import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MasterLayout from "../../layout/MasterLayout";
import LandingPage from "../../pages/LandingPage";
import SearchPage from "../../pages/SearchPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MasterLayout />}>
          <Route path="/" index element={<LandingPage />} />
          <Route path="/search" element={<SearchPage/>} />
          <Route path="/series" element={<div className="text-center my-5">This is series page</div>} />
          <Route path="/movies" element={<div className="text-center my-5">This is movie page</div>} />
          <Route path="/genre" element={<div className="text-center my-5">This is genre page</div>} />
          <Route path="/*" element={<Navigate to={"/"} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

import React from "react";
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavbarPageDriver from "./components/navbar/NavbarPageDriver";
import NavbarKosar from "./components/navbar/NavbarKosar";
import NavbarPelanggan from "./components/navbar/NavbarPelanggan";
import TampilanHome from "./components/TampilanHome";
import TampilanRegister from "./components/TampilanRegister";
import TampilanLogin from "./components/TampilanLogin";
import TampilanAdmin from "./components/TampilanAdmin";
import TambahKeluhan from "./components/TambahKeluhan";
import DetailKeluhan from "./components/DetailKeluhan";
import Welcome from "./components/Welcome";
import TampilanRegisterMitra from "./components/TampilanRegisterMitra";
import DriverLogin from "./components/DriverLogin";
import DriverAdmin from "./components/DriverAdmin";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={
              <>
                <NavbarPelanggan />
                <Routes>
                  <Route path="/" element={<TampilanHome />} />
                  <Route path="/home" element={<TampilanHome />} />
                  <Route path="/tambahkeluhan" element={<TambahKeluhan />} />
                  <Route path="/register" element={<TampilanRegister />} />
                  <Route
                    path="/registermitra"
                    element={<TampilanRegisterMitra />}
                  />
                  <Route path="/login" element={<TampilanLogin />} />
                  <Route path="/logindriver" element={<DriverLogin />} />
                  <Route path="/admindriver" element={<DriverAdmin />} />
                  <Route path="/admin" element={<TampilanAdmin />} />
                  <Route
                    path="/detailkeluhan/:keluhanid"
                    element={<DetailKeluhan />}
                  />
                </Routes>
              </>
            }
          />

          <Route
            path="/admindriver"
            element={
              <>
                <NavbarPageDriver />
                <DriverAdmin />
              </>
            }
          />
          <Route
            path="/admin"
            element={
              <>
                <NavbarKosar />
                <TampilanAdmin />
              </>
            }
          />
          <Route path="/detailkeluhan/:keluhanid" element={<DetailKeluhan />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

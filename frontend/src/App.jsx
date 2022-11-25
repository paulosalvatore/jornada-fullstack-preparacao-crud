import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./structure/header/Header.jsx";
import Footer from "./structure/footer/Footer.jsx";

import ReadAll from "./components/item/read-all/ReadAll.jsx";
import ReadById from "./components/item/read-by-id/ReadById.jsx";
import Create from "./components/item/create/Create.jsx";
import Update from "./components/item/update/Update.jsx";
import Delete from "./components/item/delete/Delete.jsx";

import "./App.css";

export default function App() {
  return (
    <div className="App">
      <Header />

      {/* Routes */}
      <div className="content">
        <Routes>
          {/* Item */}
          <Route path="/" exact={true} element={<ReadAll />} />
          <Route path="/view/:id" element={<ReadById />} />
          <Route path="/add" element={<Create />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/delete/:id" element={<Delete />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

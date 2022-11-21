import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./structure/header/Header.jsx";
import ReadAll from "./components/read-all/ReadAll.jsx";
import ReadById from "./components/read-by-id/ReadById.jsx";
import Create from "./components/create/Create.jsx";
import Update from "./components/update/Update.jsx";
import Delete from "./components/delete/Delete.jsx";
import Footer from "./structure/footer/Footer.jsx";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />

      {/* Routes */}
      <div className="content">
        <Routes>
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

export default App;

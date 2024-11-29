import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import Game from "./assets/components/Game";
import Menu from "./assets/components/Menu";
import PageNotFound from "./assets/components/PageNotFound";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<PageNotFound />} /> {/* Invalid path */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

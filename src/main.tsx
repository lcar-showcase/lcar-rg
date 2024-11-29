import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import Game from "./components/Game";
import MainMenu from "./components/MainMenu";
import PageNotFound from "./components/PageNotFound";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<MainMenu />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<PageNotFound />} /> {/* Invalid path */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

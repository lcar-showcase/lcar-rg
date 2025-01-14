import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router";
import "./index.css";
import Game from "./pages/game";
import MainMenu from "./pages/mainMenu";
import PageNotFound from "./pages/pageNotFound";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route index element={<MainMenu />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<PageNotFound />} /> {/* Invalid path */}
      </Routes>
    </HashRouter>
  </React.StrictMode>
);

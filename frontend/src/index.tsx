import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainScreen } from "./containers/MainScreen";
import { Register } from "./containers/Register";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<MainScreen />} />
    </Routes>
  </BrowserRouter>
);


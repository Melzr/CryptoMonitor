import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainScreen } from "./containers/MainScreen";
import { Login } from "./containers/Login";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<MainScreen />} />
    </Routes>
  </BrowserRouter>
);


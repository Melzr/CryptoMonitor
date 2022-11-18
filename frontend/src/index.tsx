import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainScreen } from "./containers/MainScreen";
import { Login } from "./containers/Login";
import Register from "./containers/Register";
import { Wallet } from "./containers/Wallet";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainScreen />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/wallet" element={<Wallet />} />
    </Routes>
  </BrowserRouter>
);


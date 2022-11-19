import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./containers/Login";
import MainScreen from "./containers/MainScreen";
import Register from "./containers/Register";
import { Wallet } from "./containers/Wallet";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/wallet" element={<Wallet />} />
      </Routes>
    </BrowserRouter>
  );
};

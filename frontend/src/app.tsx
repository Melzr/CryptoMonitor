import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./containers/Login";
import MainScreen from "./containers/MainScreen";
import Register from "./containers/Register";
import { Rules } from "./containers/Rules";
import { Wallet } from "./containers/Wallet";
import { store } from "./state";

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/rules" element={<Rules />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../containers/Login";
import { MainScreen } from "../containers/MainScreen";
import { NotFoundPage } from "../containers/NotFoundPage";
import { useAppSelector } from "../state";

export const Router = () => {
  const { token } = useAppSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <MainScreen /> : <Login />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

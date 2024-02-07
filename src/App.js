import logo from "./logo.svg";
import "./App.css";
import SideMenu from "./SideMenu/SideMenu";
import Home from "./Pages/Home/Home";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} path="/home" />
        <Route index element={<Login />} path="/" />
        <Route index element={<Login />} path="/login" />
        <Route index element={<SignUp />} path="/signup" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

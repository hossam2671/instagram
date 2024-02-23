import "./App.css";
import Home from "./Pages/Home/Home";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Store } from "./Redux/Store";
import { Provider } from "react-redux";
import Explore from "./Explore/Explore";
function App() {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} path="/home"/>
          <Route index element={<Login />} path="/" />
          <Route index element={<Login />} path="/login" />
          <Route index element={<SignUp />} path="/signup" />
          <Route index element={<Explore />} path="/explore" />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

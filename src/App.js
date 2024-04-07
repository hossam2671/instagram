import "./App.css";
import Home from "./Pages/Home/Home";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Store } from "./Redux/Store";
import { Provider } from "react-redux";
import Explore from "./Explore/Explore";
import SuggestedPage from "./SuggestedPage/SuggestedPage";
import PostPage from "./PostPage/PostPage";
import Profile from "./Profile/Profile";
function App() {
  
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} path="/home"/>
          <Route element={<Home />} path="/" />
          <Route element={<Login />} path="/login" />
          <Route element={<SignUp />} path="/signup" />
          <Route element={<Explore />} path="/explore" />
          <Route element={<SuggestedPage />} path="/suggested" />
          <Route element={<PostPage />} path="/postPage/:id" />
          <Route element={<Profile />} path="/profile/:id" />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

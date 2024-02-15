import "./App.css";
import Home from "./Pages/Home/Home";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Store } from "./Redux/Store";
import { Provider } from "react-redux";

function App() {
  const [posts, setPosts] = useState([]);
  function fetchPosts() {
    axios
      .get("http://localhost:5000/user/getPost", {
        params: { id: localStorage.getItem("user") },
      })
      .then((res) => {
        setPosts(res.data);
      });
  }
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={<Home posts={posts} fetchPosts={fetchPosts} />}
            path="/home"
          />
          <Route index element={<Login />} path="/" />
          <Route index element={<Login />} path="/login" />
          <Route index element={<SignUp />} path="/signup" />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

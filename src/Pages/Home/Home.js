import React, { useEffect, useState } from "react";
import SideMenu from "../../SideMenu/SideMenu";
import Post from "./Post/Post";
import style from "./Home.module.css";
import Suggest from "./Suggest/Suggest";
import axios from "axios";

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/user/getPost", {
        params: { id: localStorage.getItem("user") },
      })
      .then((res) => {
        setPosts(res.data);
      });
  }, []);
  return (
    <>
      <div style={{ display: "flex" }}>
        <SideMenu />
        <div className={style["posts"]}>
          {posts.map((post) => (
            <Post key={post._id} post={post}/>
          ))}
          {/* <Post />
          
          <Post /> */}
        </div>
        <Suggest />
      </div>
    </>
  );
}

export default Home;

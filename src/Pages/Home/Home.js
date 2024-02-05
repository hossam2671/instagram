import React from "react";
import SideMenu from "../../SideMenu/SideMenu";
import Post from "./Post/Post";
import style from "./Home.module.css";
import Suggest from "./Suggest/Suggest";

function Home() {
  return (
    <>
      <div style={{ display: "flex" }}>
        <SideMenu />
        <div className={style["posts"]}>
          <Post />
          <Post />
          <Post />
        </div>
        <Suggest />
      </div>
    </>
  );
}

export default Home;

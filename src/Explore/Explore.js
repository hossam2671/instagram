import React, { useEffect, useState } from "react";
import SideMenu from "../SideMenu/SideMenu";
import style from "./Explore.module.css";
import axios from "axios";
import TheExplore from "./TheExplore/TheExplore";

function Explore() {
  const { REACT_APP_INSTAGRAM_API_URL } = process.env;
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get(`${REACT_APP_INSTAGRAM_API_URL}user/explore`).then((res) => {
      setPosts(res.data);
    });
  }, []);
  return (
    <>
      <SideMenu />
      <div className={style["posts"]}>
        {posts.map((post) => (
          <TheExplore post={post} key={post._id} />
        ))}
      </div>
    </>
  );
}

export default Explore;

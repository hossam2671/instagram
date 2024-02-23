import React from "react";
import style from "./TheExplore.module.css";

function TheExplore({ post }) {
  return (
    <div className={style["img"]}>
      <img src={`http://localhost:5000/${post.img}`} alt="Post" />
      <div className={style["icons"]}>
        <div className={style["likes"]}>
          <h4>{post.likes?.length}</h4>
          <i class="fa-solid fa-heart"></i>
        </div>
        <div className={style["comments"]}>
          <h4>{post.comments?.length}</h4>
          <i class="fa-solid fa-comment"></i>
        </div>
      </div>
    </div>
  );
}

export default TheExplore;

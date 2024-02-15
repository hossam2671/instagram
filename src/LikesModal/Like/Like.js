import React, { useState } from "react";
import style from "./Like.module.css";
import axios from "axios";

function Like({ id }) {
  const [user, setUser] = useState({});
  const [followed, setFollowed] = useState(false);
  axios
    .get("http://localhost:5000/user/getUser", { params: { id: id } })
    .then((res) => {
      setUser(res.data);
    });
  axios
    .get("http://localhost:5000/user/getUser", {
      params: { id: localStorage.getItem("user") },
    })
    .then((res) => {
      if (res.data.follwing.includes(id)) {
        setFollowed(true);
      }
    });
  return (
    <div className={style["like"]}>
      <div className={style["info"]}>
        <img src={`http://localhost:5000/${user.img}`} />
        <div className={style["name"]}>
          <h4>{user.userName}</h4>
          <h4>{user.name}</h4>
        </div>
      </div>
      {followed ? (
        <h5 style={{ color: "black", backgroundColor: "#EFEFEF" }}>
          Following
        </h5>
      ) : (
        <h5>Follow</h5>
      )}
    </div>
  );
}

export default Like;

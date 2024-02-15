import React from "react";
import style from "./Suggestion.module.css";
import axios from "axios";

function Suggestion({ name, id, img }) {
  function follow() {
    axios.put("http://localhost:5000/user/follow", {
      follower: id,
      following: localStorage.getItem("user"),
    });
  }
  return (
    <div className={style["suggest"]}>
      <div className={style["info"]}>
        <img src={`http://localhost:5000/${img}`} />
        <div className={style["name"]}>
          <h5>{name}</h5>
          <h5>Suggested for you</h5>
        </div>
      </div>
      <h5 onClick={follow}>Follow</h5>
    </div>
  );
}

export default Suggestion;

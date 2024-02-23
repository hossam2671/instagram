import React, { useState } from "react";
import style from "./Suggestion.module.css";
import axios from "axios";

function Suggestion({ name, id, img }) {
  const [followed, setFollowed] = useState(false);

  axios.get("http://localhost:5000/user/getUser", {
      params: { id: localStorage.getItem("user") },
    })
    .then((res) => {
      if (res.data.follwing.includes(id)) {
        setFollowed(true);
      }
    });

    function follow(){
      axios.put("http://localhost:5000/user/follow",{
          follower:localStorage.getItem("user"),
          following:id
      }).then((res)=>{
          setFollowed(true)
      })
  }
  function unfollow(){
      axios.put("http://localhost:5000/user/unfollow",{
          follower:localStorage.getItem("user"),
          following:id
      }).then((res)=>{
          setFollowed(false)
      })
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
      {followed ? (
        <h5 onClick={unfollow} style={{ color: "#5b5b5b" }}>
          Following
        </h5>
      ) : (
        <h5 onClick={follow}>Follow</h5>
      )}
    </div>
  );
}

export default Suggestion;

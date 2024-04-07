import React, { useEffect, useState } from "react";
import style from "./Like.module.css";
import axios from "axios";

function Like({ id }) {
  const { REACT_APP_INSTAGRAM_API_URL } = process.env;
  const [user, setUser] = useState({});
  const [followed, setFollowed] = useState(false);
  useEffect(()=>{

    axios
      .get(`${REACT_APP_INSTAGRAM_API_URL}user/getUser`, { params: { id: id } })
      .then((res) => {
        setUser(res.data);
      });
    axios
      .get(`${REACT_APP_INSTAGRAM_API_URL}user/getUser`, {
        params: { id: localStorage.getItem("user") },
      })
      .then((res) => {
        let found = false;
        for (let i = 0; i < res.data.follwing.length; i++) {
          if (res.data.follwing[i]?._id === id) {
            setFollowed(true);
            found = true;
            break;
          }
        }
        if (!found) {
          setFollowed(false);
        }
      });
  },[])

  function follow() {
    axios
      .put(`${REACT_APP_INSTAGRAM_API_URL}user/follow`, {
        follower: localStorage.getItem("user"),
        following: id,
      })
      .then((res) => {
        setFollowed(true);
      });
  }
  function unfollow() {
    axios
      .put(`${REACT_APP_INSTAGRAM_API_URL}user/unfollow`, {
        follower: localStorage.getItem("user"),
        following: id,
      })
      .then((res) => {
        setFollowed(false);
      });
  }
  return (
    <div className={style["like"]}>
      <div className={style["info"]}>
        <img src={`${REACT_APP_INSTAGRAM_API_URL}${user.img}`} />
        <div className={style["name"]}>
          <h4>{user.userName}</h4>
          <h4>{user.name}</h4>
        </div>
      </div>
      {followed ? (
        <h5
          onClick={unfollow}
          style={{ color: "black", backgroundColor: "#EFEFEF" }}
        >
          Following
        </h5>
      ) : (
        <h5 onClick={follow}>Follow</h5>
      )}
    </div>
  );
}

export default Like;

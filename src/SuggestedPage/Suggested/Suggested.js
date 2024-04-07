import React, { useState } from "react";
import axios from "axios";
import style from "./Suggested.module.css";
import UserDetails from "../../UserDetails/UserDetails";

function Suggested({ name, id, img, userName, user }) {
  const { REACT_APP_INSTAGRAM_API_URL } = process.env;
  const [followed, setFollowed] = useState(false);
  const [following, setFollowing] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);

  axios
    .get(`${REACT_APP_INSTAGRAM_API_URL}user/getUser`, {
      params: { id: localStorage.getItem("user") },
    })
    .then((res) => {
      if (res.data.follwing.includes(id)) {
        setFollowed(true);
      }
      if (res.data.follwers.includes(id)) {
        setFollowing(true);
      }
    });

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
    <div style={{ position: "relative" }}>
      {showUserDetails && (
        <div
          onMouseEnter={() => setShowUserDetails(true)}
          onMouseLeave={() => setShowUserDetails(false)}
          className={style["userDetails"]}
        >
          <UserDetails user={user} />
        </div>
      )}
      <div className={style["suggest"]}>
        <div className={style["info"]}>
          <img
            onMouseEnter={() => setShowUserDetails(true)}
            onMouseLeave={() => setShowUserDetails(false)}
            src={`${REACT_APP_INSTAGRAM_API_URL}${img}`}
          />
          <div className={style["name"]}>
            <h5
              onMouseEnter={() => setShowUserDetails(true)}
              onMouseLeave={() => setShowUserDetails(false)}
            >
              {name}
            </h5>
            <h5>{userName}</h5>
            {following ? <h5>Suggested for you</h5> : <h5>Follows You</h5>}
          </div>
        </div>
        {followed ? (
          <h5
            onClick={unfollow}
            style={{ backgroundColor: "#efefef", color: "black" }}
          >
            Following
          </h5>
        ) : (
          <h5 onClick={follow}>Follow</h5>
        )}
      </div>
    </div>
  );
}

export default Suggested;

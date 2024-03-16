import React, { useEffect, useState } from "react";
import style from "./Suggestion.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setPost } from "../../../../Redux/Slices/Posts";
import UserDetails from "../../../../UserDetails/UserDetails";

function Suggestion({ name, id, img, user }) {
  const dispatch = useDispatch();
  const [followed, setFollowed] = useState(false);
  const [theUser, setTheUser] = useState({});
  const [showUserDetails, setShowUserDetails] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/user/getUser", {
        params: { id: user._id },
      })
      .then((res) => {
        setTheUser(res.data);
      });
  }, [setShowUserDetails]);
  axios
    .get("http://localhost:5000/user/getUser", {
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
  function getPost() {
    axios
      .get("http://localhost:5000/user/getPost", {
        params: { id: localStorage.getItem("user") },
      })
      .then((res) => {
        dispatch(setPost(res.data));
      });
  }

  function follow() {
    axios
      .put("http://localhost:5000/user/follow", {
        follower: localStorage.getItem("user"),
        following: id,
      })
      .then((res) => {
        setFollowed(true);
        getPost();
      });
  }
  function unfollow() {
    axios
      .put("http://localhost:5000/user/unfollow", {
        follower: localStorage.getItem("user"),
        following: id,
      })
      .then((res) => {
        setFollowed(false);
        getPost();
      });
  }
  return (
    <div className={style["suggest"]}>
      <div className={style["info"]}>
        {showUserDetails && (
          <div
            onMouseEnter={() => setShowUserDetails(true)}
            onMouseLeave={() => setShowUserDetails(false)}
            className={style["userDetails"]}
          >
            <UserDetails user={theUser} />
          </div>
        )}
        <img
          onMouseEnter={() => setShowUserDetails(true)}
          onMouseLeave={() => setShowUserDetails(false)}
          src={`http://localhost:5000/${img}`}
        />
        <div className={style["name"]}>
          <h5
            onMouseEnter={() => setShowUserDetails(true)}
            onMouseLeave={() => setShowUserDetails(false)}
          >
            {name}
          </h5>
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

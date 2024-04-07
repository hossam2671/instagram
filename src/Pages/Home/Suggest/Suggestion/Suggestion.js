import React, { useEffect, useState } from "react";
import style from "./Suggestion.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setPost } from "../../../../Redux/Slices/Posts";
import UserDetails from "../../../../UserDetails/UserDetails";
import { useNavigate } from "react-router-dom";

function Suggestion({ name, id, img, user }) {
  const { REACT_APP_INSTAGRAM_API_URL } = process.env;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [followed, setFollowed] = useState(false);
  const [theUser, setTheUser] = useState({});
  const [showUserDetails, setShowUserDetails] = useState(false);

  useEffect(() => {
    axios
      .get(`${REACT_APP_INSTAGRAM_API_URL}user/getUser`, {
        params: { id: user._id },
      })
      .then((res) => {
        setTheUser(res.data);
      });
  }, [setShowUserDetails]);
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
  function getPost() {
    axios
      .get(`${REACT_APP_INSTAGRAM_API_URL}user/getPost`, {
        params: { id: localStorage.getItem("user") },
      })
      .then((res) => {
        dispatch(setPost(res.data));
      });
  }

  function follow() {
    axios
      .put(`${REACT_APP_INSTAGRAM_API_URL}user/follow`, {
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
      .put(`${REACT_APP_INSTAGRAM_API_URL}user/unfollow`, {
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
          onClick={()=> navigate(`/profile/${id}`)}
          onMouseEnter={() => setShowUserDetails(true)}
          onMouseLeave={() => setShowUserDetails(false)}
          src={`${REACT_APP_INSTAGRAM_API_URL}${img}`}
        />
        <div className={style["name"]}>
          <h5
            onClick={()=> navigate(`/profile/${id}`)}
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

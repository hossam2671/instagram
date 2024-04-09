import React, { useEffect, useState } from "react";
import style from "./UserDetails.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setPost } from "../Redux/Slices/Posts";

function UserDetails({ user }) {
  const { REACT_APP_INSTAGRAM_API_URL , REACT_APP_IMAGE_URL } = process.env;
  const dispatch = useDispatch();
  const [followed, setFollowed] = useState(false);
  const [mine, setMine] = useState(false);
  useEffect(() => {
    user._id === localStorage.getItem("user") ? setMine(true) : setMine(false);
    axios
      .get(`${REACT_APP_INSTAGRAM_API_URL}user/getUser`, {
        params: { id: localStorage.getItem("user") },
      })
      .then((res) => {
        if (res.data.follwing.length > 0) {
          let found = false;
          for (let i = 0; i < res.data.follwing.length; i++) {
            if (res.data.follwing[i]?._id === user._id) {
              setFollowed(true);
              found = true;
              break;
            }
          }

          if (!found) {
            setFollowed(false);
          }
        }
      });
  }, []);

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
        following: user._id,
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
        following: user._id,
      })
      .then((res) => {
        setFollowed(false);
        getPost();
      });
  }
  return (
    <div className={style["userDetails"]}>
      <div className={style["userHeader"]}>
        <img src={`${REACT_APP_INSTAGRAM_API_URL}${user.img}`} />
        <div className={style["names"]}>
          <h3>{user.userName}</h3>
          <h3>{user.name}</h3>
        </div>
      </div>
      <div className={style["userNumbers"]}>
        <div className={style["userNumber"]}>
          <h4>{user.posts.length}</h4>
          <h4>Posts</h4>
        </div>
        <div className={style["userNumber"]}>
          <h4>{user.follwers.length}</h4>
          <h4>Followers</h4>
        </div>
        <div className={style["userNumber"]}>
          <h4>{user.follwing.length}</h4>
          <h4>Following</h4>
        </div>
      </div>
      <div className={style["userPosts"]}>
        {user.posts.length != 0 ? (
          user.posts
            .slice(0, 3)
            .map((post) => (
              <img key={post._id} src={`${REACT_APP_IMAGE_URL}${post.img}`} />
            ))
        ) : (
          <div className={style["noPosts"]}>
            <i class="fa-solid fa-camera"></i>
            <h3>No posts yet</h3>
            <p>
              When {user.userName} shares photos and reels, you'll see them
              here.
            </p>
          </div>
        )}
      </div>
      {mine ? (
        <h5 style={{ backgroundColor: "#d5d3d3", color: "black" }}>
          Edit Profile
        </h5>
      ) : followed ? (
        <h5
          onClick={unfollow}
          style={{ backgroundColor: "#d5d3d3", color: "black" }}
        >
          Following
        </h5>
      ) : (
        <h5 onClick={follow}>Follow</h5>
      )}
    </div>
  );
}

export default UserDetails;

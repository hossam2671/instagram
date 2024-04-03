import React, { useEffect, useState } from "react";
import style from "./Comment.module.css";
import axios from "axios";
import LikesModal from "../LikesModal/LikesModal";
import UserDetails from "../UserDetails/UserDetails";
import { useNavigate } from "react-router-dom";

function Comment({ user, comment }) {
  const navigate = useNavigate();
  const [theComment, setTheComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [opened, setOpened] = React.useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);

  const handleClose = (x) => {
    setOpened(false);
  };

  function getComment() {
    axios
      .get("http://localhost:5000/user/getComment", {
        params: { comment: comment },
      })
      .then((res) => {
        setTheComment(res.data);
        res.data.likes.includes(localStorage.getItem("user"))
          ? setLiked(true)
          : setLiked(false);
      });
  }
  useEffect(() => {
    getComment();
  }, []);

  function like() {
    axios
      .put("http://localhost:5000/user/likeComment", {
        user: localStorage.getItem("user"),
        comment: theComment._id,
      })
      .then((res) => {
        setLiked(true);
        getComment();
      });
  }
  function unlike() {
    axios
      .put("http://localhost:5000/user/unlikeComment", {
        user: localStorage.getItem("user"),
        comment: theComment._id,
      })
      .then((res) => {
        setLiked(false);
        getComment();
      });
  }
  return (
    <div style={{ position: "relative" }}>
      <LikesModal
        open={opened}
        handleClose={(x) => handleClose(x)}
        likes={theComment?.likes}
      />
      {showUserDetails && (
        <div
          onMouseEnter={() => setShowUserDetails(true)}
          onMouseLeave={() => setShowUserDetails(false)}
          onClick={() => navigate(`/profile/${user._id}`)}
          className={style["userDetails"]}
        >
          <UserDetails user={user} />
        </div>
      )}
      <div className={style["comment"]}>
        <div className={style["main"]}>
          <img
            onMouseEnter={() => setShowUserDetails(true)}
            onMouseLeave={() => setShowUserDetails(false)}
            onClick={() => navigate(`/profile/${user._id}`)}
            src={`http://localhost:5000/${theComment?.user?.img}`}
          />
          <div className={style["commentContent"]}>
            <div className={style["user"]}>
              <h4>
                <span
                  onMouseEnter={() => setShowUserDetails(true)}
                  onMouseLeave={() => setShowUserDetails(false)}
                  onClick={() => navigate(`/profile/${user._id}`)}
                >
                  {theComment.user?.userName}
                </span>
                {theComment.content}
              </h4>
            </div>
            <div className={style["info"]}>
              <h5>1h</h5>
              {theComment.likes?.length > 0 ? (
                <h5 onClick={() => setOpened(true)}>
                  {theComment.likes.length} Likes
                </h5>
              ) : (
                ""
              )}
              <h5>Reply</h5>
            </div>
          </div>
        </div>
        {liked ? (
          <i
            onClick={unlike}
            class="fa-solid fa-heart"
            style={{ color: "#ff0000" }}
          ></i>
        ) : (
          <i onClick={like} class="fa-regular fa-heart"></i>
        )}
      </div>
    </div>
  );
}

export default Comment;

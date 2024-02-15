import React, { useEffect, useState } from "react";
import style from "./Post.module.css";
import TextField from "@mui/material/TextField";
import axios from "axios";
import LikesModal from "../../../LikesModal/LikesModal";

function Post({ post }) {
  const [user, setUser] = useState({});
  const [thePost, setThePost] = useState({});
  const [liked, setLiked] = useState(false);
  const [opened, setOpened] = useState(false);
  const [date,setDate] = useState("")

  const handleClose = (x) => {
    setOpened(false);
  };
  function convertTimeDifference(milliseconds) {
    const minutes = Math.floor(milliseconds / (1000 * 60));
    if (minutes < 60) {
        return minutes + " m";
    }
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return hours + "h";
    }
    const days = Math.floor(hours / 24);
    if (days < 30) {
        return days + "d";
    }
    const months = Math.floor(days / 30);
    if (months < 12) {
        return months + "m";
    }
    const years = Math.floor(months / 12);
    return years + "y";
}
  function getPost() {
    axios
      .get("http://localhost:5000/user/getOnePost", {
        params: { post: post._id },
      })
      .then((res) => {
        setThePost(res.data);
        const timeDifference = new Date() - new Date(res.data.date)
        const convertedDifference = convertTimeDifference(timeDifference);
        setDate(convertedDifference)
      });
  }
  useEffect(() => {
    getPost();
    axios
      .get("http://localhost:5000/user/getUser", { params: { id: post.user } })
      .then((res) => {
        setUser(res.data);
      });
    if (post.likes.includes(localStorage.getItem("user"))) {
      setLiked(true);
    }
  }, []);

  function like() {
    axios
      .put("http://localhost:5000/user/like", {
        post: post._id,
        user: localStorage.getItem("user"),
      })
      .then((res) => {
        setLiked(true);
        getPost();
      });
  }

  function unlike() {
    axios
      .put("http://localhost:5000/user/unlike", {
        post: post._id,
        user: localStorage.getItem("user"),
      })
      .then((res) => {
        setLiked(false);
        getPost();
      });
  }
  return (
    <div className={style["post"]}>
      <LikesModal
        open={opened}
        handleClose={(x) => handleClose(x)}
        likes={thePost.likes}
      />
      <div className={style["head"]}>
        <div className={style["info"]}>
          <img src={`http://localhost:5000/${user.img}`} />
          <h4>{user.userName}</h4>
          <h5>{date}</h5>
        </div>
        <i class="fa-solid fa-ellipsis"></i>
      </div>
      <div className={style["img"]}>
        <img src={`http://localhost:5000/${post.img}`} />
      </div>
      <div className={style["icons"]}>
        <div className={style["left"]}>
          {liked ? (
            <i
              onClick={unlike}
              class="fa-solid fa-heart"
              style={{ color: "#ff0000" }}
            ></i>
          ) : (
            <i onClick={like} class="fa-regular fa-heart"></i>
          )}
          <i class="fa-regular fa-comment"></i>
          <i class="fa-regular fa-share-from-square"></i>
        </div>
        <i class="fa-regular fa-bookmark"></i>
      </div>
      <div className={style["likes"]}>
        <h5
          onClick={() => {
            setOpened(true);
          }}
        >
          {thePost.likes ? thePost.likes.length : 0} likes
        </h5>
      </div>
      <div className={style["content"]}>
        <h4>
          {user.userName} <span>{post.content}</span>
        </h4>
      </div>
      <div className={style["comment"]}>
        <h4>View all {post.comments.length} comments</h4>
        <TextField
          sx={{ width: "100%", marginTop: "10px" }}
          id="standard-helperText"
          placeholder="Add Comment..."
          variant="standard"
        />
      </div>
    </div>
  );
}

export default Post;

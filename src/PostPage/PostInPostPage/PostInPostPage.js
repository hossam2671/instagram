import React, { useEffect, useState } from "react";
import style from "./PostInPostPage.module.css";
import axios from "axios";
import PostDetails from "../../PostDetails/PostDetails";
import { useNavigate } from "react-router-dom";

function PostInPostPage({ post }) {
  const { REACT_APP_INSTAGRAM_API_URL , REACT_APP_IMAGE_URL } = process.env;
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const [user, setUser] = useState({});
  const [date, setDate] = useState("");
  const handleClose = (x) => {
    setOpened(false);
  };

  useEffect(() => {
    axios
      .get(`${REACT_APP_INSTAGRAM_API_URL}user/getUser`, { params: { id: post.user } })
      .then((res) => {
        setUser(res.data);
      });
    const timeDifference = new Date() - new Date(post.date);
    const convertedDifference = convertTimeDifference(timeDifference);
    setDate(convertedDifference);
  }, []);

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
  return (
    <div className={style["img"]}>
      <PostDetails
        open={opened}
        handleClose={(x) => handleClose(x)}
        post={post}
        user={user}
        date={date}
      />
      <div onClick={() => navigate(`/postPage/${post._id}`)} className={style["theImg"]}>
        <img src={`${REACT_APP_IMAGE_URL}${post.img}`} alt="Post" />
      </div>
      <div className={style["icons"]}>
        <div className={style["likes"]}>
          <h4>{post.likes?.length}</h4>
          <i class="fa-solid fa-heart"></i>
        </div>
        <div className={style["comments"]}>
          <h4>{post.comments?.length}</h4>
          <i class="fa-solid fa-comment"></i>
        </div>
      </div>
    </div>
  );
}

export default PostInPostPage;

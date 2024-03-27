import React, { useEffect, useState } from "react";
import style from "./PostPage.module.css";
import SideMenu from "../SideMenu/SideMenu";
import { useParams } from "react-router-dom";
import axios from "axios";
import LikesModal from "../LikesModal/LikesModal";
import AboutModal from "../AboutModal/AboutModal";
import OptionsModal from "../OptionsModal/OptionsModal";
import UnfollowModal from "../UnfollowModal/UnfollowModal";
import PostModal from "../PostModal/PostModal";
import Comment from "../Comment/Comment";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../Redux/Slices/Posts";

function PostPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [post, setPost] = useState({});
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [user, setUser] = useState({});
  const [saved, setSaved] = useState(false);
  const [opened, setOpened] = useState(false);
  const [opened3, setOpened3] = useState(false);
  const [opened4, setOpened4] = useState(false);
  const [opened5, setOpened5] = useState(false);
  const [opened6, setOpened6] = useState(false);
  const [liked, setLiked] = useState(false);
  const [date,setDate] = useState("")
  const [comment, setComment] = useState("")

  const handleClose2 = (x) => {
    setOpened(false);
  };
  const handleClose3 = (x) => {
    setOpened3(false);
    getPost();
  };
  const handleClose4 = (x) => {
    setOpened4(false);
    getPost();
  };
  const handleClose5 = (x) => {
    setOpened5(false);
    getPost();
  };
  const handleClose6 = (x) => {
    setOpened6(false);
    getPost();
  };

  function convertTimeDifference(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000)
    if (seconds < 60){
      return seconds + " s"
    }
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
    console.log(months)
    if (months < 12) {
      return months + "mo";
    }
    const years = Math.floor(months / 12);
    return years + "y";
  }

  function getPost() {
    axios
      .get("http://localhost:5000/user/getOnePost", {
        params: { post: id },
      })
      .then((res) => {
        setPost(res.data);
        const timeDifference = new Date() - new Date(res.data.date);
        const convertedDifference = convertTimeDifference(timeDifference);
        console.log(convertedDifference)
        setDate(convertedDifference);
        if (res.data.likes.includes(localStorage.getItem("user"))) {
          setLiked(true);
        } else {
          setLiked(false);
        }
        axios
          .get("http://localhost:5000/user/getUser", {
            params: { id: res.data.user},
          })
          .then((result) => {
            console.log(result)
            setUser(result.data);
          });
      });
  }

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
  function save() {
    axios
      .put("http://localhost:5000/user/save", {
        user: localStorage.getItem("user"),
        post: post._id,
      })
      .then((res) => {
        getPost();
        setSaved(true);
      });
  }
  function unsave() {
    axios
      .put("http://localhost:5000/user/unsave", {
        user: localStorage.getItem("user"),
        post: post._id,
      })
      .then((res) => {
        setSaved(false);
        getPost();
      });
  }

  function addComment() {
    if (comment) {
      axios
        .post("http://localhost:5000/user/addComment", {
          user: localStorage.getItem("user"),
          post: post._id,
          content: comment,
        })
        .then((res) => {
          getPost();
          setComment("");
          axios
            .get("http://localhost:5000/user/getPost", {
              params: { id: localStorage.getItem("user") },
            })
            .then((res) => {
              // dispatch(setPost(res.data));
            });
        });
    }
  }

  useEffect(() => {
    getPost();
    axios
      .get("http://localhost:5000/user/getUser", {
        params: { id: localStorage.getItem("user") },
      })
      .then((res) => {
        if (res.data.saved.includes(post._id)) {
          setSaved(true);
        } else {
          setSaved(false);
        }
      });
      axios.get("http://localhost:5000/user/getTopPosts",{
        params:{id : user._id}
      })
  }, []);
  return (
    <>
      <SideMenu />
      <LikesModal
            open={opened}
            handleClose={(x) => handleClose2(x)}
            likes={post?.likes}
          />
          <OptionsModal
            open={opened3}
            handleClose={(x) => handleClose3(x)}
            post={post}
            openUnfollowModal={() => setOpened4(true)}
            openAboutModal={() => setOpened5(true)}
            openPostModal={() => setOpened6(true)}
            user={user}
          />

          <UnfollowModal
            open={opened4}
            handleClose={(x) => handleClose4(x)}
            user={user}
          />
          <PostModal
            open={opened6}
            handleClose={(x) => handleClose6(x)}
            thePost={post}
            edit={true}
          />
          <AboutModal
            open={opened5}
            handleClose={(x) => handleClose5(x)}
            user={user}
          />
      <div className={style["postDetails"]}>
        <div className={style["img"]}>
          <img src={`http://localhost:5000/${post.img}`} />
        </div>
        <div className={style["post"]}>
          <div className={style["head"]}>
            <div className={style["user"]}>
              <img
                onMouseEnter={() => setShowUserDetails(true)}
                onMouseLeave={() => setShowUserDetails(false)}
                src={`http://localhost:5000/${user?.img}`}
              />
              <h4
                onMouseEnter={() => setShowUserDetails(true)}
                onMouseLeave={() => setShowUserDetails(false)}
              >
                {user.userName}
              </h4>
            </div>
            <i
              onClick={() => setOpened3(true)}
              class="fa-solid fa-ellipsis"
            ></i>
          </div>
          <div className={style["scroll"]}>
            <div className={style["content"]}>
              <img src={`http://localhost:5000/${user?.img}`} />
              <div className={style["user"]}>
                <h4>
                  <span>{user.userName}</span> {post?.content}
                </h4>
                <h5>{date}</h5>
              </div>
            </div>
            <div className={style["comments"]}>
              {post
                ? post?.comments?.map((comment) => (
                    <Comment key={comment._id} user={user} comment={comment} />
                  ))
                : post?.comments?.map((comment) => (
                    <Comment key={comment._id} user={user} comment={comment} />
                  ))}
            </div>
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
            {saved ? (
              <i onClick={unsave} class="fa-solid fa-bookmark"></i>
            ) : (
              <i onClick={save} class="fa-regular fa-bookmark"></i>
            )}
          </div>
          <div className={style["likes"]}>
            <h5 onClick={() => setOpened(true)}>
              {post?.likes ? post?.likes.length : 0} likes
            </h5>
            <h6>{date}</h6>
           
          </div>
        </div>
      </div>
    </>
  );
}

export default PostPage;

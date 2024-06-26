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
import PostInPostPage from "./PostInPostPage/PostInPostPage";
import Footer from "../Footer/Footer";

function PostPage() {
  const { REACT_APP_INSTAGRAM_API_URL , REACT_APP_IMAGE_URL } = process.env;
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
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");
  const [topPosts, setTopPosts] = useState([]);

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
    const seconds = Math.floor(milliseconds / 1000);
    if (seconds < 60) {
      return seconds + " s";
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
    console.log(months);
    if (months < 12) {
      return months + "mo";
    }
    const years = Math.floor(months / 12);
    return years + "y";
  }

  function getPost() {
    axios
      .get(`${REACT_APP_INSTAGRAM_API_URL}user/getOnePost`, {
        params: { post: id },
      })
      .then((res) => {
        setPost(res.data);
        const timeDifference = new Date() - new Date(res.data.date);
        const convertedDifference = convertTimeDifference(timeDifference);
        console.log(convertedDifference);
        setDate(convertedDifference);
        if (res.data.likes.includes(localStorage.getItem("user"))) {
          setLiked(true);
        } else {
          setLiked(false);
        }
        axios
          .get(`${REACT_APP_INSTAGRAM_API_URL}user/getUser`, {
            params: { id: res.data.user },
          })
          .then((result) => {
            console.log(result);
            setUser(result.data);
            axios
              .get(`${REACT_APP_INSTAGRAM_API_URL}user/getTopPosts`, {
                params: { id: result.data._id },
              })
              .then((resu) => {
                setTopPosts(resu.data);
              });
          });
      });
  }

  function like() {
    axios
      .put(`${REACT_APP_INSTAGRAM_API_URL}user/like`, {
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
      .put(`${REACT_APP_INSTAGRAM_API_URL}user/unlike`, {
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
      .put(`${REACT_APP_INSTAGRAM_API_URL}user/save`, {
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
      .put(`${REACT_APP_INSTAGRAM_API_URL}user/unsave`, {
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
        .post(`${REACT_APP_INSTAGRAM_API_URL}user/addComment`, {
          user: localStorage.getItem("user"),
          post: post._id,
          content: comment,
        })
        .then((res) => {
          getPost();
          setComment("");
          axios
            .get(`${REACT_APP_INSTAGRAM_API_URL}user/getPost`, {
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
      .get(`${REACT_APP_INSTAGRAM_API_URL}user/getUser`, {
        params: { id: localStorage.getItem("user") },
      })
      .then((res) => {
        if (res.data.saved.includes(post._id)) {
          setSaved(true);
        } else {
          setSaved(false);
        }
      });
  }, [id]);
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
      <div style={{ paddingTop: "5vh" }}>
        <div className={style["postDetails"]}>
          <div className={style["img"]}>
            <img src={`${REACT_APP_IMAGE_URL}${post.img}`} />
          </div>
          <div className={style["post"]}>
            <div className={style["head"]}>
              <div className={style["user"]}>
                <img
                  onMouseEnter={() => setShowUserDetails(true)}
                  onMouseLeave={() => setShowUserDetails(false)}
                  src={`${REACT_APP_IMAGE_URL}${user?.img}`}
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
                <img src={`${REACT_APP_IMAGE_URL}${user?.img}`} />
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
                      <Comment
                        key={comment._id}
                        user={user}
                        comment={comment}
                      />
                    ))
                  : post?.comments?.map((comment) => (
                      <Comment
                        key={comment._id}
                        user={user}
                        comment={comment}
                      />
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
            <div className={style["textField"]}>
              <img src={`${REACT_APP_IMAGE_URL}${user?.img}`} />
              <TextField
                placeholder="Add a comment"
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    border: "none",
                  },
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                    {
                      border: "none",
                    },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
                id="outlined-basic"
                variant="outlined"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <h4
                        onClick={addComment}
                        style={{
                          fontSize: "14px",
                          color: comment
                            ? "rgb(16 125 227)"
                            : "rgb(16 125 227 / 26%)",
                          fontWeight: "normal",
                          cursor: comment ? "pointer" : "",
                        }}
                      >
                        Post
                      </h4>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {topPosts.length > 0 && (
        <div className={style["userPosts"]}>
          <h3>
            More Posts From <span> {user.userName} </span>
          </h3>
          <div className={style["posts"]}>
            {topPosts
              .filter((post) => post._id !== id)
              .slice(0, 5)
              .map((post) => (
                <PostInPostPage post={post} key={post._id} />
              ))}
          </div>
        </div>
      )}
      <div className={style["footer"]}>
        <Footer />
      </div>
    </>
  );
}

export default PostPage;

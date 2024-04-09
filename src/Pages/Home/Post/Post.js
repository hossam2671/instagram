import React, { useEffect, useState } from "react";
import style from "./Post.module.css";
import TextField from "@mui/material/TextField";
import axios from "axios";
import LikesModal from "../../../LikesModal/LikesModal";
import PostDetails from "../../../PostDetails/PostDetails";
import InputAdornment from "@mui/material/InputAdornment";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../../Redux/Slices/Posts";
import OptionsModal from "../../../OptionsModal/OptionsModal";
import UnfollowModal from "../../../UnfollowModal/UnfollowModal";
import AboutModal from "../../../AboutModal/AboutModal";
import UserDetails from "../../../UserDetails/UserDetails";
import PostModal from "../../../PostModal/PostModal";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Loader/Loader";

function Post({ post, onDeletePost }) {
  const { REACT_APP_INSTAGRAM_API_URL , REACT_APP_IMAGE_URL } = process.env;
  const [user, setUser] = useState({});
  const [thePost, setThePost] = useState({});
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [opened, setOpened] = useState(false);
  const [date, setDate] = useState("");
  const [opened2, setOpened2] = useState(false);
  const [opened3, setOpened3] = useState(false);
  const [opened4, setOpened4] = useState(false);
  const [opened5, setOpened5] = useState(false);
  const [opened6, setOpened6] = useState(false);
  const [comment, setComment] = useState("");
  const [showUserDetails, setShowUserDetails] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose2 = (x) => {
    setOpened2(false);
    getPost();
  };

  const handleClose = (x) => {
    setOpened(false);
    getPost();
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
  function UnfollowModalOpen() {
    setOpened4(true);
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
              dispatch(setPost(res.data));
            });
        });
    }
  }
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
        params: { post: post._id },
      })
      .then((res) => {
        setThePost(res.data);
        const timeDifference = new Date() - new Date(res.data.date);
        const convertedDifference = convertTimeDifference(timeDifference);
        console.log(convertedDifference);
        setDate(convertedDifference);
        if (res.data.likes.includes(localStorage.getItem("user"))) {
          setLiked(true);
        } else {
          setLiked(false);
        }
      });
    axios
      .get(`${REACT_APP_INSTAGRAM_API_URL}user/getPost`, {
        params: { id: localStorage.getItem("user") },
      })
      .then((res) => {
        dispatch(setPost(res.data));
      });
  }
  useEffect(() => {
    getPost();
    axios
      .get(`${REACT_APP_INSTAGRAM_API_URL}user/getUser`, { params: { id: post.user } })
      .then((res) => {
        setUser(res.data);
      });
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
  }, [opened4, opened3, opened2]);

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
        setSaved(true);
        getPost();
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
  return (
    <>
    {
      thePost ?(
    <div className={style["post"]}>
      <LikesModal
        open={opened}
        handleClose={(x) => handleClose(x)}
        likes={thePost.likes}
      />
      <PostDetails
        open={opened2}
        handleClose={(x) => handleClose2(x)}
        post={thePost}
        user={user}
        date={date}
        onDeletePost={onDeletePost}
      />
      <PostModal
        open={opened6}
        handleClose={(x) => handleClose6(x)}
        thePost={post}
        edit={true}
      />
      <OptionsModal
        open={opened3}
        handleClose={(x) => handleClose3(x)}
        post={thePost}
        openUnfollowModal={() => setOpened4(true)}
        openAboutModal={() => setOpened5(true)}
        onDeletePost={onDeletePost}
        openPostModal={() => setOpened6(true)}
        user={user}
      />

      <UnfollowModal
        open={opened4}
        handleClose={(x) => handleClose4(x)}
        user={user}
      />
      <AboutModal
        open={opened5}
        handleClose={(x) => handleClose5(x)}
        user={user}
      />
      {showUserDetails && (
        <div
          onMouseEnter={() => setShowUserDetails(true)}
          onMouseLeave={() => setShowUserDetails(false)}
          className={style["userDetails"]}
        >
          <UserDetails user={user} />
        </div>
      )}
      <div className={style["head"]}>
        <div className={style["info"]}>
          <img
            onClick={() => navigate(`/profile/${user._id}`)}
            onMouseEnter={() => setShowUserDetails(true)}
            onMouseLeave={() => setShowUserDetails(false)}
            src={`${REACT_APP_IMAGE_URL}${user.img}`}
          />
          <h4
            onClick={() => navigate(`/profile/${user._id}`)}
            onMouseEnter={() => setShowUserDetails(true)}
            onMouseLeave={() => setShowUserDetails(false)}
          >
            {user.userName}
          </h4>
          <h5>{date}</h5>
        </div>
        <i onClick={() => setOpened3(true)} class="fa-solid fa-ellipsis"></i>
      </div>
      <div onDoubleClick={like} className={style["img"]}>
        <img src={`${REACT_APP_IMAGE_URL}${post.img}`} />
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
          <i
            onClick={() => {
              setOpened2(true);
            }}
            class="fa-regular fa-comment"
          ></i>
          <i class="fa-regular fa-share-from-square"></i>
        </div>
        {saved ? (
          <i onClick={unsave} class="fa-solid fa-bookmark"></i>
        ) : (
          <i onClick={save} class="fa-regular fa-bookmark"></i>
        )}
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
      {post.content && (
        <div className={style["content"]}>
          <h4>
            {user.userName} <span>{post.content}</span>
          </h4>
        </div>
      )}
      <div className={style["comment"]}>
        <h4
          onClick={() => {
            setOpened2(true);
          }}
        >
          View all {post.comments.length} comments
        </h4>
        <TextField
          sx={{ width: "100%", marginTop: "10px" }}
          id="standard-helperText"
          placeholder="Add Comment..."
          variant="standard"
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
                    color: comment ? "rgb(16 125 227)" : "rgb(16 125 227 / 2%)",
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
      ) : <Loader></Loader>
    }
    </>
    
  );
}

export default Post;

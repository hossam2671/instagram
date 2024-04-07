import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import style from "./PostDetails.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputAdornment from "@mui/material/InputAdornment";
import Comment from "../Comment/Comment";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../Redux/Slices/Posts";
import LikesModal from "../LikesModal/LikesModal";
import UserDetails from "../UserDetails/UserDetails";
import OptionsModal from "../OptionsModal/OptionsModal";
import UnfollowModal from "../UnfollowModal/UnfollowModal";
import AboutModal from "../AboutModal/AboutModal";
import PostModal from "../PostModal/PostModal";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  width: 1100,
  height: "700px",
};

function PostDetails({ open: op, handleClose: close, post, user, date, onDeletePost }) {
  const { REACT_APP_INSTAGRAM_API_URL } = process.env;
  const [comment, setComment] = React.useState("");
  const [thePost, setThePost] = React.useState(post);
  const [liked, setLiked] = React.useState(false);
  const [opened, setOpened] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [showUserDetails, setShowUserDetails] = React.useState(false);
  const [opened3, setOpened3] = React.useState(false);
  const [opened4, setOpened4] = React.useState(false);
  const [opened5, setOpened5] = React.useState(false);
  const [opened6, setOpened6] = React.useState(false);
  const dispatch = useDispatch();
  const handleClose = (x) => {
    close(x);
  };
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
  React.useEffect(() => {
    if (post?.likes?.includes(localStorage.getItem("user"))) {
      setLiked(true);
    } else {
      setLiked(false);
    }
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
    
  }, [op, opened3, opened4, opened6]);

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

  function getPost() {
    axios
      .get(`${REACT_APP_INSTAGRAM_API_URL}user/getOnePost`, {
        params: { post: post._id },
      })
      .then((res) => {
        setThePost(res.data);
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

  return (
    <div>
      <Modal
        open={op}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <LikesModal
            open={opened}
            handleClose={(x) => handleClose2(x)}
            likes={thePost?.likes}
          />
          <OptionsModal
            open={opened3}
            handleClose={(x) => handleClose3(x)}
            post={thePost}
            openUnfollowModal={() => setOpened4(true)}
            openAboutModal={() => setOpened5(true)}
            openPostModal={() => setOpened6(true)}
            user={user}
            onDeletePost={onDeletePost}
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
          {showUserDetails && (
            <div
              onMouseEnter={() => setShowUserDetails(true)}
              onMouseLeave={() => setShowUserDetails(false)}
              className={style["userDetails"]}
            >
              <UserDetails user={user} />
            </div>
          )}
          <div className={style["postDetails"]}>
            <div className={style["img"]}>
              <img src={`${REACT_APP_INSTAGRAM_API_URL}${post.img}`} />
            </div>
            <div className={style["post"]}>
              <div className={style["head"]}>
                <div className={style["user"]}>
                  <img
                    onMouseEnter={() => setShowUserDetails(true)}
                    onMouseLeave={() => setShowUserDetails(false)}
                    src={`${REACT_APP_INSTAGRAM_API_URL}${user.img}`}
                  />
                  <h4
                    onMouseEnter={() => setShowUserDetails(true)}
                    onMouseLeave={() => setShowUserDetails(false)}
                  >
                    {user.userName}
                  </h4>
                </div>
                <i onClick={() => setOpened3(true)} class="fa-solid fa-ellipsis"></i>
              </div>
              <div className={style["scroll"]}>
                <div className={style["content"]}>
                  <img src={`${REACT_APP_INSTAGRAM_API_URL}${user.img}`} />
                  <div className={style["user"]}>
                    <h4>
                      <span>{user.userName}</span> {thePost?.content}
                    </h4>
                    <h5>{date}</h5>
                  </div>
                </div>
                <div className={style["comments"]}>
                  {thePost
                    ? thePost?.comments?.map((comment) => (
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
                  {thePost?.likes ? thePost?.likes.length : 0} likes
                </h5>
                <h6>{date}</h6>
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
        </Box>
      </Modal>
    </div>
  );
}

export default PostDetails;

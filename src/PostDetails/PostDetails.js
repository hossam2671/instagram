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

function PostDetails({ open: op, handleClose: close, post, user, date }) {
  const [comment, setComment] = React.useState("");
  const [thePost, setThePost] = React.useState(post);
  const [liked, setLiked] = React.useState(false);
  const [opened, setOpened] = React.useState(false);
  const dispatch = useDispatch();
  const handleClose = (x) => {
    close(x);
  };
  const handleClose2 = (x) => {
    setOpened(false);
  };
  React.useEffect(() => {
    if (post?.likes?.includes(localStorage.getItem("user"))) {
      setLiked(true);
    } else {
      setLiked(false);
    }
    getPost();
  }, [op]);

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
              dispatch(setPost(res.data));
            });
        });
    }
  }

  function getPost() {
    axios
      .get("http://localhost:5000/user/getOnePost", {
        params: { post: post._id },
      })
      .then((res) => {
        setThePost(res.data);
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
    console.log("j");
    axios.put("http://localhost:5000/user/save", {
      user: localStorage.getItem("user"),
      post: post._id,
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
          <div className={style["postDetails"]}>
            <div className={style["img"]}>
              <img src={`http://localhost:5000/${post.img}`} />
            </div>
            <div className={style["post"]}>
              <div className={style["head"]}>
                <div className={style["user"]}>
                  <img src={`http://localhost:5000/${user.img}`} />
                  <h4>{user.userName}</h4>
                </div>
                <i class="fa-solid fa-ellipsis"></i>
              </div>
              <div className={style["scroll"]}>
                <div className={style["content"]}>
                  <img src={`http://localhost:5000/${user.img}`} />
                  <div className={style["user"]}>
                    <h4>
                      <span>{user.userName}</span> {post.content}
                    </h4>
                    <h5>{date}</h5>
                  </div>
                </div>
                <div className={style["comments"]}>
                  {thePost
                    ? thePost?.comments?.map((comment) => (
                        <Comment key={comment} user={user} comment={comment} />
                      ))
                    : post?.comments?.map((comment) => (
                        <Comment key={comment} user={user} comment={comment} />
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
                <i onClick={save} class="fa-regular fa-bookmark"></i>
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
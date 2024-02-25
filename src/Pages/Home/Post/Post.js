import React, { useEffect, useState } from "react";
import style from "./Post.module.css";
import TextField from "@mui/material/TextField";
import axios from "axios";
import LikesModal from "../../../LikesModal/LikesModal";
import PostDetails from "../../../PostDetails/PostDetails";
import InputAdornment from "@mui/material/InputAdornment";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../../Redux/Slices/Posts";

function Post({ post }) {
  const [user, setUser] = useState({});
  const [thePost, setThePost] = useState({});
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [opened, setOpened] = useState(false);
  const [date, setDate] = useState("");
  const [opened2, setOpened2] = useState(false);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const handleClose2 = (x) => {
    setOpened2(false);
    getPost();
  };

  const handleClose = (x) => {
    setOpened(false);
    getPost()
  };

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
        const timeDifference = new Date() - new Date(res.data.date);
        const convertedDifference = convertTimeDifference(timeDifference);
        setDate(convertedDifference);
        if (res.data.likes.includes(localStorage.getItem("user"))) {
          setLiked(true);
        } else {
          setLiked(false);
        }
      });
  }
  useEffect(() => {
    getPost();
    axios
      .get("http://localhost:5000/user/getUser", { params: { id: post.user } })
      .then((res) => {
        setUser(res.data);
      });
    axios
      .get("http://localhost:5000/user/getUser", { params: { id: localStorage.getItem("user") } })
      .then((res) => {
        if(res.data.saved.includes(post._id)){
          setSaved(true)
        }
        else{
          setSaved(false)
        }
      });
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

  function save() {
    console.log("j");
    axios.put("http://localhost:5000/user/save", {
      user: localStorage.getItem("user"),
      post: post._id,
    }).then((res)=>{
      setSaved(true)
    })
  }
  function unsave() {
    console.log("j");
    axios.put("http://localhost:5000/user/unsave", {
      user: localStorage.getItem("user"),
      post: post._id,
    }).then((res)=>{
      setSaved(false)
    })
  }
  return (
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
      <div className={style["content"]}>
        <h4>
          {user.userName} <span>{post.content}</span>
        </h4>
      </div>
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
  );
}

export default Post;

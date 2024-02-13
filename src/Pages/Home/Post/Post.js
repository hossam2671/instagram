import React, { useEffect, useState } from "react";
import style from "./Post.module.css";
import profile from "../../../assets/119986446_3340727139310180_8618841474764541280_n.jpg";
import main from "../../../assets/Mark-Wahlberg-Boogie-Nights-092223-tout-475d412a47654d36837474cf32f47ffb.jpg";
import TextField from '@mui/material/TextField';
import axios from "axios";

function Post({post}) {
  const [user,setUser] = useState({})
  useEffect(()=>{
    axios.get("http://localhost:5000/user/getUser",{params:{id:post.user}}).then((res)=>{
      setUser(res.data)
    })
  },[])
  return (
    <div className={style["post"]}>
      <div className={style["head"]}>
        <div className={style["info"]}>
          <img src={`http://localhost:5000/${user.img}`} />
          <h4>{user.userName}</h4>
          <h5>21h</h5>
        </div>
        <i class="fa-solid fa-ellipsis"></i>
      </div>
      <div className={style["img"]}>
        <img src={`http://localhost:5000/${post.img}`} />
      </div>
      <div className={style["icons"]}>
        <div className={style["left"]}>
          <i class="fa-regular fa-heart"></i>
          <i class="fa-regular fa-comment"></i>
          <i class="fa-regular fa-share-from-square"></i>
        </div>
        <i class="fa-regular fa-bookmark"></i>
      </div>
      <div className={style["likes"]}>
        <h5>{post.likes.length} likes</h5>
      </div>
      <div className={style["content"]}>
        <h4>
          {user.userName}{" "}
          <span>{post.content}</span>
        </h4>
      </div>
      <div className={style["comment"]}>
        <h4>{post.comments.length} comments</h4>
        <TextField
        sx={{width:"100%", marginTop:"10px"}}
          id="standard-helperText"
          placeholder="Add Comment..."
          variant="standard"
        />

      </div>
    </div>
  );
}

export default Post;

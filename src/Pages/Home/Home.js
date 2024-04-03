import React, { useEffect, useState } from "react";
import SideMenu from "../../SideMenu/SideMenu";
import Post from "./Post/Post";
import style from "./Home.module.css";
import Suggest from "./Suggest/Suggest";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../Redux/Slices/Posts";
import { useNavigate } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.PostSlice);
  const navigate = useNavigate();
  function getPost(){
    axios
      .get("http://localhost:5000/user/getPost", {
        params: { id: localStorage.getItem("user") },
      })
      .then((res) => {
        dispatch(setPost(res.data));
      }).catch((err)=>{
        navigate("/login")
      })
  }
  useEffect(() => {
    getPost()
  }, []);
  return (
    <>
      <div style={{ display: "flex" }}>
        <SideMenu onclose />
        <div className={style["posts"]}>
          {
            posts.length > 0 ?
          (posts.map((post) => (
            <Post key={post._id} post={post} onDeletePost={getPost}/>
          ))):<h4>There are no posts to show</h4>
          }
        </div>
        <Suggest />
      </div>
    </>
  );
}

export default Home;

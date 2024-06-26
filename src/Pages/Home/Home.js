import React, { useEffect, useState } from "react";
import SideMenu from "../../SideMenu/SideMenu";
import Post from "./Post/Post";
import style from "./Home.module.css";
import Suggest from "./Suggest/Suggest";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../Redux/Slices/Posts";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";


function Home() {
  const { REACT_APP_INSTAGRAM_API_URL } = process.env;
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.PostSlice);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  function getPost(){
    axios
      .get(`${REACT_APP_INSTAGRAM_API_URL}user/getPost`, {
        params: { id: localStorage.getItem("user") },
      })
      .then((res) => {
        dispatch(setPost(res.data));
        setLoading(false);
      }).catch((err)=>{
        navigate("/login")
        setLoading(false);
      })
  }
  useEffect(() => {
    getPost()
  }, []);
  return (
    <>
    {
      !loading ? (

      <div style={{ display: "flex" }}>
        <SideMenu onclose />
        <div className={style["posts"]}>
          {
            posts.length > 0 ?
          (posts?.map((post) => (
            <Post key={post._id} post={post} onDeletePost={getPost}/>
          ))):<h4>There are no posts to show</h4>
          }
        </div>
        <Suggest />
      </div>
      ) : <Loader />
    }
    </>
  );
}

export default Home;

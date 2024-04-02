import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideMenu from "../SideMenu/SideMenu";
import style from "./Profile.module.css";
import axios from "axios";

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/user/getUser", { params: { id: id } })
      .then((res) => {
        setUser(res.data);
      });
    axios
      .get("http://localhost:5000/user/userPosts", { params: { id: id } })
      .then((res) => {
        setPosts(res.data);
      });
    axios
      .get("http://localhost:5000/user/userSavedPosts", { params: { id: id } })
      .then((res) => {
        setSavedPosts(res.data)
      });
  }, []);
  return (
    <div>
      <SideMenu />
      <div className={style["profile"]}>
        <div className={style["info"]}>
          <div className={style["img"]}>
            <img src={`http://localhost:5000/${user.img}`} />
          </div>
          <div className={style["details"]}>
            <div className={style["name"]}>
              <h3>{user.userName}</h3>
              <h4>Edit profile</h4>
              <h4>Log out</h4>
            </div>
            <div className={style["numbers"]}>
              <div className={style["number"]}>
                <h3>{user.posts?.length}</h3>
                <h4>post</h4>
              </div>
              <div className={style["number"]}>
                <h3>{user.follwers?.length}</h3>
                <h4>followers</h4>
              </div>
              <div className={style["number"]}>
                <h3>{user.follwing?.length}</h3>
                <h4>following</h4>
              </div>
            </div>
            <div className={style["bio"]}>
              <h3>{user.name}</h3>
              {user.bio && <h4>{user.bio}</h4>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

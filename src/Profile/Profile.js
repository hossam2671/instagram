import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideMenu from "../SideMenu/SideMenu";
import style from "./Profile.module.css";
import axios from "axios";

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost:5000/user/getUser", { params: { id: id } })
      .then((res) => {
        setUser(res.data);
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
            </div>
            <div className={style["numbers"]}>
              <div className={style["number"]}>
                {user.posts?.length}
                <h4>post</h4>
              </div>
              <div className={style["number"]}>
                {user.follwers?.length}
                <h4>followers</h4>
              </div>
              <div className={style["number"]}>
                {user.follwing?.length}
                <h4>following</h4>
              </div>
            </div>
            <div className={style["bio"]}>
                <h3>{user.name}</h3>
                { user.bio && <h4>{user.bio}</h4>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

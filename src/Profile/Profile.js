import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideMenu from "../SideMenu/SideMenu";
import style from "./Profile.module.css";
import axios from "axios";
import TheExplore from "../Explore/TheExplore/TheExplore";
import UnfollowModal from "../UnfollowModal/UnfollowModal";
import Footer from '../Footer/Footer'

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [tap, setTap] = useState("post");
  const [followed, setFollowed] = useState(false);
  const [users, setUsers] = useState([]);

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
        setSavedPosts(res.data);
      });
    axios
      .get("http://localhost:5000/user/getUser", {
        params: { id: localStorage.getItem("user") },
      })
      .then((res) => {
        if (res.data.follwing.length > 0) {
          let found = false;
          for (let i = 0; i < res.data.follwing.length; i++) {
            if (res.data.follwing[i]?._id === id) {
              setFollowed(true);
              found = true;
              break;
            }
          }

          if (!found) {
            setFollowed(false);
          }
        }
      });
    axios
      .get("http://localhost:5000/user/followedBy", {
        params: { user: id, mine: localStorage.getItem("user") },
      })
      .then((res) => {
        setUsers(res.data);
      });
  }, [id]);

  function follow() {
    axios
      .put("http://localhost:5000/user/follow", {
        follower: localStorage.getItem("user"),
        following: id,
      })
      .then((res) => {
        setFollowed(true);
      });
  }
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
              {id === localStorage.getItem("user") ? (
                <>
                  <h4>Edit profile</h4>
                  <h4>Log out</h4>
                </>
              ) : followed ? (
                <h4>Following</h4>
              ) : (
                <h4
                  onClick={follow}
                  style={{ backgroundColor: "#179ff7", color: "white" }}
                >
                  follow
                </h4>
              )}
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
              {users.length > 0 && (
                <h5>
                  <span>Followed by</span>
                  {` ${users
                    .slice(0, 3)
                    .map((user) => user.userName)
                    .join(", ")}${
                    users.length > 3 ? (
                      <span> + {users.length - 3} more</span>
                    ) : (
                      ""
                    )
                  }`}
                </h5>
              )}
            </div>
          </div>
        </div>
        <div className={style["posts"]}>
          <div className={style["taps"]}>
            <div
              onClick={() => setTap("post")}
              className={`${style["tap"]} ${
                tap === "post" ? style["active"] : ""
              }`}
            >
              <i class="fa-solid fa-table-cells"></i>
              <h4>Posts</h4>
            </div>
            {id === localStorage.getItem("user") && (
              <div
                onClick={() => setTap("saved")}
                className={`${style["tap"]} ${
                  tap === "saved" ? style["active"] : ""
                }`}
              >
                <i class="fa-regular fa-bookmark"></i>
                <h4>Saved</h4>
              </div>
            )}
          </div>
          <div className={style["preview"]}>
            {tap === "post" &&
              posts.map((post) => (
                <div key={post._id} className={style["post"]}>
                  <TheExplore post={post} />
                </div>
              ))}
            {tap === "saved" &&
              savedPosts.map((post) => (
                <div key={post._id} className={style["post"]}>
                  <TheExplore post={post} />
                </div>
              ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Profile;

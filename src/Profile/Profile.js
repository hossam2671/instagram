import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideMenu from "../SideMenu/SideMenu";
import style from "./Profile.module.css";
import axios from "axios";
import TheExplore from "../Explore/TheExplore/TheExplore";
import UnfollowModal from "../UnfollowModal/UnfollowModal";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import FollowingModal from "../FollowingModal/FollowingModal";
import Loader from "../Loader/Loader";

function Profile() {
  const { REACT_APP_INSTAGRAM_API_URL , REACT_APP_IMAGE_URL } = process.env;
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [tap, setTap] = useState("post");
  const [followed, setFollowed] = useState(false);
  const [users, setUsers] = useState([]);
  const [opened, setOpened] = useState(false);
  const [opened2, setOpened2] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${REACT_APP_INSTAGRAM_API_URL}user/getUser`, { params: { id: id } })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      }).catch((err)=>{
        navigate("/login")
        setLoading(false);
      })
    axios
      .get(`${REACT_APP_INSTAGRAM_API_URL}user/userPosts`, { params: { id: id } })
      .then((res) => {
        setPosts(res.data);
      }).catch((err)=>{
        navigate("/login")
      })
    axios
      .get(`${REACT_APP_INSTAGRAM_API_URL}user/userSavedPosts`, { params: { id: id } })
      .then((res) => {
        setSavedPosts(res.data);
      }).catch((err)=>{
        navigate("/login")
      })
    axios
      .get(`${REACT_APP_INSTAGRAM_API_URL}user/getUser`, {
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
      }).catch(()=>{
        navigate("/login")
      })
    axios
      .get(`${REACT_APP_INSTAGRAM_API_URL}user/followedBy`, {
        params: { user: id, mine: localStorage.getItem("user") },
      })
      .then((res) => {
        setUsers(res.data);
      }).catch((err)=>{
        navigate("/login")
      })
  }, [id, opened , opened2]);

  const handleClose = (x) => {
    setOpened(false);
  };
  const handleClose2 = (x) => {
    setOpened2(false);
  };

  function follow() {
    axios
      .put(`${REACT_APP_INSTAGRAM_API_URL}user/follow`, {
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
      <UnfollowModal
        open={opened}
        handleClose={(x) => handleClose(x)}
        user={user}
      />
      <FollowingModal
        open={opened2}
        handleClose={(x) => handleClose2(x)}
        following={user.follwing}
      />
      {
        !loading ? (
          <div className={style["profile"]}>
        <div className={style["info"]}>
          <div className={style["img"]}>
            <img src={`${REACT_APP_IMAGE_URL}${user.img}`} />
          </div>
          <div className={style["details"]}>
            <div className={style["name"]}>
              <h3>{user.userName}</h3>
              {id === localStorage.getItem("user") ? (
                <>
                  <h4>Edit profile</h4>
                  <h4
                    onClick={() => {
                      navigate("/login");
                      localStorage.removeItem("user");
                    }}
                  >
                    Log out
                  </h4>
                </>
              ) : followed ? (
                <h4 onClick={() => setOpened(true)}>Following</h4>
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
              <div onClick={()=> setOpened2(true)} className={style["number"]}>
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
        ) : <Loader />
      }
      
    </div>
  );
}

export default Profile;

import React, { useEffect, useState } from "react";
import style from "./Following.module.css";
import axios from "axios";
import UnfollowModal from "../../UnfollowModal/UnfollowModal";

function Following({ id }) {
  const { REACT_APP_INSTAGRAM_API_URL , REACT_APP_IMAGE_URL } = process.env;
  const [followed, setFollowed] = useState(false);
  const [opened,setOpened] = useState(false)
  function handleClose(){
    setOpened(false)
  }
  useEffect(() => {
    axios
      .get(`${REACT_APP_INSTAGRAM_API_URL}user/getUser`, {
        params: { id: localStorage.getItem("user") },
      })
      .then((res) => {
        let found = false;
        for (let i = 0; i < res.data.follwing.length; i++) {
          if (res.data.follwing[i]?._id === id._id) {
            setFollowed(true);
            found = true;
            break;
          }
        }
        if (!found) {
          setFollowed(false);
        }
      });
  }, [opened]);

  function follow() {
    axios
      .put(`${REACT_APP_INSTAGRAM_API_URL}user/follow`, {
        follower: localStorage.getItem("user"),
        following: id._id,
      })
      .then((res) => {
        setFollowed(true);
      });
  }
  return (
    <>
      <UnfollowModal
        open={opened}
        handleClose={(x) => handleClose()}
        user={id}
      />
      <div className={style["following"]}>
        <div className={style["info"]}>
          <img src={`${REACT_APP_IMAGE_URL}${id.img}`} />
          <div className={style["name"]}>
            <h4>{id.userName}</h4>
            <h4>{id.name}</h4>
          </div>
        </div>
        {followed ? (
          <h5
            onClick={()=> setOpened(true)}
            style={{ color: "black", backgroundColor: "#EFEFEF" }}
          >
            Following
          </h5>
        ) : (
          <h5 onClick={follow}>Follow</h5>
        )}
      </div>
    </>
  );
}

export default Following;

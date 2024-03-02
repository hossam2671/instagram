import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import style from "./OptionsModal.module.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setPost } from "../Redux/Slices/Posts";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  width: 350,
  borderRadius: "12px",
};
function OptionsModal({
  open: op,
  handleClose: close,
  post,
  user,
  openUnfollowModal,
}) {
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);
  const [saved, setSaved] = useState(false);
  const handleClose = (x) => {
    close(x);
  };
  const handleClose2 = (x) => {
    setOpened(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/user/getUser", { params: { id: localStorage.getItem("user") } })
      .then((res) => {
        console.log(res.data.saved)
        if(res.data.saved.includes(post._id)){
          setSaved(true)
        }
        else{
          setSaved(false)
        }
      });
  }, [op]);

  function getPost() {
    axios
      .get("http://localhost:5000/user/getPost", {
        params: { id: localStorage.getItem("user") },
      })
      .then((res) => {
        dispatch(setPost(res.data));
      });
  }

  function save() {
    axios
      .put("http://localhost:5000/user/save", {
        user: localStorage.getItem("user"),
        post: post._id,
      })
      .then((res) => {
        getPost();
        close();
      });
  }
  function unSave() {
    axios
      .put("http://localhost:5000/user/unSave", {
        user: localStorage.getItem("user"),
        post: post._id,
      })
      .then((res) => {
        getPost();
        close();
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
        <Box className={style["list"]} sx={modalStyle}>
          {user._id !== localStorage.getItem("user") ? (
            <ul>
              <li
                onClick={() => {
                  close();
                  openUnfollowModal();
                }}
              >
                Unfollow
              </li>
              {
                saved ? 
                <li onClick={unSave}>Remove from favourites</li>
                :
              <li onClick={save}>Add to favourites</li>
              }
              <li>Go to post</li>
              <li>About this account</li>
              <li>Cancel</li>
            </ul>
          ) : (
            <ul>
              <li>هنشوف بعدين</li>
              <li>هنشوف بعدين</li>
              <li>هنشوف بعدين</li>
              <li>هنشوف بعدين</li>
              <li>هنشوف بعدين</li>
            </ul>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default OptionsModal;

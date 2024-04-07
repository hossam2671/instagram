import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import style from "./OptionsModal.module.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setPost } from "../Redux/Slices/Posts";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

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
  openAboutModal,
  onDeletePost,
  openPostModal,
}) {
  const { REACT_APP_INSTAGRAM_API_URL } = process.env;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentUrl = location.pathname;
  const [saved, setSaved] = useState(false);
  const handleClose = (x) => {
    close(x);
  };
  function deletePost() {
    axios
      .delete(`${REACT_APP_INSTAGRAM_API_URL}user/delete`, {
        params: {
          post: post._id,
          user: user._id,
        },
      })
      .then((res) => {
        onDeletePost();
      });
  }

  useEffect(() => {
    axios
      .get(`${REACT_APP_INSTAGRAM_API_URL}user/getUser`, {
        params: { id: localStorage.getItem("user") },
      })
      .then((res) => {
        if (res.data.saved.includes(post?._id)) {
          setSaved(true);
        } else {
          setSaved(false);
        }
      });
  }, [op]);

  function getPost() {
    axios
      .get(`${REACT_APP_INSTAGRAM_API_URL}user/getPost`, {
        params: { id: localStorage.getItem("user") },
      })
      .then((res) => {
        console.log(res.data);
        dispatch(setPost(res.data));
      });
  }

  function save() {
    axios
      .put(`${REACT_APP_INSTAGRAM_API_URL}user/save`, {
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
      .put(`${REACT_APP_INSTAGRAM_API_URL}user/unSave`, {
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
              {saved ? (
                <li onClick={unSave}>Remove from favourites</li>
              ) : (
                <li onClick={save}>Add to favourites</li>
              )}
              {!currentUrl.includes("postPage") && (
                <li onClick={() => navigate(`/postPage/${post._id}`)}>
                  Go to post
                </li>
              )}
              <li
                onClick={() => {
                  close();
                  openAboutModal();
                }}
              >
                About this account
              </li>
              <li onClick={close}>Cancel</li>
            </ul>
          ) : (
            <ul>
              <li onClick={deletePost}>Delete</li>
              <li
                onClick={() => {
                  close();
                  openPostModal();
                }}
              >
                Edit
              </li>
              {!currentUrl.includes("postPage") && (
                <li onClick={() => navigate(`/postPage/${post._id}`)}>
                  Go to post
                </li>
              )}
              <li onClick={close}>Cancel</li>
            </ul>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default OptionsModal;

import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import style from "./AboutModal.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setPost } from "../Redux/Slices/Posts";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  width: 400,
  borderRadius: "12px",
};

function AboutModal({ open: op, handleClose: close, user }) {
  const { REACT_APP_INSTAGRAM_API_URL , REACT_APP_IMAGE_URL } = process.env;
  const handleClose = (x) => {
    close(x);
  };
  function formatDate(dateStr) {
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    var date = new Date(dateStr);
    var month = months[date.getMonth()];
    var year = date.getFullYear();

    return month + " " + year;
  }
  return (
    <div>
      <Modal
        open={op}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle} className={style["content"]}>
          <h4>About this account</h4>
          <img src={`${REACT_APP_IMAGE_URL}${user.img}`} />
          <h3>{user.userName}</h3>
          <p>
            To help keep our community authentic, we’re showing information
            about accounts on Instagram.{" "}
            <span>See why this information is important.</span>
          </p>
          <div sx={modalStyle} className={style["joined"]}>
            <i class="fa-regular fa-calendar"></i>
            <div sx={modalStyle} className={style["updated"]}>
              <h4>Date joined</h4>
              <h4>
                {user.joinedAt ? formatDate(user.joinedAt) : "February 2024"}
              </h4>
            </div>
          </div>
          <h4 onClick={handleClose}>Close</h4>
        </Box>
      </Modal>
    </div>
  );
}

export default AboutModal;

import React from 'react'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import style from './UnfollowModal.module.css'
import axios from 'axios';
import { useDispatch } from "react-redux";
import { setPost } from "../Redux/Slices/Posts";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    width: 450,
    borderRadius:"12px"
  };

function UnfollowModal({ open: op, handleClose: close, user}) {
    const dispatch = useDispatch();
    
    const handleClose = (x) => {
        close(x);
      };

    function getPost(){
        axios
      .get("http://localhost:5000/user/getPost", {
        params: { id: localStorage.getItem("user") },
      })
      .then((res) => {
        dispatch(setPost(res.data));
      });
    }

    function unfollow(){
        axios.put("http://localhost:5000/user/unfollow",{
          follower:localStorage.getItem("user"),
          following:user._id
      }).then((res)=>{
        getPost()
        handleClose()
      })
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
            <img src={`http://localhost:5000/${user.img}`} />
            <h4>Unfollow @{user.userName}?</h4>
            <ul>
                <li onClick={unfollow}>Unfollow</li>
                <li onClick={handleClose}>Cancel</li>
            </ul>
        </Box>
      </Modal>
    </div>
  )
}

export default UnfollowModal
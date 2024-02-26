import React from 'react'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import style from './OptionsModal.module.css'

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    width: 350,
    borderRadius:"12px"
  };
function OptionsModal({ open: op, handleClose: close, post, user}) {
    const handleClose = (x) => {
        close(x);
      };
  return (
    <div>
      <Modal
        open={op}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={style["list"]} sx={modalStyle}>
         <ul>
            <li>Unfollow</li>
            <li>Add to favourites</li>
            <li>Go to post</li>
            <li>About this account</li>
            <li>Cancel</li>
         </ul>
        </Box>
      </Modal>
    </div>
  )
}

export default OptionsModal
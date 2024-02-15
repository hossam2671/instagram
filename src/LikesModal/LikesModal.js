import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import style from "./LikesModal.module.css";
import CloseIcon from "@mui/icons-material/Close";
import Like from "./Like/Like";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: "10px 0",
  borderRadius: "12px",
};

function LikesModal({ open: op, handleClose: close, likes }) {
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
        <Box sx={modalStyle}>
          <div className={style["head"]}>
            <h4>Likes</h4>
            <CloseIcon onClick={handleClose} />
          </div>
          <div className={style["content"]}>
            {likes
              ?.filter((like) => like !== localStorage.getItem("user"))
              .map((like) => (
                <Like key={like} id={like} />
              ))}
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default LikesModal;

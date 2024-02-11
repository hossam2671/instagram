import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import style from "./PostModal.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import profile from "../assets/119986446_3340727139310180_8618841474764541280_n.jpg";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "12px",
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function PostModal({ open: op, handleClose: close }) {
  const [selectedImage, setSelectedImage] = React.useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClose = (x) => {
    close(x);
    setSelectedImage(null)
  };

  return (
    <div className={style["postModal"]}>
      <Modal
        open={op}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...modalStyle,
            height: "560px",
            width: selectedImage ? "860px" : "520px",
          }}
        >
          {/* <CloseIcon
            sx={{
              position: "absolute",
              top: "20px",
              right: "20px",
              fontSize: "30px",
              cursor: "pointer",
            }}
            onClick={handleClose}
          /> */}
          <h4
            className={style["header"]}
            style={{ marginBottom: selectedImage ? "10px" : "50%" }}
          >
            Create new post
          </h4>
          {!selectedImage && (
            <Button
              sx={{
                marginLeft: "50%",
                transform: "translateX(-50%)",
                fontSize: "12px",
                borderRadius: "8px",
              }}
              component="label"
              variant="contained"
            >
              Select from computer
              <VisuallyHiddenInput type="file" onChange={handleImageChange} />
            </Button>
          )}
          {selectedImage && (
            <div className={style["select"]}>
              <div className={style["img"]}>
                <img src={selectedImage} />
              </div>
              <div className={style["text"]}>
                <div className={style["textHeader"]}>
                  <img src={profile} />
                  <h4>hhhhh hhhhh</h4>
                </div>
                <TextField
                multiline
                rows={10}
                placeholder="Write a caption"
                  sx={{
                    width:"90%",
                    "& .MuiOutlinedInput-root": {
                      border: "none",
                    },
                    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                      {
                        border: "none",
                      },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                  id="outlined-basic"
                  variant="outlined"
                />
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default PostModal;

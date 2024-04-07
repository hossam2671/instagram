import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import style from "./PostModal.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { setPost } from "../Redux/Slices/Posts";

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

function PostModal({ open: op, handleClose: close, thePost , edit }) {
  const { REACT_APP_INSTAGRAM_API_URL } = process.env;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [selectedImageView, setSelectedImageView] = React.useState("");
  const [user, setUser] = React.useState({});
  const [content, setContent] = React.useState("");
  const [edited, setEdited] = React.useState(false);
  const handleImageChange = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      setSelectedImage(file);
      setSelectedImageView(URL.createObjectURL(file));
    }
  };

  const handleClose = (x) => {
    close(x);
    setSelectedImage(null);
  };
  React.useEffect(() => {
    axios
      .get(`${REACT_APP_INSTAGRAM_API_URL}user/getUser`, {
        params: { id: localStorage.getItem("user") },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        navigate("/login");
      });
  }, []);

  React.useEffect(()=>{
    setEdited(edit)
  },[op])

  function post() {
    const formData = new FormData();
    formData.append("img", selectedImage);
    formData.append("content", content);
    formData.append("user", localStorage.getItem("user"));
    axios.post(`${REACT_APP_INSTAGRAM_API_URL}user/addPost`, formData).then((res) => {
      handleClose();
      axios
        .get(`${REACT_APP_INSTAGRAM_API_URL}user/getPost`, {
          params: { id: localStorage.getItem("user") },
        })
        .then((res) => {
          dispatch(setPost(res.data));
        });
    });
  }

  function editPost(){
    axios.put(`${REACT_APP_INSTAGRAM_API_URL}user/editPost`,{
      post:thePost._id,
      content:content
    }).then((res) => {
      handleClose();
      axios
        .get(`${REACT_APP_INSTAGRAM_API_URL}user/getPost`, {
          params: { id: localStorage.getItem("user") },
        })
        .then((res) => {
          dispatch(setPost(res.data));
        });
    });
  }

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
            width: (selectedImage || edited) ? "860px" : "520px",
          }}
        >
          <div
            style={{
              marginBottom: (selectedImage || edited) ? "10px" : "50%",
              justifyContent: (selectedImage || edited) ? "space-between" : "center",
            }}
            className={style["header"]}
          >
            {selectedImage ? (
              <i
                onClick={() => {
                  setSelectedImage(null);
                }}
                class="fa-solid fa-arrow-left"
              ></i>
            ) : edited ? (<h5 onClick={close} style={{color:"black"}}>Cancel</h5>):""}
            <h4>Create new post</h4>
            {selectedImage ? <h5 onClick={post}>Share</h5> : edited ? <h5 onClick={editPost}>Done</h5> : ""}
          </div>
          {(!selectedImage && !edited)  && (
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
              <VisuallyHiddenInput
                name="img"
                type="file"
                onChange={handleImageChange}
              />
            </Button>
          )}
          {(selectedImage || edited) && (
            <div className={style["select"]}>
              <div className={style["img"]}>
                <img src={selectedImageView?selectedImageView:`${REACT_APP_INSTAGRAM_API_URL}${thePost.img}`} />
              </div>
              <div className={style["text"]}>
                <div className={style["textHeader"]}>
                  <img src={`${REACT_APP_INSTAGRAM_API_URL}${user.img}`} />
                  <h4>{user.userName}</h4>
                </div>
                <TextField
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                  multiline
                  rows={10}
                  placeholder="Write a caption"
                  sx={{
                    width: "90%",
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

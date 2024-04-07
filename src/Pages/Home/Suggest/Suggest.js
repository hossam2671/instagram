import React, { useEffect, useState } from "react";
import style from "./Suggest.module.css";
import Suggestion from "./Suggestion/Suggestion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SwitchModal from "../../../SwitchModal/SwitchModal";


function Suggest() {
  const { REACT_APP_INSTAGRAM_API_URL } = process.env;
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const [user, setUser] = useState({});
  const [suggested, setSuggested] = useState([]);

  const handleClose = (x) => {
    setOpened(false);
  };

  useEffect(() => {
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
    axios
      .get(`${REACT_APP_INSTAGRAM_API_URL}user/getSuggested`, {
        params: { id: localStorage.getItem("user") },
      })
      .then((res) => {
        setSuggested(res.data);
      }).catch((err) => {
        navigate("/login");
      });
  }, [opened]);
  return (
    <div className={style["suggest"]}>
      <SwitchModal open={opened} handleClose={(x) => handleClose(x)} />
      <div className={style["profile"]}>
        <div className={style["info"]}>
          <img src={`${REACT_APP_INSTAGRAM_API_URL}${user.img}`} />
          <div className={style["name"]}>
            <h5>{user.name}</h5>
            <h5>{user.userName}</h5>
          </div>
        </div>
        <h5
          onClick={() => {
            setOpened(true);
          }}
        >
          Switch
        </h5>
      </div>
      <div className={style["suggestedForYou"]}>
        <h4>Suggested for you</h4>
        <h5 onClick={()=>navigate("/suggested")}>See All</h5>
      </div>
      <div className={style["suggestions"]}>
        {suggested.slice(0, 5).map((suggest) => (
          <Suggestion
            key={suggest._id}
            name={suggest.userName}
            id={suggest._id}
            img={suggest.img}
            user={suggest}
          />
        ))}
      </div>
      <div className={style["footer"]}>
        <ul>
          <li>About</li>
          <li>Help</li>
          <li>Press</li>
          <li>API</li>
          <li>Jobs</li>
          <li>Privacy</li>
          <li>Terms</li>
        </ul>
        <ul>
          <li>Locations</li>
          <li>Language</li>
          <li>Meta Verified</li>
        </ul>
        <h4>© 2024 INSTAGRAM FROM META</h4>
      </div>
    </div>
  );
}

export default Suggest;

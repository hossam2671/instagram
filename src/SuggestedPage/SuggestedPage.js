import React, { useEffect, useState } from "react";
import SideMenu from "../SideMenu/SideMenu";
import style from "./SuggestedPage.module.css";
import suggedted from "./Suggested/Suggested";
import axios from "axios";
import Suggested from "./Suggested/Suggested";

function SuggestedPage() {
  const { REACT_APP_INSTAGRAM_API_URL } = process.env;
  const [suggested, setSuggested] = useState([]);
  useEffect(() => {
    axios
      .get(`${REACT_APP_INSTAGRAM_API_URL}user/getSuggested`, {
        params: { id: localStorage.getItem("user") },
      })
      .then((res) => {
        setSuggested(res.data);
      });
  }, []);
  return (
    <div>
      <SideMenu />
      <div className={style["content"]}>
        <h4>Suggested</h4>
        {suggested.slice(0, 30).map((suggest) => (
          <Suggested
            key={suggest._id}
            name={suggest.name}
            id={suggest._id}
            img={suggest.img}
            userName={suggest.userName}
            user={suggest}
          />
        ))}
        
      </div>
    </div>
  );
}

export default SuggestedPage;

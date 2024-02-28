import React, { useEffect, useState } from "react";
import SideMenu from "../SideMenu/SideMenu";
import style from "./SuggestedPage.module.css";
import Suggestion from "../Pages/Home/Suggest/Suggestion/Suggestion";
import axios from "axios";

function SuggestedPage() {
  const [suggested, setSuggested] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/user/getSuggested", {
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
        {suggested.slice(0, 5).map((suggest) => (
          <Suggestion
            key={suggest._id}
            name={suggest.userName}
            id={suggest._id}
            img={suggest.img}
          />
        ))}
      </div>
    </div>
  );
}

export default SuggestedPage;

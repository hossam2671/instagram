import React from "react";
import style from "./Suggest.module.css";
import profile from '../../../assets/119986446_3340727139310180_8618841474764541280_n.jpg'
import Suggestion from "./Suggestion/Suggestion";

function Suggest() {
  return (
    <div className={style["suggest"]}>
      <div className={style["profile"]}>
        <div className={style["info"]}>
            <img src={profile} />
            <div className={style["name"]}>
                <h5>markwahlberg</h5>
                <h5>Mark Wahlberg</h5>
            </div>
        </div>
        <h5>Switch</h5>
      </div>
      <div className={style["suggestedForYou"]}>
        <h4>Suggested for you</h4>
        <h5>See All</h5>
      </div>
      <div className={style["suggestions"]}>
        <Suggestion name="tcmailbox"/>
        <Suggestion name="aalaahome"/>
        <Suggestion name="asalem710"/>
        <Suggestion name="nadamohsen215"/>
        <Suggestion name="shekchenko_7"/>
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

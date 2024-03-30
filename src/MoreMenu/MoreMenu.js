import React from "react";
import style from "./MoreMenu.module.css";

function MoreMenu() {
  return (
    <div className={style["moreMenu"]}>
      <ul>
        <li>
          <i class="fa-solid fa-gear"></i> Settings
        </li>
        <li>
          <i class="fa-solid fa-chart-line"></i> Your activity
        </li>
        <li>
          <i class="fa-regular fa-bookmark"></i> Saved
        </li>
        <li>
             Switch accounts
        </li>
        <li>
             Log out
        </li>
      </ul>
    </div>
  );
}

export default MoreMenu;

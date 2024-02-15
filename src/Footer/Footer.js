import React from "react";
import style from "./Footer.module.css";

function Footer() {
  return (
    <div className={style["footer"]}>
      <ul>
        <li>Meta</li>
        <li>About</li>
        <li>Blog</li>
        <li>Jobs</li>
        <li>Help</li>
        <li>API</li>
        <li>Privacy</li>
        <li>Terms</li>
        <li>Locations</li>
        <li>Instagram Lite</li>
        <li>Threads</li>
        <li>Contact Uploading & Non-Users</li>
        <li>Meta Verified</li>
      </ul>
      <h5>© 2024 Instagram from Meta</h5>
    </div>
  );
}

export default Footer;

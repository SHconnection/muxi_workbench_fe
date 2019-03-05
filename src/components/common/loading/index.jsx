import React from "react";
import "./loading.css";
import "static/css/common.css";

const ICON_ARR = ["middlebase", "leftbase", "rightbase"];
const ICON = ICON_ARR[Math.floor(Math.random() * 3)];
const Loading = () => (
  <div className="loadLayer">
    <div className={`${ICON} middleAnimate loadImg`} />
  </div>
);

export default Loading;

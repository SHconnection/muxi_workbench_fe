import React from "react";
import ReactSVG from "react-svg";
import { animateScroll as scroll } from "react-scroll";
import top from "../../../assets/svg/commonIcon/top.svg";
import "./top.scss";

function toTop() {
  return (
    <div>
      <ReactSVG
        className="top"
        onClick={() =>
          scroll.scrollToTop({
            containerId: "app-container"
          })
        }
        path={top}
      />
    </div>
  );
}
export default toTop;

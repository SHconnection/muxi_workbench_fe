import React from "react";
// import ReactSVG from 'react-svg'
// import backIcon from '../../../assets/svg/commonIcon/back.svg'
import "../../../static/css/common.css";
import "./index.css";

const goBack = () => {
  window.history.back();
};

const GoBack = () => (
  <div
    className="reArrow back-icon"
    onClick={goBack}
    onKeyDown={() => {}}
    role="presentation"
  />
);

export default GoBack;

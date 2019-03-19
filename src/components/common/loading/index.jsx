import React from "react";
import PropTypes from "prop-types";
import "./loading.scss";
import "static/css/common.scss";

const ICON_ARR = ["middlebase", "leftbase", "rightbase"];
const ICON = ICON_ARR[Math.floor(Math.random() * 3)];
const Loading = props => {
  const { className } = props;
  return (
    <div className={`loadLayer ${className}`}>
      <div className={`${ICON} middleAnimate loadImg`} />
    </div>
  );
};

Loading.propTypes = {
  className: PropTypes.string
};

Loading.defaultProps = {
  className: ""
};

export default Loading;

import React from "react";
import PropTypes from "prop-types";

import "./loading.css";
import "../../../static/css/common.css";

const ICON_ARR = ["middlebase", "leftbase", "rightbase"];
const ICON = ICON_ARR[Math.floor(Math.random() * 3)];
const Loading = props => {
  const { loading, offsetTop } = props;
  return loading ? (
    <div className="subject loadLayer" style={offsetTop}>
      <div className={`${ICON} middleAnimate loadImg`} />
    </div>
  ) : null;
};

Loading.propTypes = {
  loading: PropTypes.bool,
  offsetTop: PropTypes.shape({
    top: PropTypes.string,
    height: PropTypes.string
  })
};

Loading.defaultProps = {
  loading: false,
  offsetTop: {
    top: "0",
    height: "100%"
  }
};

export default Loading;

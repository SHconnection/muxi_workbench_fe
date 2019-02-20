import React from "react";
import PropTypes from "prop-types";

import "./loading.css";
import "../../../static/css/common.css";

const ICON_ARR = ["middlebase", "leftbase", "rightbase"];
const ICON = ICON_ARR[Math.floor(Math.random() * 3)];
const Loading = props => {
  const { loading } = props;
  return loading ? (
    <div className="loadLayer">
      <div className={`${ICON} middleAnimate loadImg`} />
    </div>
  ) : null;
};

Loading.propTypes = {
  loading: PropTypes.bool
};

Loading.defaultProps = {
  loading: false
};

export default Loading;

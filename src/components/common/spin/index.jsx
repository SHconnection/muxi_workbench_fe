import React from "react";
// import PropTypes from "prop-types";
import "./index.scss";

import gif from "../../../assets/img/loading-x.gif";

const Spin = () => (
  <div className="spin">
    <img alt="spin" src={gif} />
  </div>
);

export default Spin;

import React from "react";
import PropTypes from "prop-types";
import "./save.css";
import "../../../static/css/common.css";

const Save = ({ ifSave }) => (
  <div className={ifSave ? "subject isSave" : "none"}>
    <div className="circle" />
    保存成功
  </div>
);

export default Save;

Save.propTypes = {
  ifSave: PropTypes.bool
};

Save.defaultProps = {
  ifSave: false
};

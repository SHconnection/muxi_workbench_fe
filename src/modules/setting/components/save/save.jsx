/*
保存弹出框组件
ifSave判断是否显示
*/
import React from "react";
import PropTypes from "prop-types";
import "static/css/common.css";
import "./save.css";

const Save = ({ ifSave }) => (
  <div className={ifSave ? "subject save-isSave" : "none"}>
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

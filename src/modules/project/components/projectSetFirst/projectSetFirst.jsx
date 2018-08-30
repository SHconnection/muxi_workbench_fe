/*
项目设置--项目信息页面组件
为项目设置首页，下接编辑成员页面
*/
import React from "react";
import PropTypes from "prop-types";
import "../../../../static/css/common.css";
import "./projectSetFirst.css";

const ProjectSetFirst = ({
  inputValue,
  changeInput,
  textValue,
  changeText
}) => (
  <div>
    <div className="title">项目设置</div>
    <br />
    <input
      type="text"
      className="inputSize"
      placeholder="项目名称"
      value={inputValue}
      onChange={changeInput}
    />
    <textarea
      className="inputSize textareaSize"
      placeholder="简单描述项目，便于其他人了解（选填）"
      value={textValue}
      onChange={changeText}
    />
  </div>
);

export default ProjectSetFirst;

ProjectSetFirst.propTypes = {
  inputValue: PropTypes.string,
  changeInput: PropTypes.func,
  textValue: PropTypes.string,
  changeText: PropTypes.func
};

ProjectSetFirst.defaultProps = {
  inputValue: "",
  changeInput: () => {},
  textValue: "",
  changeText: () => {}
};

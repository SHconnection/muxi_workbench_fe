/*
项目设置--项目信息页面组件
为项目设置首页，下接编辑成员页面
*/
import React from "react";
import "../../../static/css/common.css";
import "./project_setFirst.css";

const ProSetFir = () => (
  <div>
    <div className="title">项目设置</div>
    <br />
    <input type="text" className="inputSize" placeholder="项目名称" />
    <textarea
      className="inputSize textareaSize"
      placeholder="简单描述项目，便于其他人了解（选填）"
    />
  </div>
);

export default ProSetFir;

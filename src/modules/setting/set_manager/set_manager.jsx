/*
设置管理员页面组件
*/
import React from "react";
import "../../../static/css/common.css";
import "./set_manager.css";
import SelMem from "../../../components/setting/select_member/select_member";

const SetManager = () => (
  <div className="subject minH">
    <span className="reArrow" />
    <b className="title">设置管理员</b>
    <SelMem />
  </div>
);

export default SetManager;

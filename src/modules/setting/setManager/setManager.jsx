/*
设置管理员页面组件
*/
import React from "react";
import GoBack from "components/common/goBack/index";
import SelectMember from "../components/selectMember/selectMember";
import "static/css/common.css";
import "./setManager.css";

const SetManager = () => (
  <div>
    <GoBack />
    <b className="title">设置管理员</b>
    <SelectMember setManager />
  </div>
);

export default SetManager;

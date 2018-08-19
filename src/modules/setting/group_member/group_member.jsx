/*
项目设置--编辑成员页面组件
承接自项目设置--项目信息页面
接收项目信息参数
*/
import React from "react";
import PropTypes from "prop-types";
import SelMem from "../../../components/setting/select_member/select_member";
import "../../../static/css/common.css";
import "./group_member.css";

const GroupMem = ({ groupName }) => (
  <div className="subject minH">
    <span className="reArrow" />
    <b className="title">分组管理</b>
    <div className="groupName">{groupName}</div>
    <br />
    <SelMem />
  </div>
);

export default GroupMem;

GroupMem.propTypes = {
  groupName: PropTypes.string
};

GroupMem.defaultProps = {
  groupName: ""
};

/*
项目设置--编辑成员页面组件
承接自项目设置--项目信息页面
接收项目信息参数
*/
import React from "react";
import PropTypes from "prop-types";
import SelectMember from "../components/select_member/select_member";
import "../../../static/css/common.css";
import "./group_member.css";

const GroupMember = ({ match }) => (
  <div className="subject minH">
    <span className="reArrow" />
    <b className="title">分组管理</b>
    <div className="groupName">{match.params.id}</div>
    <br />
    <SelectMember groupMember />
  </div>
);

export default GroupMember;

GroupMember.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(
      PropTypes.number
    )
  })
};

GroupMember.defaultProps = {
  match: {}
};

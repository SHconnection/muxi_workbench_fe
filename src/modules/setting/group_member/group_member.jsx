/*
管理单组界面(修改成员)
*/
import React from "react";
import SelectMember from "../components/select_member/select_member";
import "../../../static/css/common.css";
import "./group_member.css";

const GroupMember = ({match}) => (
  <div className="subject minH">
    <span className="reArrow" />
    <b className="title">分组管理</b>
    <div className="groupName">{JSON.parse(match.params.group).name}</div>
    <br />
    <SelectMember groupMember groupID={JSON.parse(match.params.group).id}/>
  </div>
)

export default GroupMember;

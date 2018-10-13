/*
管理单组界面(修改成员)
*/
import React from "react";
import PropTypes from "prop-types";
import GoBack from "../../../components/common/goBack/index";
import SelectMember from "../components/selectMember/selectMember";
import "../../../static/css/common.css";
import "./groupMember.css";

const GroupMember = ({
  location: {
    state: { per }
  }
}) => (
  <div className="subject minH">
    <GoBack />
    <b className="title">分组管理</b>
    <div className="groupMember-groupName">{per.name}</div>
    <br />
    <SelectMember groupMember groupID={per.id} />
  </div>
);

export default GroupMember;

GroupMember.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      per: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
      })
    })
  })
};

GroupMember.defaultProps = {
  location: {}
};

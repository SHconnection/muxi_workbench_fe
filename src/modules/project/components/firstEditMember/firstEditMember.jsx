/*
项目设置--编辑成员页面组件
承接自项目设置--项目信息页面
接收项目信息参数
*/
import React from "react";
import PropTypes from "prop-types";
import Member from "../../../setting/components/member/member";
import "../../../../static/css/common.css";
import "./firstEditMember.css";

const FirstEditMember = ({ selAll, transferMsg, members, selMembers }) => (
  <div>
    <div className="title">编辑项目成员</div>
    <br />
    <div className="editMember-vice">
      <div className="title littleSize">设置项目成员</div>
      <div className="editMember-tip">选择你要设置的成员</div>
    </div>
    <button
      type="button"
      className="saveBtn editMember-fontSize"
      onClick={selAll}
    >
      全选
    </button>
    <Member
      members={members}
      selMembers={selMembers}
      transferMsg={transferMsg}
    />
  </div>
);

export default FirstEditMember;

FirstEditMember.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
      selected: PropTypes.bool
    })
  ),
  selMembers: PropTypes.arrayOf(PropTypes.number),
  transferMsg: PropTypes.func,
  selAll: PropTypes.func
};

FirstEditMember.defaultProps = {
  members: [],
  selMembers: [],
  transferMsg: () => {},
  selAll: () => {}
};

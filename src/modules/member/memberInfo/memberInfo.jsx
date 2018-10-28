/*
团队成员页面组件
*/
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Avatar from "../../../components/common/avatar/index";
import "../../../static/css/common.css";
import "./memberInfo.css";

const MemberInfo = ({ mem, url }) => (
  <div className="memberInfo-contain">
    <Link to={"/member/teamMember/personalInfo"}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          localStorage.per = JSON.stringify(mem);
        }}
        onKeyDown={this.handleClick}
        className="memberInfo-img"
      >
        <Avatar width={60} height={60} square={true} src={mem.avatar} />
      </div>
    </Link>
    <div className="memberInfo-personalIntro">
      <b className="memberInfo-nameSize">{mem.name}</b>
      <span className="memberInfo-role">
        {mem.role == 1 ? "成员" : mem.role == 3 ? "管理员" : "超级管理员"}
      </span>
      <br />
      <span className="memberInfo-littleGroup">{mem.group}</span>
    </div>
  </div>
);

export default MemberInfo;

MemberInfo.propTypes = {
  mem: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.number,
    group: PropTypes.string
  })
};

MemberInfo.defaultProps = {
  mem: {}
};

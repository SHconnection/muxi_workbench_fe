/*
设置管理员页面组件
*/
import React, { Component } from "react";
import "../../../static/css/common.css";
import "./set_manager.css";
import SelMem from "../../../components/setting/select_member/select_member.jsx";

class SetManager extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="subject minH">
        <span className="reArrow" />
        <b className="title">设置管理员</b>
        <SelMem />
      </div>
    );
  }
}

export default SetManager;

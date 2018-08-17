/*
项目设置--编辑成员页面组件
承接自项目设置--项目信息页面
接收项目信息参数
*/
import React, { Component } from 'react';
import SelMem from '../select_member/select_member.jsx';
import '../../../static/css/common.css';
import './group_member.css';

class GroupMem extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className = "subject minH">
        <span className = "reArrow"></span>
        <b className = "title">分组管理</b>
        <div className = "groupName">{this.props.groupName}</div><br/>
        <SelMem />
      </div>
    );
  }
}

export default GroupMem;
/*
项目设置--编辑成员页面组件
承接自项目设置--项目信息页面
接收项目信息参数
*/
import React, { Component } from 'react';
import SelectMem from '../../../components/common/member.jsx';
import '../../../static/css/common.css';
import './edit_member.css';

class EditMem extends Component {
  constructor(props){
    super(props);
    this.state = {
      selMembers: [],
      members: [
        {name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},
        {name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},
        {name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},
        {name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},
        {name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},
        {name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},
        {name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},
        {name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},
        {name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},
        {name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},
      ],
    };
  }

  transferMsg(mem, selMem){
    this.setState(
      {
        members: mem,
        selMembers: selMem
      }
    );
  }

  render() {
    return (
      <div className = "subject">
        <div className = "title">编辑项目成员</div>
        <div className = "vice">
          <div className = "title littleSize">设置项目成员</div>
          <div className = "tip">选择你要设置的成员</div>
        </div>
        <button className = "btn certain littltFont littleBtn">全选</button>
        <SelectMem members = {this.state.members} selMembers = {this.state.selMembers} transferMsg = {this.transferMsg.bind(this)} />
        <button className = "btn certain marg">保存项目成员</button>
        <span className = "cancel">取消</span>
      </div>
    );
  }
}

export default EditMem;
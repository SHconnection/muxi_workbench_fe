/*
成员分组页面组件
*/
import React, { Component } from 'react';
import '../../../static/css/common.css';
import './set_permission.css';
import Mem from '../../../components/common/member.jsx';

class SetPerm extends Component {
  constructor(props){
    super(props);

    this.state = {
      selMembers: [],
      members: [
        {name: '木犀101',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'BXX',selected: false},{name: 'BXX',selected: false},{name: 'CXX',selected: false},
        {name: 'CXX',selected: false},{name: 'DXX',selected: false},{name: 'DXX',selected: false},{name: 'EXX',selected: false},{name: 'EXX',selected: false},{name: 'FXX',selected: false},
      ],
    }
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
      <div className = "subject minH">
        <span className = "reArrow"></span>
        <b className = "title">设置权限</b>
        <div className = "present preMarg">
          <span className = "tip">请选择该成员可参与的项目</span>
          <Mem members = {this.state.members} selMembers = {this.state.selMembers} transferMsg = {this.transferMsg.bind(this)}/>
        </div>
        <button className = "saveBtn btnMarg">保存</button>
      </div>
    );
  }
}

export default SetPerm;
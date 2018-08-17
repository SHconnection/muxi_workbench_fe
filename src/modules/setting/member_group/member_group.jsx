/*
成员分组页面组件
*/
import React, { Component } from 'react';
import '../../../static/css/common.css';
import './member_group.css';
import Mem from '../../../components/common/member.jsx';

class MemGroup extends Component {
  constructor(props){
    super(props);

    this.state = {
      selMembers: [],
      members: [
        {name: '设计组',selected: false},{name: '产品组',selected: false},{name: '前端组',selected: false},{name: '后端组',selected: false},{name: '安卓组',selected: false},
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
        <b className = "title">选择成员分组</b>
        <div className = "present MemGroup_preMarg">
          <span className = "MemGroup_tip tip">请选择该成员所属分组</span>
          <Mem members = {this.state.members} selMembers = {this.state.selMembers} transferMsg = {this.transferMsg.bind(this)} dis = {true}/>
        </div>
        <button className = "saveBtn MemGroup_btnMarg">下一步</button>
      </div>
    );
  }
}

export default MemGroup;
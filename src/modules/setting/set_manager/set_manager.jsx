/*
设置管理员页面组件
*/
import React, { Component } from 'react';
import '../../../static/css/common.css';
import './set_manager.css';
import SelectMem from '../../../components/common/member.jsx';
import { Link } from 'react-router-dom';

class SetManager extends Component {
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
      <div className = "subject minH">
        <span className = "reArrow"></span>
        <b className = "title">设置管理员</b>
        <div className = "present">
          <b className = "title littleSize">选择成员</b>
          <div className = "selMarg">
            <SelectMem members = {this.state.members} selMembers = {this.state.selMembers} transferMsg = {this.transferMsg.bind(this)} />
          </div>
          <button className = "saveBtn btnMTB">保存设置</button>
        </div>
      </div>
    );
  }
}

export default SetManager;
/*
个人设置页面组件
*/
import React, { Component } from 'react';
import '../../../static/css/common.css';
import './personal_setting.css';
import SelectMem from '../../../components/common/member.jsx';
import { Link } from 'react-router-dom';

class PerSet extends Component {
  constructor(props){
    super(props);

    this.state = {
      selMembers: [],
      members: [
        {name: '站内信',selected: false},{name: '邮箱通知',selected: false}
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
        <span className = "reArrow"></span>
        <div className = "title weight">个人设置</div>
        <div className = "main">
          <img src = "" className = "avatar"/>
          <div className = "avaTip">
            <p className = "weight">选择新头像</p>
            <p className = "avaForm">你可以选择png/jpg图片作为头像</p>
          </div>
          <div>
            <span className = "weight">名字</span><input type = "text" placeholder = "木小犀" className = "writeTip"/><br/>
            <span className = "weight">邮箱</span><input type = "text" placeholder = "178107487@qq.com" className = "writeTip"/><br/>
            <span className = "weight">手机</span><input type = "text" placeholder = "13924173096" className = "writeTip"/><br/>
          </div>
        </div>
        <div className = "footer">
          <span className = "weight">通知设置</span>
          <div className = "sel">
            <SelectMem members = {this.state.members} selMembers = {this.state.selMembers} wrap = {true} transferMsg = {this.transferMsg.bind(this)} />
          </div><br/>
          <button className = "saveBtn">保存设置</button>
        </div>
      </div>
    );
  }
}

export default PerSet;
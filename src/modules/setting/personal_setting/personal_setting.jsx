/*
个人设置页面组件
*/
import React, { Component } from 'react';
import '../../../static/css/common.css';
import './personal_setting.css';
import Mem from '../../../components/common/member.jsx';
import { Link } from 'react-router-dom';

class PerSet extends Component {
  constructor(props){
    super(props);

    this.state = {
      selMembers: [],
      members: [
        {name: '站内信',selected: false},{name: '邮箱通知',selected: false}
      ],
      ifSave: false
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

  save(){
    this.setState({ifSave: true})

    setTimeout(() => {
      this.setState({ifSave: false})
    }, 1000);
  }

  render() {
    return (
      <div className = "subject minH">
        <span className = "reArrow"></span>
        <b className = "title">个人设置</b>

        <div className = "main">
          <img src = "" className = "avatar"/>
          <div className = "avaTip">
            <b>选择新头像</b>
            <p className = "avaForm">你可以选择png/jpg图片作为头像</p>
          </div>
          <div>
            <b>名字</b><input type = "text" placeholder = "木小犀" className = "writeTip"/><br/>
            <b>邮箱</b><input type = "text" placeholder = "178107487@qq.com" className = "writeTip"/><br/>
            <b>手机</b><input type = "text" placeholder = "13924173096" className = "writeTip"/><br/>
          </div>
        </div>

        <div className = "footer">
          <b>通知设置</b>
          <div className = "sel">
            <Mem members = {this.state.members} selMembers = {this.state.selMembers} wrap = {true} transferMsg = {this.transferMsg.bind(this)} />
          </div><br/>
          <button className = "saveBtn" onClick = {this.save.bind(this)}>{this.state.ifSave ? "已保存" : "保存设置"}</button>
        </div>

        <div className = {this.state.ifSave ? "subject isSave" : "none"}>
          <div className = "circle"></div>
          保存成功
        </div>
      </div>
    );
  }
}

export default PerSet;
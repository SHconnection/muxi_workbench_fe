/*
项目设置--编辑成员页面组件
承接自项目设置--项目信息页面
接收项目信息参数
*/
import React, { Component } from 'react';
import Mem from '../../../components/common/member.jsx';
import '../../../static/css/common.css';
import './set_personInfo.css';
import '../project_setting/project_setting.css';

class SelMem extends Component {
  constructor(props){
    super(props);
    this.state = {
      selIdentities: [],
      selMembers: [],
      identity: [
        {name: '管理员',selected: false},{name: '成员',selected: false},
      ],
      members: [
        {name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},
        {name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},
        {name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},{name: 'AXX',selected: false},
      ],
      ifSave: false,
      delete: false,
      deled: false,
    };
  }

  transferMsgMem(mem, selMem){
    this.setState(
      {
        members: mem,
        selMembers: selMem
      }
    );
  }

  transferMsgIden(mem, selMem){
    this.setState(
      {
        identity: mem,
        selIdentities: selMem
      }
    );
  }

  selAll(){
    let arr = this.state.members,
        num = 0;
    if(arr){
      arr.map(function(i){
        if(i.selected)
          num++;
      })
    }
    if(num === arr.length){
      arr.map(function(i){
        i.selected = false;
      })
    }
    else{
      arr.map(function(i){
        i.selected = true;
      })
    }
    this.setState({members: arr});
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
        <b className = "title">{this.props.personName}的设置</b>

        <div className = "present">
          <div className = "move">
            <p className = "SelMem_FC llSize">从团队中移除XXA</p>
            <p className = "SelMem_FS tip">被移除的成员将不能再访问工作台上的信息，但工作台上与他相关的信息将保留。</p>
          </div>
          <button className = "moveBtn SelMem_btnMArg" onClick = {() => {this.setState({delete: true})}}>确认移除</button><br/>

          <b className = "littleSize title SelMem_titleMarg">设置</b>
          <Mem members = {this.state.identity} selMembers = {this.state.selIdentities} transferMsg = {this.transferMsgIden.bind(this)} dis = {true}/>
        
          <b className = "littleSize title SelMem_titleMarg">参与的项目</b> 
          <span className = "fakeBtn" onClick = {this.selAll.bind(this)}>全选</span>     
          <Mem members = {this.state.members} selMembers = {this.state.selMembers} transferMsg = {this.transferMsgMem.bind(this)}/>
          
          <button className = "footerBtn saveBtn" onClick = {this.save.bind(this)}>{this.state.ifSave ? "已保存" : "保存设置"}</button>
          <div className = {this.state.ifSave ? "subject isSave" : "none"}>
            <div className = "circle"></div>
            保存成功
          </div>

          <div className = {this.state.delete ? "contain minH" : "none"}>
            <div className = {"subject alert"}>
              <span>确认要移除XXA吗?</span>
              <div className = "SetProject_alertMarg" onClick = {() => {this.setState({delete: false})}}>
                <button className = "delBtn SetProject_btnMarg">取消</button>
                <button className = "saveBtn SetProject_btnMarg" onClick = {() => {this.setState({deled: true})}}>确定</button>
              </div>
            </div>
          </div>

          <div className = {this.state.deled ? "contain minH" : "none"}>
            <div className = {"subject alert"}>
              <span>移除成功</span>
              <div className = "SetProject_alertMarg">
                <button className = "saveBtn SetProject_btnMarg">确定</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SelMem;
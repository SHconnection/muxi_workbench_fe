/*
处理申请页面组件
成员数据members:{name:'', mailbox:'',dealed: false},
同意的名单selMembers:[]
transferMsg = (mem, selMem) => {this.setState({members: mem,selMembers: selMem});}返回数据
*/
import React, { Component } from 'react';
import '../../../static/css/common.css';
import './group_manage.css';
import '../join_apply/join_apply.css';
import '../project_setting/project_setting.css';

class GroupMana extends Component {
  constructor(props){
    super(props);
    this.state = {
      delete: undefined
    };
  }

  del(mem){
    let arr = this.props.members;

    if(!mem.dealed)
      mem.dealed = true;
    
    this.props.transferMsg(arr);
  }

  componentWillUnmount(){
    let arr = this.props.members;

    arr.filter(function(item){
      return !item.dealed;
    })

    this.props.transferMsg(arr);
  }

  render() {
    return (
      <div className = "subject minH">
        <span className = "reArrow"></span>
        <b className = "title">分组管理</b><br/>
        <span className = "GroupMana_tip tip">上下拖动对分组排序</span>
        <button className = "saveBtn btnFlo">添加分组</button>
        <div className = "clear present">
          {
						this.props.members.map(function(mem){
							return(
								<div className = {mem.dealed ? "none" : "cell GroupMana_reCell"}>
									<b>{mem.name}</b>
									<span className = "llSize pos GroupMana_rePos">{mem.number}</span>
									<div className = "litSel">
										<span className = "fakeBtn">编辑</span>
										<span className = "fakeBtn" onClick = {() => {this.setState({delete: mem})}}>删除</span>
									</div>
								</div>
							)
						}, this)
          }
        </div>
        <div className = {this.state.delete ? "contain minH" : "none"}>
          <div className = {"subject alert"}>
            <span>确认要删除该组吗?</span>
            <div className = "SetProject_alertMarg" onClick = {() => {this.setState({delete: undefined})}}>
              <button className = "delBtn SetProject_btnMarg">取消</button>
              <button className = "saveBtn SetProject_btnMarg" onClick = {this.del.bind(this, this.state.delete)}>确定</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GroupMana;
/*
项目设置--项目信息页面组件
为项目设置首页，下接编辑成员页面
*/
import React, { Component } from 'react';
import './project_setting.css';
import { Link } from 'react-router-dom';

class SetProject extends Component {
  constructor(props){
    super(props);
    this.state = {
      delete: false
    };
  }

  render() {
    return (
      <div className = "subject">
        <div className = "title">项目设置</div>
        <input type = "text" className = "project_name" placeholder = "项目名称"/>
        <textarea  className = "project_name textarea_size" placeholder = "简单描述项目，便于其他人了解（选填）" />
        <br/>
        <div className = "select">
          <button className = "btn certain"><Link to = "/editMem" className = "link">保存</Link></button>
          <button className = "btn delete" onClick = {() => {this.setState({delete: true})}}>删除项目</button>
          <span className = "cancel">取消</span>
        </div>
        <div className = {this.state.delete ? "subject alert" : "none"}>
          <span>确认要删除该项目吗?</span>
          <div className = "mar">
            <button className = "btn delete littleBtn" onClick = {() => {this.setState({delete: false})}}>取消</button>
            <button className = "btn certain littleBtn">确定</button>
          </div>
        </div>
      </div>
    );
  }
}

export default SetProject;

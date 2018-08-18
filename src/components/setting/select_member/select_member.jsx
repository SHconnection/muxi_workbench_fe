/*
项目设置--编辑成员页面组件
承接自项目设置--项目信息页面
接收项目信息参数
*/
import React, { Component } from "react";
import Mem from "../member/member.jsx";
import Save from "../save/save.jsx";
import "../../../static/css/common.css";
import "./select_member.css";

class SelMem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selMembers: [],
      members: [
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false }
      ],
      select: false
    };
  }

  transferMsg(mem, selMem) {
    this.setState({
      members: mem,
      selMembers: selMem
    });
  }

  selAll() {
    let arr = this.state.members,
      num = 0;
    arr.map(i => {
      if (i.selected) num++;
    });
    if (num === arr.length) {
      arr.map(i => {
        i.selected = false;
      });
    } else {
      arr.map(i => {
        i.selected = true;
      });
    }
    this.setState({ members: arr });
  }

  save() {
    this.setState({ ifSave: true });

    setTimeout(() => {
      this.setState({ ifSave: false });
    }, 1000);
  }

  render() {
    return (
      <div className="present">
        <b className="title littleSize SelMem_vice">选择成员</b>
        <span className="fakeBtn" onClick={this.selAll.bind(this)}>
          全选
        </span>
        <Mem
          members={this.state.members}
          selMembers={this.state.selMembers}
          transferMsg={this.transferMsg.bind(this)}
        />
        <button className="saveBtn footerBtn" onClick={this.save.bind(this)}>
          {this.state.ifSave ? "已保存" : "保存设置"}
        </button>

        <Save ifSave={this.state.ifSave} />
      </div>
    );
  }
}

export default SelMem;

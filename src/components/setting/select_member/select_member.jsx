/*
项目设置--编辑成员页面组件
承接自项目设置--项目信息页面
接收项目信息参数
*/
import React, { Component } from "react";
import Mem from "../member/member";
import Save from "../save/save";
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
      ]
    };
  }

  transferMsg(mem, selMem) {
    this.setState({
      members: mem,
      selMembers: selMem
    });
  }

  selAll() {
    this.setState(prevState => {
      const { members: arr } = prevState;
      let num = 0;

      if (arr) {
        arr.map(i => {
          if (i.selected) num += 1;
          return true;
        });

        if (num === arr.length) {
          arr.map(i => {
            const j = i;
            j.selected = false;
            return j;
          });
        } else {
          arr.map(i => {
            const j = i;
            j.selected = true;
            return j;
          });
        }
      }

      return { members: arr };
    });
  }

  save() {
    this.setState({ ifSave: true });

    setTimeout(() => {
      this.setState({ ifSave: false });
    }, 1000);
  }

  render() {
    const { members, selMembers, ifSave } = this.state;
    return (
      <div className="present">
        <b className="title littleSize SelMem_vice">选择成员</b>
        <span
          className="fakeBtn"
          onClick={this.selAll.bind(this)}
          onKeyDown={this.handleClick}
          role="button"
          tabIndex="-1"
        >
          全选
        </span>
        <Mem
          members={members}
          selMembers={selMembers}
          transferMsg={(mem, selMem) => {
            this.transferMsg(mem, selMem);
          }}
        />
        <button
          type="button"
          className="saveBtn footerBtn"
          onClick={() => {
            this.save();
          }}
        >
          {ifSave ? "已保存" : "保存设置"}
        </button>

        <Save ifSave={ifSave} />
      </div>
    );
  }
}

export default SelMem;

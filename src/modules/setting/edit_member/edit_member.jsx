/*
项目设置--编辑成员页面组件
承接自项目设置--项目信息页面
接收项目信息参数
*/
import React, { Component } from "react";
import Mem from "../../../components/setting/member/member";
import "../../../static/css/common.css";
import "./edit_member.css";

class EditMem extends Component {
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
            j.selected = "selected";
            return j;
          });
        }
      }

      return { members: arr };
    });
  }

  render() {
    const { members, selMembers } = this.state;

    return (
      <div className="subject minH">
        <div className="title">编辑项目成员</div>
        <br />
        <div className="EditMem_vice">
          <div className="title littleSize">设置项目成员</div>
          <div className="EditMem_tip">选择你要设置的成员</div>
        </div>
        <button
          type="button"
          className="saveBtn EditMem_FS"
          onClick={() => {
            this.selAll();
          }}
        >
          全选
        </button>
        <Mem
          members={members}
          selMembers={selMembers}
          transferMsg={(mem, selMem) => {
            this.transferMsg(mem, selMem);
          }}
        />
        <button type="button" className="saveBtn footerBtn">
          保存项目成员
        </button>
        <span className="fakeBtn footerBtn EditMem_btnMarg">取消</span>
      </div>
    );
  }
}

export default EditMem;

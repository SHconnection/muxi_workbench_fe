/*
成员分组页面组件
*/
import React, { Component } from "react";
import "../../../static/css/common.css";
import "./set_permission.css";
import Mem from "../../../components/setting/member/member";
import Save from "../../../components/setting/save/save";

class SetPerm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selMembers: [],
      members: [
        { name: "木犀101", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "BXX", selected: false },
        { name: "BXX", selected: false },
        { name: "CXX", selected: false },
        { name: "CXX", selected: false },
        { name: "DXX", selected: false },
        { name: "DXX", selected: false },
        { name: "EXX", selected: false },
        { name: "EXX", selected: false },
        { name: "FXX", selected: false }
      ],
      ifSave: false
    };
  }

  transferMsg(mem, selMem) {
    this.setState({
      members: mem,
      selMembers: selMem
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
      <div className="subject minH">
        <span className="reArrow" />
        <b className="title">设置权限</b>
        <div className="present SetPerm_preMarg">
          <span className="tip SetPerm_tip">请选择该成员可参与的项目</span>
          <Mem
            members={members}
            selMembers={selMembers}
            transferMsg={(mem, selMem) => {
              this.transferMsg(mem, selMem);
            }}
          />

          <button
            type="button"
            className="saveBtn footerBtn SetPerm_btnMarg"
            onClick={() => {
              this.save();
            }}
          >
            {ifSave ? "已保存" : "保存设置"}
          </button>
        </div>
        <Save ifSave={ifSave} />
      </div>
    );
  }
}

export default SetPerm;

import React, { Component } from "react";
import GoBack from "../../../components/common/goBack/index";
import Mem from "../../../components/setting/member/member";
import Func from "../../../components/common/function/function";
import Button from "../../../components/common/button/index";
import "../../../static/css/common.css";
import "./index.css";

class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selMembers: [],
      members: [
        { name: "AXX", selected: false },
        { name: "BXX", selected: false },
        { name: "CX", selected: false },
        { name: "BXX", selected: false },
        { name: "CXX", selected: false },
        { name: "BXX", selected: false },
        { name: "CXX", selected: false },
        { name: "BXX", selected: false },
        { name: "CXX", selected: false },
        { name: "BXX", selected: false },
        { name: "CXX", selected: false },
        { name: "BXX", selected: false },
        { name: "CXX", selected: false },
        { name: "BXX", selected: false },
        { name: "CXX", selected: false },
        { name: "BXX", selected: false },
        { name: "CXX", selected: false },
        { name: "BXX", selected: false },
        { name: "CXX", selected: false },
        { name: "BXX", selected: false },
        { name: "CXX", selected: false }
      ]
    };

    Func.transferMsgMem = Func.transferMsgMem.bind(this);
    this.createProject = this.createProject.bind(this);
  }

  createProject() {
    const { selMembers } = this.state;
    console.log(selMembers);
  }

  render() {
    const { members, selMembers } = this.state;
    return (
      <div className="newProject-container">
        <GoBack />
        <div className="newProject-content">
          <div className="title">新建项目</div>
          <input
            type="text"
            className="newProject-name-input"
            placeholder="项目名称"
          />
          <textarea
            className="newProject-desc-textarea"
            placeholder="简单描述项目，便于他人了解（选填）"
          />
          <div className="newProject-member">
            <div className="title">选择项目成员</div>
            <div className="newProject-member-option">
              <div className="tip">选择你要设置的成员</div>
            </div>
            <Mem
              members={members}
              selMembers={selMembers}
              transferMsg={(mem, selMem) => {
                Func.transferMsgMem(mem, selMem);
              }}
            />
          </div>
          <Button text="创建项目" onClick={this.createProject} />
        </div>
      </div>
    );
  }
}

export default NewProject;

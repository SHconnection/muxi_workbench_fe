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
      selectedAll: false,
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
    Func.selAll = Func.selAll.bind(this);
    this.createProject = this.createProject.bind(this);
    this.checkAll = this.checkAll.bind(this);
  }

  checkAll() {
    const { selectedAll, members } = this.state;
    Func.selAll();
    this.setState({
      selectedAll: !selectedAll
    });
    this.setState(preState => {
      const { members: arr } = preState;
      arr.forEach(el => {
        const el1 = el;
        el1.selected = !selectedAll;
      });
    });
    if (selectedAll) {
      this.setState({
        selMembers: []
      });
    } else {
      this.setState({
        selMembers: members
      });
    }
  }

  createProject() {
    const { selMembers } = this.state;
    // Func.selAll()
    console.log(selMembers);
  }

  render() {
    const { members, selMembers, selectedAll } = this.state;
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
              <div>
                <input
                  type="checkbox"
                  checked={selectedAll}
                  onChange={this.checkAll}
                  id="memberCheckedAll"
                />
                <label htmlFor="memberCheckedAll">全选</label>
              </div>
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

import React, { Component } from "react";
// import GoBack from "../../../components/common/goBack/index";
import Mem from "../../../components/setting/member/member";
import Func from "../../../components/common/function/function";
import Button from "../../../components/common/button/index";
import Select from "../../../components/common/select/index";
import "../../../static/css/common.css";
import "./index.css";

const gotoBack = () => {
  window.history.back();
}

class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // groups: ['安卓组','前端组','后端组','设计组','产品组','全部成员'],
      groups: [],
      groupCheckedIndex: 5,
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
    Func.selAllo = Func.selAllo.bind(this);
    this.createProject = this.createProject.bind(this);
    this.checkAll = this.checkAll.bind(this);
    this.changeGroupCheck = this.changeGroupCheck.bind(this);
  }

  componentWillMount() {
    const { groups } = this.state;
    const groupList = [
      {
        groupID: 1,
        groupName: "安卓组",
        userCount: 2
      },
      {
        groupID: 2,
        groupName: "前端组",
        userCount: 2
      },
      {
        groupID: 3,
        groupName: "后端组",
        userCount: 2
      },
      {
        groupID: 4,
        groupName: "设计组",
        userCount: 2
      },
      {
        groupID: 5,
        groupName: "产品组",
        userCount: 2
      }
    ];
    const arr = groupList.map(el => {
      const el1 = { id: 0, value: "" };
      el1.id = el.groupID;
      el1.value = el.groupName;
      return el1;
    });
    arr.push({ id: 0, value: "全部成员" });
    // console.log(arr)
    this.setState({
      groups: groups.concat(arr)
    });
    // console.log(this.state.groups)
  }

  checkAll() {
    const { selectedAll } = this.state;
    Func.selAllo(!selectedAll);
    this.setState({
      selectedAll: !selectedAll
    });
  }

  createProject() {
    const { selMembers } = this.state;
    // Func.selAll()
    console.log(selMembers);
  }

  changeGroupCheck(index) {
    // const {groupCheckedIndex} = this.state
    this.setState({
      groupCheckedIndex: index
    });
  }

  render() {
    const {
      members,
      selMembers,
      selectedAll,
      groups,
      groupCheckedIndex
    } = this.state;
    return (
      <div className="newProject-container">
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
              <div className="newProject-member-tip-right">
                <input
                  type="checkbox"
                  checked={selectedAll}
                  onChange={this.checkAll}
                  id="memberCheckedAll"
                />
                <label htmlFor="memberCheckedAll">全选</label>
                <div className="newProject-group-select">
                  <Select
                    items={groups}
                    checkedIndex={groupCheckedIndex}
                    onChange={this.changeGroupCheck}
                  />
                </div>
              </div>
            </div>
            <Mem
              members={members}
              selMembers={selMembers}
              transferMsg={Func.transferMsgMem}
            />
          </div>
          <div className="newProject-bottom">
            <Button text="创建项目" onClick={this.createProject} />
            <div className="newProject-bottom-text fakeBtn" onClick={gotoBack} onKeyDown={() => {}} role="presentation">取消</div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewProject;

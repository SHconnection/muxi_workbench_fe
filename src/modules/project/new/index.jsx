import React, { Component } from "react";
import Member from "../../setting/components/member/member";
import Button from "../../../components/common/button/index";
import Select from "../../../components/common/select/index";
import ManageService from "../../../service/manage"
import ProjectService from "../../../service/project";
import "../../../static/css/common.css";
import "./index.css";

const gotoBack = () => {
  window.history.back();
};

class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // groups: ['安卓组','前端组','后端组','设计组','产品组','全部成员'],
      selectAllText: "全选",
      groups: [],
      groupCheckedIndex: 0,
      selectedAll: false,
      selMembers: [],
      members: [
        { id: 1, name: "AXX", selected: false },
        { id: 2, name: "BXX", selected: false },
        { id: 3, name: "CX", selected: false },
        { id: 4, name: "BXX", selected: false },
        { id: 5, name: "CXX", selected: false },
        { id: 6, name: "BXX", selected: false },
        { id: 7, name: "CXX", selected: false },
        { id: 8, name: "BXX", selected: false },
        { id: 9, name: "CXX", selected: false },
        { id: 10, name: "BXX", selected: false },
        { id: 11, name: "CXX", selected: false },
        { id: 12, name: "BXX", selected: false },
        { id: 13, name: "CXX", selected: false }
      ]
    };

    this.transferMsgMem = this.transferMsgMem.bind(this);
    this.selAll = this.selAll.bind(this);
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
    ManageService.getGroupList()
    .then(res => {
      console.log(res);
      const arr = res.groupList.map(el => {
        const el1 = { id: 0, value: "" };
        el1.id = el.groupID;
        el1.value = el.groupName;
        el1.userCount = el.userCount
        return el1;
      });
      arr.push({ id: 0, value: "全部成员" });
      console.log(arr);
      
      // // console.log(arr)
      this.setState({
        groups: groups.concat(arr)
      });
    })
    
    
    // console.log(this.state.groups)
  }

  transferMsgMem(arr1) {
    this.setState({
      members: arr1,
      selectedAll: false
    });
  }

  checkAll() {
    const { selectedAll } = this.state;
    this.selAll();
    this.setState({
      selectedAll: !selectedAll
    });
  }

  selAll() {
    this.setState(prevState => {
      const { members: arr1 } = prevState;
      const arr2 = [];
      let num = 0;

      if (arr1) {
        arr1.map(i => {
          if (i.selected) num += 1;
          return i;
        });

        if (num === arr1.length) {
          arr1.map(i => {
            const j = i;
            j.selected = false;
            return j;
          });
        } else {
          arr1.map(i => {
            const j = i;
            j.selected = true;
            arr2.push(j.id);
            return j;
          });
        }
      }

      return { members: arr1, selMembers: arr2 };
    });
  }

  createProject() {
    const { selMembers } = this.state;
    // Func.selAll()
    ProjectService.createProject({
      username: "test",
      projectname: "Project",
      userList: [
        {
          userID: 1,
          userName: "testName"
        }
      ],
      intro: "hahaha"
    });
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
      groupCheckedIndex,
      selectAllText
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
            <div className="title littleSize">选择项目成员</div>
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
            <Member
              members={members}
              selMembers={selMembers}
              transferMsg={this.transferMsgMem}
            />
          </div>
          <div className="newProject-bottom">
            <Button text="创建项目" onClick={this.createProject} />
            <div
              className="newProject-bottom-text fakeBtn"
              onClick={gotoBack}
              onKeyDown={() => {}}
              role="presentation"
            >
              取消
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewProject;

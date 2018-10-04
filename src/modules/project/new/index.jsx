import React, { Component } from "react";
import Member from "../../setting/components/member/member";
import Button from "../../../components/common/button/index";
import Select from "../../../components/common/select/index";
import ManageService from "../../../service/manage";
import ProjectService from "../../../service/project";
import "../../../static/css/common.css";
import "./index.css";

const gotoBack = () => {
  window.history.back();
};

// 每一组的user
const usersByGroup = {};

// 请求grouplist
const fetchGroups = () =>
  ManageService.getGroupList().then(res => {
    const arr = res.groupList.map(el => {
      const el1 = { id: 0, value: "" };
      el1.id = el.groupID;
      el1.value = el.groupName;
      el1.userCount = el.userCount;
      return el1;
    });
    arr.push({ id: 0, value: "全部成员" });
    const arr1 = arr;
    return arr1;
  });

class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectAllText: "全选",
      groups: [],
      groupCheckedIndex: 0,
      members: [],
      selectedAll: false,
      selMembers: [],
      projectname: "",
      intro: ""
    };
    this.changeProjectnameText = this.changeProjectnameText.bind(this);
    this.changeProjectintroText = this.changeProjectintroText.bind(this);
    this.transferMsgMem = this.transferMsgMem.bind(this);
    this.selAll = this.selAll.bind(this);
    this.createProject = this.createProject.bind(this);
    this.checkAll = this.checkAll.bind(this);
    this.changeGroupCheck = this.changeGroupCheck.bind(this);
  }

  componentWillMount() {
    fetchGroups().then(el => {
      this.setState({
        groups: el,
        groupCheckedIndex: el.length - 1
      });
      this.fetchGroupMember(el[el.length - 1].id);
    });
  }

  // 请求group的所有组员
  fetchGroupMember(id) {
    return ManageService.getGroupAllMember(id).then(el => {
      usersByGroup[id] = el
        .map(item => item.list)
        .reduce((el1, el2) => el1.concat(el2), [])
        .map(el3 => {
          const arr = { id: el3.userID, name: el3.username, selected: false };
          return arr;
        });
      this.setState({
        members: usersByGroup[id]
      });
    });
  }

  changeProjectnameText(event) {
    this.setState({
      projectname: event.target.value
    });
  }

  changeProjectintroText(event) {
    this.setState({
      intro: event.target.value
    });
  }

  changeGroupCheck(index, id) {
    if (usersByGroup[id] == null) {
      this.fetchGroupMember(id);
    }
    this.setState({
      groupCheckedIndex: index,
      members: usersByGroup[id]
    });
  }

  transferMsgMem(arr) {
    this.setState({
      members: arr,
      selectedAll: arr.every(el => el.selected)
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
    const { members, projectname, intro } = this.state;
    const userlist = members.filter(el => el.selected).map(item => {
      const user = { userID: item.id, userName: item.name };
      return user;
    });
    const postData = {
      username: localStorage.username,
      projectname,
      userlist,
      intro
    };
    ProjectService.createProject(postData)
      .then(res => {
        console.log(res);
      })
      .catch(res => {
        console.log(res);
      });
  }

  render() {
    const {
      members,
      selMembers,
      selectedAll,
      groups,
      groupCheckedIndex,
      selectAllText,
      projectname,
      intro
    } = this.state;
    return (
      <div className="newProject-container">
        <div className="newProject-content">
          <div className="title">新建项目</div>
          <input
            type="text"
            className="newProject-name-input"
            placeholder="项目名称"
            value={projectname}
            onChange={this.changeProjectnameText}
          />
          <textarea
            className="newProject-desc-textarea"
            placeholder="简单描述项目，便于他人了解（选填）"
            value={intro}
            onChange={this.changeProjectintroText}
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
                <label htmlFor="memberCheckedAll">{selectAllText}</label>

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

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "../../../components/common/button/index";
import Select from "../../../components/common/select/index";
import ManageService from "../../../service/manage";
import ProjectService from "../../../service/project";

import WrongPage from "../../../components/common/wrongPage/wrongPage";
import "../../../static/css/common.css";
import "./index.css";

const gotoBack = () => {
  window.history.back();
};

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
    return arr;
  });

// 同时初始化项目的文件树和文档树
const initProjectTree = pid => {
  const fileRoot = {
    folder: true,
    id: 0,
    name: "全部文件",
    router: [0],
    selected: true,
    finalSelected: true,
    child: []
  };
  const docRoot = {
    folder: true,
    id: 0,
    name: "全部文档",
    router: [0],
    selected: true,
    finalSelected: true,
    child: []
  };
  return Promise.all([
    ProjectService.updateProjectFileTree(pid, JSON.stringify(fileRoot)),
    ProjectService.updateProjectDocTree(pid, JSON.stringify(docRoot))
  ]);
};

class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectAllText: "全选",
      groups: [],
      groupCheckedIndex: 0,
      members: [],
      projectname: "",
      intro: "",
      hasInputProjectName: false
    };
    this.groupMemberInit();
  }

  groupMemberInit = () => {
    fetchGroups().then(re => {
      this.setState(
        {
          groups: re,
          groupCheckedIndex: re.length - 1
        },
        () => {
          this.fetchGroupMember();
        }
      );
    });
  };

  // 请求group的所有组员
  fetchGroupMember = () => {
    ManageService.groupMember(0)
      .then(re => {
        this.setState({
          members: re.list.map(el => ({
            id: el.userID,
            name: el.username,
            groupID: el.groupID,
            selected: false
          }))
        });
      })
      .finally(() => {});
  };

  changeProjectnameText = event => {
    this.setState({
      projectname: event.target.value,
      hasInputProjectName: true
    });
  };

  changeProjectintroText = event => {
    this.setState({
      intro: event.target.value
    });
  };

  // 获取当前显示的组员
  currentMember = () => {
    const { groups, groupCheckedIndex, members } = this.state;
    if (groups[groupCheckedIndex] && groups[groupCheckedIndex].id === 0) {
      return members;
    }
    return members.filter(
      item => groups[groupCheckedIndex].id === item.groupID
    );
  };

  changeGroupCheck = index => {
    this.setState({
      groupCheckedIndex: index
    });
  };

  checkMember = id => {
    const { members } = this.state;
    const len = members.length;
    for (let i = 0; i < len; i += 1) {
      if (members[i].id === id) {
        members[i].selected = !members[i].selected;
        break;
      }
    }
    this.setState({
      members
    });
  };

  checkAll = () => {
    const { groups, groupCheckedIndex, members } = this.state;
    const len = members.length;
    const isSelectedAll = this.selectedAll();
    for (let i = 0; i < len; i += 1) {
      if (
        groups[groupCheckedIndex] &&
        (groups[groupCheckedIndex].id === 0 ||
          groups[groupCheckedIndex].id === members[i].groupID)
      ) {
        members[i].selected = !isSelectedAll;
      }
    }
    this.setState({
      members
    });
  };

  selectedAll = () => {
    if (this.currentMember().length === 0) {
      return false;
    }
    return this.currentMember().every(item => item.selected);
  };

  createProject = () => {
    const { members, projectname, intro } = this.state;
    const { storeId, storeUsername } = this.props;

    let chooseMe = false;
    const postProjectName = projectname.trim();
    const userlist = members.filter(el => el.selected).map(item => {
      /* eslint-disable */
      if (item.id == storeId) {
        /* eslint-enable */
        chooseMe = true;
      }
      const user = { userID: item.id, userName: item.name };
      return user;
    });
    if (!chooseMe) {
      userlist.push({ userID: storeId, userName: storeUsername });
    }
    if (!(userlist.length && postProjectName)) {
      this.setState({
        wrong: {
          message: "项目名称和成员不能为空！"
        },
        hasInputProjectName: true
      });
      return;
    }
    const postData = {
      username: storeUsername,
      projectname,
      userlist,
      intro
    };
    ProjectService.createProject(postData)
      .then(res => {
        initProjectTree(res.project_id)
          .then(() => {
            window.location.href = `./${res.project_id}/preview`;
          })
          .catch(error => {
            this.setState({ wrong: error });
          });
      })
      .catch(error => {
        this.setState({ wrong: error });
      });
  };

  cancel = () => {
    this.setState({
      wrong: {
        message: ""
      }
    });
  };

  render() {
    const {
      groups,
      groupCheckedIndex,
      selectAllText,
      projectname,
      intro,
      wrong,
      hasInputProjectName
    } = this.state;
    const { storeId } = this.props;

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
          <p
            className={
              hasInputProjectName && projectname.trim() === ""
                ? "warning"
                : "transparent"
            }
          >
            输入框不能为空！
          </p>
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
                {this.currentMember().length ? (
                  <div>
                    <input
                      type="checkbox"
                      checked={this.selectedAll()}
                      onChange={this.checkAll}
                      id="memberCheckedAll"
                    />
                    <label htmlFor="memberCheckedAll">{selectAllText}</label>
                  </div>
                ) : (
                  ""
                )}
                <div className="newProject-group-select">
                  <Select
                    items={groups}
                    checkedIndex={groupCheckedIndex}
                    onChange={this.changeGroupCheck}
                  />
                </div>
              </div>
            </div>
            <div className="newProject-member-container">
              {this.currentMember().map(item => (
                <div className="newProject-member-item" key={item.id}>
                  <input
                    type="checkbox"
                    /* eslint-disable */
                    checked={item.selected || item.id == storeId}
                    /* eslint-enable */
                    onClick={() => {
                      this.checkMember(item.id);
                    }}
                    id={item.id}
                  />
                  <label htmlFor={item.id}>{item.name}</label>
                </div>
              ))}
              {!this.currentMember().length ? (
                <div className="tip">还没有成员～</div>
              ) : (
                ""
              )}
              <div className="newProject-member-over-helper" />
              <div className="newProject-member-over-helper" />
              <div className="newProject-member-over-helper" />
              <div className="newProject-member-over-helper" />
              <div className="newProject-member-over-helper" />
            </div>
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

        <WrongPage info={wrong} cancel={this.cancel} />
      </div>
    );
  }
}

NewProject.propTypes = {
  storeId: PropTypes.number,
  storeUsername: PropTypes.string
};
NewProject.defaultProps = {
  storeId: 0,
  storeUsername: ""
};

const mapStateToProps = state => ({
  storeId: state.id,
  storeUsername: state.username
});

export default connect(mapStateToProps)(NewProject);

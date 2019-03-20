/*
项目设置--编辑成员页面组件
承接自项目设置--项目信息页面
接收项目信息参数
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import ManageService from "service/manage";
import ProjectService from "service/project";
import Loading from "components/common/loading/index";
import { Store } from "store";
import Save from "../components/save/save";
import FirstEditMember from "../../project/components/firstEditMember/firstEditMember";
import "./editMember.scss";

class EditMember extends Component {
  static changeGroupMemberFormat(mem) {
    const obj = {};

    obj.name = mem.username;
    obj.id = mem.userID;
    obj.email = mem.email;
    obj.role = mem.role;
    obj.avatar = mem.avatar;
    obj.group = mem.groupName;
    obj.selected = false;

    return obj;
  }

  constructor(props) {
    super(props);

    this.state = {
      selMembers: [],
      members: [],
      groups: [],
      checkedIndex: 0,
      ifSave: false,
      loading: true,
      memberLoading: false
    };
  }

  componentDidMount() {
    Promise.all([this.editMemberGetAllGroup(), this.editMemberGetAllMem()])
      .then(() => {
        this.setState({ loading: false });
      })
      .catch(error => {
        Store.dispatch({
          type: "substituteWrongInfo",
          payload: error
        });
      });
  }

  editMemberGetAllMem = () =>
    new Promise((resolve, reject) => {
      ManageService.getAllMem()
        .then(arr => {
          if (arr) {
            const {
              match: {
                params: { id }
              }
            } = this.props;
            ManageService.getProMember(id)
              .then(member => {
                if (member) {
                  const idList = member.list.map(mem => mem.userID);

                  const members = arr.list.map(mem1 => {
                    const mem = EditMember.changeGroupMemberFormat(mem1);

                    if (idList.indexOf(mem.id) !== -1) mem.selected = true;

                    return mem;
                  });

                  this.setState({
                    members,
                    selMembers: idList
                  });
                  resolve();
                }
              })
              .catch(error => {
                reject(error);
              });
          }
        })
        .catch(error => {
          reject(error);
        });
    });

  editMemberGetAllGroup = () =>
    new Promise((resolve, reject) => {
      ManageService.getAllGroup()
        .then(group => {
          if (group) {
            const groupList = group.groupList.map(group1 => {
              const obj = {};
              obj.value = group1.groupName;
              obj.id = group1.groupID;

              return obj;
            });

            groupList.push({ id: 0, value: "全部成员" });

            this.setState({
              groups: groupList,
              checkedIndex: groupList.length - 1
            });
            resolve();
          }
        })
        .catch(error => {
          reject(error);
        });
    });

  transferMsgMem = (members, selMembers) => {
    this.setState({
      members,
      selMembers
    });
  };

  editProjectMember = () => {
    const {
      match: {
        params: { id }
      },
      history
    } = this.props;
    const { selMembers } = this.state;

    ProjectService.editProjectMember(id, selMembers)
      .then(() => {
        this.setState({ ifSave: true });

        setTimeout(() => {
          this.setState({ ifSave: false });
          history.push(`/project/${id}/preview`);
        }, 500);
      })
      .catch(error => {
        Store.dispatch({
          type: "substituteWrongInfo",
          payload: error
        });
      });
  };

  changeGroupCheck = (index, id) => {
    this.setState({ memberLoading: true });
    const { selMembers } = this.state;

    ManageService.groupMember(id)
      .then(member => {
        if (member) {
          const arr = member.list.map(mem1 => {
            const mem = EditMember.changeGroupMemberFormat(mem1);
            if (selMembers.indexOf(mem.id) !== -1) {
              mem.selected = true;
            }
            return mem;
          });

          this.setState({
            checkedIndex: index,
            members: arr,
            memberLoading: false
          });
        }
      })
      .catch(error => {
        Store.dispatch({
          type: "substituteWrongInfo",
          payload: error
        });
      });
  };

  goBack = () => {
    window.history.back();
  };

  selAll = () => {
    this.setState(prevState => {
      const { members: arr1, selMembers: arr2 } = prevState;
      let num = 0;

      if (arr1) {
        arr1.map(i => {
          if (i.selected) num += 1;
          return i;
        });

        if (num === arr1.length) {
          arr1.map(i => {
            const j = i;
            const idIndex = arr2.indexOf(j.id);
            if (idIndex !== -1) {
              arr2.splice(idIndex, 1);
            }
            j.selected = false;
            return j;
          });
        } else {
          arr1.map(i => {
            const j = i;
            if (!j.selected) {
              j.selected = true;
              arr2.push(j.id);
            }
            return j;
          });
        }
      }

      return { members: arr1, selMembers: arr2 };
    });
  };

  render() {
    const {
      members,
      selMembers,
      groups,
      checkedIndex,
      ifSave,
      loading,
      memberLoading
    } = this.state;
    const {
      match: {
        params: { id }
      }
    } = this.props;

    return (
      <div className="setting-editMember">
        {loading ? (
          <Loading />
        ) : (
          <div className="editMember-present">
            <FirstEditMember
              members={members}
              selMembers={selMembers}
              selAll={this.selAll}
              groups={groups}
              checkedIndex={checkedIndex}
              transferMsg={this.transferMsgMem}
              changeGroupCheck={this.changeGroupCheck}
              proId={Number(id)}
              memberLoading={memberLoading}
            />
            <div className="footer">
              <button
                type="button"
                className="saveBtn"
                onClick={this.editProjectMember}
              >
                {ifSave ? "已保存" : "保存项目成员"}
              </button>
              <span
                role="button"
                tabIndex="-1"
                className="fakeBtn editMember-btnMarg"
                onClick={this.goBack}
                onKeyDown={this.handleClick}
              >
                取消
              </span>
            </div>

            <Save ifSave={ifSave} />
          </div>
        )}
      </div>
    );
  }
}

export default EditMember;

EditMember.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }),
  history: PropTypes.shape({
    push: PropTypes.func
  })
};

EditMember.defaultProps = {
  match: {},
  history: {}
};

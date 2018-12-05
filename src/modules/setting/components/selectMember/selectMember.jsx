/*
选择成员组件
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import Member from "../member/member";
import Save from "../save/save";
import ManageService from "../../../../service/manage";
import WrongPage from "../../../../components/common/wrongPage/wrongPage";
import "../../../../static/css/common.css";
import "./selectMember.css";

class SelectMember extends Component {
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
      ifSave: false,
      wrong: {}
    };
  }

  componentDidMount() {
    const { addGroup, groupMember, setManager, groupID } = this.props;

    if (groupMember || addGroup) {
      ManageService.getAllMem()
        .then(member => {
          if (member) {
            const arr = member.list.map(mem => {
              const obj = SelectMember.changeGroupMemberFormat(mem);

              return obj;
            });

            if (groupMember && groupID) {
              ManageService.groupMember(groupID)
                .then(member1 => {
                  let preArray = [];
                  if (member1) {
                    preArray = member1.list.map(mem => mem.userID);

                    arr.map(mem1 => {
                      const mem = mem1;

                      if (preArray.indexOf(mem.id) !== -1) mem.selected = true;

                      return mem;
                    });
                  }

                  this.setState({
                    members: arr,
                    selMembers: preArray
                  });
                })
                .catch(error => {
                  this.setState({ wrong: error });
                });
            } else {
              this.setState({ members: arr });
            }
          }
        })
        .catch(error => {
          this.setState({ wrong: error });
        });
    }

    if (setManager) {
      ManageService.getAllMem()
        .then(member => {
          if (member) {
            const arr = member.list.map(mem => {
              const obj = SelectMember.changeGroupMemberFormat(mem);

              return obj;
            });

            ManageService.getAdminList()
              .then(admins => {
                let preArray = [];
                if (admins) {
                  preArray = admins.list.map(admin => admin.userID);

                  arr.map(mem1 => {
                    const mem = mem1;

                    if (preArray.indexOf(mem.id) !== -1) mem.selected = true;

                    return mem;
                  });
                }

                this.setState({
                  members: arr,
                  selMembers: preArray
                });
              })
              .catch(error => {
                this.setState({ wrong: error });
              });
          }
        })
        .catch(error => {
          this.setState({ wrong: error });
        });
    }
  }

  cancel = () => {
    this.setState({ wrong: {} });
  };

  selAll = () => {
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
  };

  transferMsgMem = (arr1, arr2) => {
    this.setState({
      members: arr1,
      selMembers: arr2
    });
  };

  save = () => {
    const {
      groupMember,
      addGroup,
      groupName,
      setManager,
      groupID
    } = this.props;
    const { selMembers } = this.state;

    if (groupMember) {
      ManageService.updateGroupMember(groupID, selMembers)
        .then(() => {
          this.setState({ ifSave: true });

          setTimeout(() => {
            this.setState({ ifSave: false });
          }, 1000);
        })
        .catch(error => {
          this.setState({ wrong: error });
        });
    }

    if (addGroup) {
      ManageService.addGroup(groupName, selMembers)
        .then(() => {
          this.setState({ ifSave: true });

          setTimeout(() => {
            this.setState({ ifSave: false });
          }, 1000);
        })
        .catch(error => {
          this.setState({ wrong: error });
        });
    }

    if (setManager) {
      selMembers.map(id => {
        ManageService.setManager(id)
          .then(() => {
            this.setState({ ifSave: true });

            setTimeout(() => {
              this.setState({ ifSave: false });
            }, 1000);
          })
          .catch(error => {
            this.setState({ wrong: error });
          });

        return id;
      });
    }
  };

  render() {
    const { members, selMembers, ifSave, wrong } = this.state;

    return (
      <div className="present">
        <b className="title littleSize selectMember-vice">选择成员</b>
        <span
          className="fakeBtn"
          onClick={this.selAll}
          onKeyDown={this.handleClick}
          role="button"
          tabIndex="-1"
        >
          全选
        </span>
        <Member
          members={members}
          selMembers={selMembers}
          transferMsg={this.transferMsgMem}
        />
        <button type="button" className="saveBtn footerBtn" onClick={this.save}>
          {ifSave ? "已保存" : "保存设置"}
        </button>

        <Save ifSave={ifSave} />
        <WrongPage info={wrong} cancel={this.cancel} />
      </div>
    );
  }
}

export default SelectMember;

SelectMember.propTypes = {
  groupMember: PropTypes.bool,
  addGroup: PropTypes.bool,
  groupName: PropTypes.string,
  setManager: PropTypes.bool,
  groupID: PropTypes.number
};
SelectMember.defaultProps = {
  groupMember: false,
  addGroup: false,
  groupName: "",
  setManager: false,
  groupID: 0
};

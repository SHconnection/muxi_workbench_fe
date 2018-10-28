/*
团队成员页面组件
*/
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ManageService from "../../../service/manage";
import MemberInfo from "../memberInfo/memberInfo";
import "../../../static/css/common.css";
import "./teamMember.css";

class TeamMember extends Component {
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
      members: [],
      groupList: [],
      selectedID: 0
    };

    this.present = this.present.bind(this);
  }

  componentDidMount() {
    ManageService.getAllMem()
      .then(member => {
        if (member) {
          const arr = member.list.map(mem => {
            const obj = TeamMember.changeGroupMemberFormat(mem);

            return obj;
          });

          this.setState({
            members: arr
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
    ManageService.getAllGroup()
      .then(group => {
        if (group) {
          const arr = group.groupList.map(mem1 => {
            const mem = mem1;
            const obj = {};

            obj.name = mem.groupName;
            obj.id = mem.groupID;
            obj.count = mem.userCount;
            obj.selected = false;
            obj.dealed = false;

            return obj;
          });

          this.setState({
            groupList: arr
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  present(id) {
    ManageService.groupMember(id)
      .then(member => {
        if (member) {
          const arr = member.list.map(mem => {
            const obj = TeamMember.changeGroupMemberFormat(mem);

            return obj;
          });

          this.setState({
            members: arr,
            selectedID: id
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { members, selectedID, groupList } = this.state;
    const { match } = this.props;

    return (
      <div className="subject minH">
        <b className="teamMember-title">木犀团队</b>

        <div className="teamMember-present">
          <div className="teamMember-select">
            <button
              type="button"
              className={`teamMember-singleItem teamMember-selectItem ${
                selectedID === 0 ? "teamMember-singleItemSelected" : ""
              }`}
              onClick={() => {
                this.present(0);
              }}
            >
              团队成员
            </button>
            {groupList.map(group1 => {
              const group = group1;
              return (
                <button
                  type="button"
                  className={`teamMember-singleItem teamMember-selectItem ${
                    group.id === selectedID
                      ? "teamMember-singleItemSelected"
                      : ""
                  }`}
                  key={group.id}
                  onClick={() => {
                    this.present(group.id);
                  }}
                >
                  {group.name}
                </button>
              );
            })}
          </div>
          <div className="teamMember-selectBtn">
            <Link
              className="fakeBtn teamMember-fakeMarg"
              to={`${match.url}/setManager`}
            >
              {JSON.parse(localStorage.user).role > 3 ? "设置管理员" : ""}
            </Link>
            <Link
              className="fakeBtn teamMember-fakeMarg"
              to={`${match.url}/addMember`}
            >
              添加成员
            </Link>
            <Link className="fakeBtn" to={`${match.url}/groupManage`}>
              {JSON.parse(localStorage.user).role > 1 ? "管理分组" : ""}
            </Link>
          </div>
        </div>

        {members.map(mem1 => {
          const mem = mem1;
          let role = mem.role === 3 ? "管理员" : "";
          if (mem.role === 7) role = "超级管理员";

          return (
            <div className="teamMember-singleList" key={mem.id}>
              <MemberInfo mem={mem} />
              <span className="teamMember-emailMarg">{mem.email}</span>
            </div>
          );
        })}
      </div>
    );
  }
}

export default TeamMember;

TeamMember.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  })
};

TeamMember.defaultProps = {
  match: {}
};

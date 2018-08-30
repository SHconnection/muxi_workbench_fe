/*
选择成员组件
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import Member from "../member/member";
import Save from "../save/save";
import ManageService from "../../../../service/manage";
import "../../../../static/css/common.css";
import "./select_member.css";

class SelectMember extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selMembers: [],
      members: [],
      ifSave: false
    };

    this.selAll = this.selAll.bind(this);
    this.transferMsgMem = this.transferMsgMem.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    const {groupMember,setManager} = this.props;
    let preArray = [];

    if(groupMember){
      const {groupID} = this.props;
      const arr = ManageService.groupMember(groupID).list;

      if (!Array.isArray(arr)) return false;

      preArray = arr.map(mem=>mem.userID);
    }

    if(setManager){
      const arr = ManageService.getAdminList();

      if (!Array.isArray(arr)) return false;

      preArray = arr.map(mem=>mem.userID);
    }

    const arr = ManageService.getAllMem();

    if (!Array.isArray(arr)) return false;

    arr.map(mem1 => {
      const mem = mem1;

      if(preArray.indexOf(mem.id) !== -1)
        mem.selected = true;
      
      return mem;
    })

    this.setState({ 
      members: arr,
      selMembers: preArray
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

  transferMsgMem(arr1, arr2) {
    this.setState({
      members: arr1,
      selMembers: arr2
    });
  }

  save() {
    const { groupMember, addGroup, groupName, setManager, groupID } = this.props;
    const { selMembers } = this.state;

    this.setState({ ifSave: true });

    setTimeout(() => {
      this.setState({ ifSave: false });
    }, 1000);

    if (groupMember) {
      ManageService.updateGroupMember(groupID, selMembers);
    }

    if (addGroup) {
      ManageService.addGroup(groupName, selMembers);
    }

    if (setManager) {
      selMembers.map(id=>{ManageService.setManager(id)})
    }
  }

  render() {
    const { members, selMembers, ifSave } = this.state;

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
  groupID: PropTypes.number,
};
SelectMember.defaultProps = {
  groupMember: false,
  addGroup: false,
  groupName: "",
  setManager: false,
  groupID: 0
};

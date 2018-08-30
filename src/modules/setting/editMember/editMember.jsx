/*
项目设置--编辑成员页面组件
承接自项目设置--项目信息页面
接收项目信息参数
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import FirstEditMember from "../../project/components/firstEditMember/firstEditMember";
import ManageService from "../../../service/manage";
import ProjectService from "../../../service/project";
import "./editMember.css";

class EditMember extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selMembers: [],
      members: []
    };

    this.selAll = this.selAll.bind(this);
    this.transferMsgMem = this.transferMsgMem.bind(this);
    this.editProjectMember = this.editProjectMember.bind(this);
  }

  componentDidMount() {
    const {
      match: { params: proId }
    } = this.props;
    const arr = ManageService.getAllMem();
    const { list: proMember } = ManageService.getProMember(proId);

    if (!Array.isArray(proMember)) return false;

    const idList = proMember.map(mem => mem.userID);

    arr.map(mem1 => {
      const mem = mem1;

      if (idList.indexOf(mem.id) !== -1) mem.selected = true;

      return mem;
    });

    this.setState({
      members: arr,
      selMembers: idList
    });

    return true;
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

  transferMsgMem(members, selMembers) {
    this.setState({
      members,
      selMembers
    });
  }

  editProjectMember() {
    const {
      match: { params: proId }
    } = this.props;
    const { selMembers } = this.state;

    ProjectService.editProjectMember(proId, selMembers);
  }

  render() {
    const { members, selMembers } = this.state;

    return (
      <div className="subject minH">
        <FirstEditMember
          members={members}
          selMembers={selMembers}
          selAll={this.selAll}
          transferMsg={this.transferMsgMem}
        />

        <button
          type="button"
          className="saveBtn footerBtn"
          onClick={this.editProjectMember}
        >
          保存项目成员
        </button>
        <span className="fakeBtn footerBtn editMember-btnMarg">取消</span>
      </div>
    );
  }
}

export default EditMember;

EditMember.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      proId: PropTypes.number
    })
  })
};

EditMember.defaultProps = {
  match: {}
};

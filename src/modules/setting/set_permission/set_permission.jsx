/*
成员分组页面组件
传入userID
*/
import React, { Component } from "react";
import Member from "../components/member/member";
import Save from "../components/save/save";
import ManageService from "../../../service/manage";
import "../../../static/css/common.css";
import "./set_permission.css";

class SetPermission extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selMembers: [],
      members: [],
      ifSave: false
    };

    this.transferMsgMem = this.transferMsgMem.bind(this);
    this.savePersonalPermiss = this.savePersonalPermiss.bind(this);
  }

  componentDidMount() {
    const {list: proList} = ManageService.getPersonalPro();
    const arr = ManageService.getAllPro();

    if (!Array.isArray(proList)) return false;

    const idList = proList.map(item=>item.projectID);

    arr.map(item1=>{
      const item = item1;

      if(idList.indexOf(item.id) !== -1)
        item.selected = true;

      return item;
    })

    this.setState({ 
      members: arr,
      selMembers: idList
    });
  }

  transferMsgMem(members, selMembers) {
    this.setState({
      members: members,
      selMembers: selMembers || []
    });
  }

  savePersonalPermiss() {
    const { userID } = this.props.match.params;
    const { selMembers } = this.state;

    this.setState({ ifSave: true });

    setTimeout(() => {
      this.setState({ ifSave: false });
    }, 1000);

    ManageService.savePersonalPermiss(userID, selMembers);
  }

  render() {
    const { members, selMembers, ifSave } = this.state;

    return (
      <div className="subject minH">
        <span className="reArrow" />
        <b className="title">设置权限</b>
        <div className="present setPermission-preMarg">
          <span className="tip setPermission-tip">
            请选择该成员可参与的项目
          </span>
          <Member
            members={members}
            selMembers={selMembers}
            transferMsg={this.transferMsgMem}
          />

          <button
            type="button"
            className="saveBtn footerBtn setPermission-btnMarg"
            onClick={this.savePersonalPermiss}
          >
            {ifSave ? "已保存" : "保存设置"}
          </button>
        </div>
        <Save ifSave={ifSave} />
      </div>
    );
  }
}

export default SetPermission;

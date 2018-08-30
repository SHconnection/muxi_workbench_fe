/*
个人设置页面组件
传入per
*/
import React, { Component } from "react";
import Member from "../components/member/member";
import Delete from "../components/delete/delete";
import Save from "../components/save/save";
import ManageService from "../../../service/manage";
import "../../../static/css/common.css";
import "./set_personInfo.css";

class SetPersonalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selMembers: [],
      members: [],
      selIdentities: [1],
      identity: [
        { name: "管理员", selected: false, id: 3 },
        { name: "成员", selected: true, id: 1 }
      ],
      ifSave: false,
      deleteX: false
    };

    this.transferMsgMem = this.transferMsgMem.bind(this);
    this.transferMsgDel = this.transferMsgDel.bind(this);
    this.selAll = this.selAll.bind(this);
    this.save = this.save.bind(this);
    this.transferMsgIden = this.transferMsgIden.bind(this);
  }

  componentDidMount() {
    const { per } = this.props.match.params;
    const { identity, selIdentities } = this.state;
    const arr = ManageService.getAllPro();
    const {list: proList} = ManageService.getPersonalPro();

    if(per.role === 3){
      identity[0].selected = true;
      identity[1].selected = false;
      selIdentities[0] = 3;
    }

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
      selMembers: idList,
      identity: identity,
      selIdentities: selIdentities,
    });
  }

  transferMsgIden(mem, selMem) {
    this.setState({
      identity: mem,
      selIdentities: selMem
    });
  }

  transferMsgDel(deleteX) {
    this.setState({
      deleteX
    });
  }

  transferMsgMem(members, selMembers) {
    this.setState({
      members,
      selMembers: selMembers || []
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

  saveModifyMember() {
    const { per } = this.props.match.params;
    const { selIdentities, selMembers } = this.state;

    this.setState({ ifSave: true });

    setTimeout(() => {
      this.setState({ ifSave: false });
    }, 1000);

    ManageService.saveModifyMemberIdenty(per.userID, selIdentities);
    ManageService.saveModifyMemberPro(per.userID, selMembers);
  }

  render() {
    const { per: per1 } = this.props.match.params;
    const per = JSON.parse(per1);
    const {
      identity,
      selIdentities,
      members,
      selMembers,
      ifSave,
      deleteX,
      deled
    } = this.state;

    return (
      <div className="subject minH">
        <span className="reArrow" />
        <b className="title">
          {per.username}
          的设置
        </b>

        <div className="present">
          <div className="move">
            <p className="selectMember-fontColor llSize">从团队中移除XXA</p>
            <p className="selectMember-fontSize tip">
              被移除的成员将不能再访问工作台上的信息，但工作台上与他相关的信息将保留。
            </p>
          </div>
          <button
            type="button"
            className="moveBtn selectMember-btnMArg"
            onClick={() => {
              this.transferMsgDel(true);
            }}
          >
            确认移除
          </button>
          <br />

          <b className="littleSize title selectMember-titleMarg">设置</b>
          <Member
            members={identity}
            selMembers={selIdentities}
            transferMsg={this.transferMsgIden}
            dis
          />

          <b className="littleSize title selectMember-titleMarg">参与的项目</b>
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

          <button
            type="button"
            className="footerBtn saveBtn"
            onClick={this.saveModifyMember}
          >
            {ifSave ? "已保存" : "保存设置"}
          </button>

          <Save ifSave={ifSave} />

          <Delete
            name="确认要移除XXA吗?"
            delete={deleteX}
            transferMsg={this.transferMsgDel}
          />
          <Delete name="移除成功" cancel delete={deled} />
        </div>
      </div>
    );
  }
}

export default SetPersonalInfo;

/*
个人设置页面组件
*/
import React, { Component } from "react";
import GoBack from "../../../components/common/goBack/index";
import Member from "../components/member/member";
import Delete from "../components/delete/delete";
import Save from "../components/save/save";
import ManageService from "../../../service/manage";
import "../../../static/css/common.css";
import "./setPersonInfo.css";

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
      deleteX: false,
      deled: false
    };

    this.transferMsgMem = this.transferMsgMem.bind(this);
    this.transferMsgDel = this.transferMsgDel.bind(this);
    this.selAll = this.selAll.bind(this);
    this.saveModifyMember = this.saveModifyMember.bind(this);
    this.transferMsgIden = this.transferMsgIden.bind(this);
  }

  componentDidMount() {
    const per = JSON.parse(localStorage.per);
    const { identity, selIdentities } = this.state;

    if (per.role > 1) {
      identity[0].selected = true;
      identity[1].selected = false;
      if (per.role !== 7) selIdentities[0] = 3;
      else selIdentities[0] = 7;
    }

    ManageService.getPersonalPro().then(project => {
      if (project) {
        const proList = project.list.map(item => {
          const obj = {};

          obj.id = item.projectID;
          obj.name = item.projectName;
          obj.count = item.userCount;
          obj.intro = item.intro;
          obj.selected = false;

          return obj;
        });

        ManageService.getPersonalPro().then(pro => {
          let idList = [];

          if (pro) {
            idList = pro.list.map(item => item.projectID);

            proList.map(item1 => {
              const item = item1;

              if (idList.indexOf(item.id) !== -1) item.selected = true;

              return item;
            });
          }

          this.setState({
            members: proList,
            selMembers: idList,
            identity,
            selIdentities
          });
        });
      }
    });
  }

  transferMsgIden(mem, selMem) {
    this.setState({
      identity: mem,
      selIdentities: selMem
    });
  }

  transferMsgDel(deleteX, deled) {
    this.setState({
      deleteX,
      deled
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
    const per = JSON.parse(localStorage.per);
    const { selIdentities, selMembers } = this.state;

    this.setState({ ifSave: true });

    setTimeout(() => {
      this.setState({ ifSave: false });
    }, 1000);

    ManageService.saveModifyMemberIdenty(per.id, selIdentities);
    ManageService.saveModifyMemberPro(per.id, selMembers);
  }

  render() {
    const per = JSON.parse(localStorage.per);
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
        <GoBack />
        <b className="title">
          {per.name}
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
            deleteX={deleteX}
            transferMsg={this.transferMsgDel}
            memDel
            userId={per.id}
            certain
          />
          <Delete
            name="移除成功"
            cancel
            deleteX={deled}
            transferMsg={this.transferMsgDel}
          />
        </div>
      </div>
    );
  }
}

export default SetPersonalInfo;

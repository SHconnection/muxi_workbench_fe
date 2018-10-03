/*
个人设置页面组件
*/
import React, { Component } from "react";
import GoBack from "../../../components/common/goBack/index";
import Member from "../components/member/member";
import Save from "../components/save/save";
import ManageService from "../../../service/manage";
import "../../../static/css/common.css";
import "./personalSetting.css";

class PersonalSet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selMembers: [],
      members: [
        { name: "站内信", selected: false, id: 1 },
        { name: "邮箱通知", selected: false, id: 2 }
      ],
      ifSave: false,
      inputName: "",
      inputMailbox: "",
      inputPhone: ""
    };

    this.savePersonalSet = this.savePersonalSet.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeMailbox = this.changeMailbox.bind(this);
    this.changePhone = this.changePhone.bind(this);
    this.transferMsgMem = this.transferMsgMem.bind(this);
  }

  componentDidMount() {
    const per = JSON.parse(localStorage.per);

    if (per.id) {
      this.setState({
        inputName: per.name,
        inputPhone: per.phone,
        inputMailbox: per.mail
      });
    }
  }

  changeName(e) {
    this.setState({
      inputName: e.target.value
    });
  }

  changeMailbox(e) {
    this.setState({
      inputMailbox: e.target.value
    });
  }

  changePhone(e) {
    this.setState({
      inputPhone: e.target.value
    });
  }

  transferMsgMem(members, selMembers) {
    this.setState({
      members,
      selMembers: selMembers || []
    });
  }

  savePersonalSet() {
    const { inputName, inputMailbox, inputPhone, selMembers } = this.state;
    const per = JSON.parse(localStorage.per);
    const obj = {
      username: inputName,
      address: inputMailbox,
      tel: inputPhone,
      message: selMembers.indexOf(1) !== -1,
      email: selMembers.indexOf(2) !== -1
    };

    this.setState({ ifSave: true });

    setTimeout(() => {
      this.setState({ ifSave: false });
    }, 1000);

    ManageService.savePersonalSet(per.id, obj);
  }

  render() {
    const {
      members,
      selMembers,
      ifSave,
      inputName,
      inputPhone,
      inputMailbox
    } = this.state;

    return (
      <div className="subject minH">
        <GoBack />
        <b className="title">个人设置</b>

        <div className="main">
          <img src="" className="personalSet-avatar" alt="" />
          <div className="avaTip">
            <b>选择新头像</b>
            <p className="avaForm">你可以选择png/jpg图片作为头像</p>
          </div>
          <div>
            <b>名字</b>
            <input
              type="text"
              placeholder="木小犀"
              className="writeTip"
              value={inputName}
              onChange={this.changeName}
            />
            <br />
            <b>邮箱</b>
            <input
              type="text"
              placeholder="178107487@qq.com"
              className="writeTip"
              value={inputMailbox}
              onChange={this.changeMailbox}
            />
            <br />
            <b>手机</b>
            <input
              type="text"
              placeholder="13924173096"
              className="writeTip"
              value={inputPhone}
              onChange={this.changePhone}
            />
            <br />
          </div>
        </div>

        <div className="footer">
          <b>通知设置</b>
          <div className="sel">
            <Member
              members={members}
              selMembers={selMembers}
              wrap
              transferMsg={this.transferMsgMem}
            />
          </div>
          <br />
          <button
            type="button"
            className="saveBtn"
            onClick={this.savePersonalSet}
          >
            {ifSave ? "已保存" : "保存设置"}
          </button>
        </div>

        <Save ifSave={ifSave} />
      </div>
    );
  }
}

export default PersonalSet;

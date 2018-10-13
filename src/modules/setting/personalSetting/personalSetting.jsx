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
      inputPhone: "",
      img: ""
    };

    this.savePersonalSet = this.savePersonalSet.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeMailbox = this.changeMailbox.bind(this);
    this.changePhone = this.changePhone.bind(this);
    this.transferMsgMem = this.transferMsgMem.bind(this);
    this.changeImg = this.changeImg.bind(this);
  }

  componentDidMount() {
    const per = JSON.parse(localStorage.per);

    ManageService.getPersonalSet(per.id).then(setting => {
      const { members } = this.state;

      members[0].selected = !!setting.message;
      members[1].selected = !!setting.email_service;

      this.setState({
        inputName: setting.name,
        inputPhone: setting.tel,
        inputMailbox: setting.email,
        members,
        img: setting.avatar
      });
    });
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
    const img = this.myAvatar.files[0];
    const data = new FormData();
    data.append("image", img);

    ManageService.savePersonalSet(per.id, obj);
    ManageService.savePersonalAvatar(data).then(response => {
      if (response.status < 300) {
        this.setState({ ifSave: true });

        setTimeout(() => {
          this.setState({ ifSave: false });
        }, 1000);
      }
    });
  }

  changeImg() {
    const img = this.myAvatar.files[0];

    if (img) {
      if (!/image\/\w+/.test(img.type)) return false;

      const reader = new FileReader();
      const _this = this;
      // 将文件以Data URL形式进行读入页面
      reader.readAsDataURL(img);

      reader.onload = e => {
        _this.setState({
          img: e.target.result
        });
      };
    }

    return this;
  }

  render() {
    const {
      members,
      selMembers,
      ifSave,
      inputName,
      inputPhone,
      inputMailbox,
      img
    } = this.state;

    return (
      <div className="subject minH">
        <GoBack />
        <b className="title">个人设置</b>

        <div className="main">
          <img src={img} className="personalSet-avatar" alt="" />
          <div className="avaTip">
            <b>
              选择新头像
              <input
                type="file"
                className="personalSet-selectImg"
                onChange={this.changeImg}
                accept=".png, .jpg"
                placeholder="选择新头像"
                ref={e => {
                  this.myAvatar = e;
                }}
              />
            </b>
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

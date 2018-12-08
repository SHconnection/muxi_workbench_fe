/*
个人设置页面组件
*/
import React, { Component } from "react";
import GoBack from "../../../components/common/goBack/index";
import Avatar from "../../../components/common/avatar/index";
import Member from "../components/member/member";
import Save from "../components/save/save";
import ManageService from "../../../service/manage";
import WrongPage from "../../../components/common/wrongPage/wrongPage";
import Loading from "../../../components/common/loading/index";
import EventBus from "../../../components/common/eventBus/eventBus";
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
      img: "",
      wrong: {},
      nameIsNull: false,
      mailboxIsNull: false,
      phoneIsNull: false
    };
  }

  componentDidMount() {
    Loading.show();
    ManageService.getPersonalSet(localStorage.per)
      .then(setting => {
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
      })
      .catch(error => {
        this.setState({ wrong: error });
      })
      .finally(() => {
        Loading.hide();
      });
  }

  changeName = e => {
    if (e.target.value) {
      this.setState({
        inputName: e.target.value,
        nameIsNull: false
      });
    } else {
      this.setState({
        inputName: e.target.value,
        nameIsNull: true
      });
    }
  };

  changeMailbox = e => {
    if (e.target.value) {
      this.setState({
        inputMailbox: e.target.value,
        mailboxIsNull: false
      });
    } else {
      this.setState({
        inputMailbox: e.target.value,
        mailboxIsNull: true
      });
    }
  };

  changePhone = e => {
    if (e.target.value) {
      this.setState({
        inputPhone: e.target.value,
        phoneIsNull: false
      });
    } else {
      this.setState({
        inputPhone: e.target.value,
        phoneIsNull: true
      });
    }
  };

  transferMsgMem = (members, selMembers) => {
    this.setState({
      members,
      selMembers: selMembers || []
    });
  };

  savePersonalSet = () => {
    const { inputName, inputMailbox, inputPhone, selMembers, img } = this.state;
    const obj = {
      username: inputName,
      address: inputMailbox,
      tel: inputPhone,
      message: selMembers.indexOf(1) !== -1,
      email: selMembers.indexOf(2) !== -1
    };

    const fileImg = this.myAvatar.files[0];
    if (fileImg) {
      const data = new FormData();
      data.append("image", fileImg);

      ManageService.savePersonalSet(localStorage.per, obj).catch(error => {
        this.setState({ wrong: error });
      });

      ManageService.savePersonalAvatar(data)
        .then(() => {
          this.setState({ ifSave: true });
          EventBus.emit("modifyUserAvatar", img);

          setTimeout(() => {
            this.setState({ ifSave: false });
          }, 1000);
        })
        .catch(error => {
          this.setState({ wrong: error });
        });
    } else {
      ManageService.savePersonalSet(localStorage.per, obj)
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
  };

  changeImg = () => {
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
  };

  cancel = () => {
    this.setState({ wrong: {} });
  };

  render() {
    const {
      members,
      selMembers,
      ifSave,
      inputName,
      inputPhone,
      inputMailbox,
      img,
      wrong,
      nameIsNull,
      mailboxIsNull
    } = this.state;

    return (
      <div className="subject minH">
        <GoBack />
        <b className="title">个人设置</b>

        <div className="main">
          <Avatar src={img} width={114} height={114} />
          <div className="personalSet-avaTip">
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
          <div className="personalSet-inputList">
            <b>名字</b>
            <input
              type="text"
              placeholder="木小犀"
              className="personalSet-writeTip"
              value={inputName}
              onChange={this.changeName}
              onBlur={this.changeName}
            />
            <p
              className={
                nameIsNull
                  ? "warning personalSet-warning"
                  : "transparent personalSet-warning"
              }
            >
              输入框不能为空！
            </p>
            <b>邮箱</b>
            <input
              type="text"
              placeholder="178107487@qq.com"
              className="personalSet-writeTip"
              value={inputMailbox}
              onChange={this.changeMailbox}
              onBlur={this.changeMailbox}
            />
            <p
              className={
                mailboxIsNull
                  ? "warning personalSet-warning"
                  : "transparent personalSet-warning"
              }
            >
              输入框不能为空！
            </p>
            <b>手机</b>
            <input
              type="text"
              placeholder="13924173096"
              className="personalSet-writeTip"
              value={inputPhone}
              onChange={this.changePhone}
              onBlur={this.changePhone}
            />
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

        <WrongPage info={wrong} cancel={this.cancel} />
      </div>
    );
  }
}

export default PersonalSet;

/*
个人设置页面组件
*/
import React, { Component } from "react";
import Mem from "../../../components/setting/member/member";
import Save from "../../../components/setting/save/save";
import Func from "../../../components/common/function/function";
import "../../../static/css/common.css";
import "./personal_setting.css";

class PerSet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selMembers: [],
      members: [
        { name: "站内信", selected: false },
        { name: "邮箱通知", selected: false }
      ],
      ifSave: false
    };

    Func.transferMsgMem = Func.transferMsgMem.bind(this);
    Func.save = Func.save.bind(this);
  }

  render() {
    const { members, selMembers, ifSave } = this.state;
    return (
      <div className="subject minH">
        <span className="reArrow" />
        <b className="title">个人设置</b>

        <div className="main">
          <img src="" className="avatar" alt="" />
          <div className="avaTip">
            <b>选择新头像</b>
            <p className="avaForm">你可以选择png/jpg图片作为头像</p>
          </div>
          <div>
            <b>名字</b>
            <input type="text" placeholder="木小犀" className="writeTip" />
            <br />
            <b>邮箱</b>
            <input
              type="text"
              placeholder="178107487@qq.com"
              className="writeTip"
            />
            <br />
            <b>手机</b>
            <input type="text" placeholder="13924173096" className="writeTip" />
            <br />
          </div>
        </div>

        <div className="footer">
          <b>通知设置</b>
          <div className="sel">
            <Mem
              members={members}
              selMembers={selMembers}
              wrap
              transferMsg={(mem, selMem) => {
                Func.transferMsgMem(mem, selMem);
              }}
            />
          </div>
          <br />
          <button
            type="button"
            className="saveBtn"
            onClick={() => {
              Func.save();
            }}
          >
            {ifSave ? "已保存" : "保存设置"}
          </button>
        </div>

        <Save ifSave={ifSave} />
      </div>
    );
  }
}

export default PerSet;

/*
项目设置--编辑成员页面组件
承接自项目设置--项目信息页面
接收项目信息参数
*/
import React, { Component } from "react";
import Mem from "../../../components/setting/member/member.jsx";
import "../../../static/css/common.css";
import "./set_personInfo.css";
import Del from "../../../components/setting/delete/delete.jsx";
import Save from "../../../components/setting/save/save.jsx";

class SelMem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selIdentities: [],
      selMembers: [],
      identity: [
        { name: "管理员", selected: false },
        { name: "成员", selected: false }
      ],
      members: [
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false },
        { name: "AXX", selected: false }
      ],
      ifSave: false,
      delete: false,
      deled: false
    };
  }

  transferMsgMem(mem, selMem) {
    this.setState({
      members: mem,
      selMembers: selMem
    });
  }

  transferMsgIden(mem, selMem) {
    this.setState({
      identity: mem,
      selIdentities: selMem
    });
  }

  selAll() {
    let arr = this.state.members,
      num = 0;
    if (arr) {
      arr.map(i => {
        if (i.selected) num++;
      });
    }
    if (num === arr.length) {
      arr.map(i => {
        i.selected = false;
      });
    } else {
      arr.map(i => {
        i.selected = true;
      });
    }
    this.setState({ members: arr });
  }

  save() {
    this.setState({ ifSave: true });

    setTimeout(() => {
      this.setState({ ifSave: false });
    }, 1000);
  }

  transferDel(del) {
    this.setState({
      delete: del
    });
  }

  transferDeled(del) {
    this.setState({
      deled: del
    });
  }

  render() {
    return (
      <div className="subject minH">
        <span className="reArrow" />
        <b className="title">
          {this.props.personName}
          的设置
        </b>

        <div className="present">
          <div className="move">
            <p className="SelMem_FC llSize">从团队中移除XXA</p>
            <p className="SelMem_FS tip">
              被移除的成员将不能再访问工作台上的信息，但工作台上与他相关的信息将保留。
            </p>
          </div>
          <button
            className="moveBtn SelMem_btnMArg"
            onClick={() => {
              this.setState({ delete: true });
            }}
          >
            确认移除
          </button>
          <br />

          <b className="littleSize title SelMem_titleMarg">设置</b>
          <Mem
            members={this.state.identity}
            selMembers={this.state.selIdentities}
            transferMsg={this.transferMsgIden.bind(this)}
            dis
          />

          <b className="littleSize title SelMem_titleMarg">参与的项目</b>
          <span className="fakeBtn" onClick={this.selAll.bind(this)}>
            全选
          </span>
          <Mem
            members={this.state.members}
            selMembers={this.state.selMembers}
            transferMsg={this.transferMsgMem.bind(this)}
          />

          <button className="footerBtn saveBtn" onClick={this.save.bind(this)}>
            {this.state.ifSave ? "已保存" : "保存设置"}
          </button>

          <Save ifSave={this.state.ifSave} />

          <Del
            name="确认要移除XXA吗?"
            delete={this.state.delete}
            transferMsg={this.transferDel.bind(this)}
            transferMsgAft={this.transferDeled.bind(this)}
          />
          <Del name="移除成功" cancel delete={this.state.deled} />
        </div>
      </div>
    );
  }
}

export default SelMem;

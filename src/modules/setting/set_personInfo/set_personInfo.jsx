/*
项目设置--编辑成员页面组件
承接自项目设置--项目信息页面
接收项目信息参数
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import Mem from "../../../components/setting/member/member";
import Del from "../../../components/setting/delete/delete";
import Save from "../../../components/setting/save/save";
import Func from "../../../components/common/function/function";
import "../../../static/css/common.css";
import "./set_personInfo.css";

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
      deleteX: false
    };

    Func.transferMsgMem = Func.transferMsgMem.bind(this);
    Func.transferMsgDel = Func.transferMsgDel.bind(this);
    Func.selAll = Func.selAll.bind(this);
    Func.save = Func.save.bind(this);
  }

  transferMsgIden(mem, selMem) {
    this.setState({
      identity: mem,
      selIdentities: selMem
    });
  }

  render() {
    const { personName } = this.props;
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
          {personName}
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
            type="button"
            className="moveBtn SelMem_btnMArg"
            onClick={() => {
              this.setState({ deleteX: true });
            }}
          >
            确认移除
          </button>
          <br />

          <b className="littleSize title SelMem_titleMarg">设置</b>
          <Mem
            members={identity}
            selMembers={selIdentities}
            transferMsg={(mem, selMem) => {
              this.transferMsgIden(mem, selMem);
            }}
            dis
          />

          <b className="littleSize title SelMem_titleMarg">参与的项目</b>
          <span
            className="fakeBtn"
            onClick={() => {
              Func.selAll();
            }}
            onKeyDown={this.handleClick}
            role="button"
            tabIndex="-1"
          >
            全选
          </span>
          <Mem
            members={members}
            selMembers={selMembers}
            transferMsg={(mem, selMem) => {
              Func.transferMsgMem(mem, selMem);
            }}
          />

          <button
            type="button"
            className="footerBtn saveBtn"
            onClick={() => {
              Func.save();
            }}
          >
            {ifSave ? "已保存" : "保存设置"}
          </button>

          <Save ifSave={ifSave} />

          <Del
            name="确认要移除XXA吗?"
            delete={deleteX}
            transferMsg={del => {
              Func.transferMsgDel(del);
            }}
          />
          <Del name="移除成功" cancel delete={deled} />
        </div>
      </div>
    );
  }
}

export default SelMem;

SelMem.propTypes = {
  personName: PropTypes.string
};

SelMem.defaultProps = {
  personName: ""
};

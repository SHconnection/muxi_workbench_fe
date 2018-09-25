/*
处理申请页面组件
成员数据members:{name:'', mailbox:'',dealed: false,id:0},
*/
import React, { Component } from "react";
import ManageService from "../../../service/manage";
import "../../../static/css/common.css";
import "./joinApply.css";

class JoinApply extends Component {
  constructor(props) {
    super(props);

    this.state = {
      members: []
    };
  }

  componentDidMount() {
    const joinList = ManageService.getJoinApply();

    this.setState({ members: joinList });

    return true;
  }

  save(mem1) {
    const mem = mem1;

    mem.dealed = true;

    ManageService.addMember(mem.id);
    ManageService.dealJoinApply(mem.id);

    return this;
  }

  del(mem1) {
    const mem = mem1;

    mem.dealed = true;

    ManageService.dealJoinApply(mem.id);

    return this;
  }

  saveAll() {
    const { members: arr1 } = this.state;

    arr1.map(mem1 => {
      const mem = mem1;

      mem.dealed = true;

      ManageService.addMember(mem.id);

      return mem;
    });
  }

  render() {
    const { members } = this.state;

    return (
      <div className="subject minH">
        <span className="reArrow" />
        <b className="title">未审核的加入申请</b>
        <br />
        <button
          type="button"
          className="saveBtn btnFlo"
          onClick={this.saveAll.bind(this)}
        >
          全部同意
        </button>
        <div className="clear present">
          {members.map(mem1 => {
            const mem = mem1;

            return (
              <div className={mem.dealed ? "none" : "cell"} key={mem.id}>
                <b>{mem.name}</b>
                <span className="llSize pos">{mem.email}</span>
                <div className="litSel">
                  <span
                    role="button"
                    tabIndex="-1"
                    className="fakeBtn"
                    onClick={() => {
                      this.del(mem);
                    }}
                    onKeyDown={this.handleClick}
                  >
                    不同意
                  </span>
                  <span
                    role="button"
                    tabIndex="-1"
                    className="fakeBtn"
                    onClick={() => {
                      this.save(mem);
                    }}
                    onKeyDown={this.handleClick}
                  >
                    同意
                  </span>
                </div>
              </div>
            );
          }, this)}
        </div>
      </div>
    );
  }
}

export default JoinApply;

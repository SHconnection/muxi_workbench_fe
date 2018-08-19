/*
处理申请页面组件
成员数据members:{name:'', mailbox:'',dealed: false},
同意的名单selMembers:[]
transferMsg = (mem, selMem) => {this.setState({members: mem,selMembers: selMem});}返回数据
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import "../../../static/css/common.css";
import "./join_apply.css";

class JoinApp extends Component {
  cancel(mem1) {
    const mem = mem1;
    const { members: arr1, selMembers: arr2, transferMsg } = this.props;
    if (!mem.dealed) mem.dealed = true;

    transferMsg(arr1, arr2);
  }

  save(mem1) {
    const mem = mem1;
    const { members: arr1, selMembers: arr2, transferMsg } = this.props;
    const index = arr2.indexOf(mem);

    if (index === -1) {
      mem.dealed = true;
      arr2.push(mem);
    }

    transferMsg(arr1, arr2);
  }

  saveAll() {
    const { members: arr1, transferMsg } = this.props;
    let { selMembers: arr2 } = this.props;

    arr1.map(mem1 => {
      const mem = mem1;
      mem.dealed = true;
      return true;
    });

    arr2 = arr1.slice(0);

    transferMsg(arr1, arr2);
  }

  render() {
    const { members } = this.props;
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
          {members.map(function Map(mem1) {
            const mem = mem1;
            return (
              <div className={mem.dealed ? "none" : "cell"}>
                <b>{mem.name}</b>
                <span className="llSize pos">{mem.mailbox}</span>
                <div className="litSel">
                  <span
                    role="button"
                    tabIndex="-1"
                    className="fakeBtn"
                    onClick={() => {
                      this.cancel(mem);
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

export default JoinApp;

JoinApp.propTypes = {
  members: PropTypes.arrayOf,
  selMembers: PropTypes.arrayOf,
  transferMsg: PropTypes.func
};

JoinApp.defaultProps = {
  members: [],
  selMembers: [],
  transferMsg: () => {}
};

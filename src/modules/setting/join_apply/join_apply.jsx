/*
处理申请页面组件
成员数据members:{name:'', mailbox:'',dealed: false,id:0},
同意的人员id，selMembers:[]
更新父组件数据transferMsg
*/
import React, { Component } from "react";
import "../../../static/css/common.css";
import "./join_apply.css";

class JoinApply extends Component {
  constructor(props) {
    super(props);

    this.state = {
      members: [],
      selMembers: []
    };

    this.del = this.del.bind(this);
  }

  componentDidMount() {
    const arr = [];

    this.setState({ members: arr });
  }

  save(mem1) {
    const mem = mem1;
    const { members: arr1, selMembers: arr2 } = this.state;
    const index = arr2.indexOf(mem.id);

    mem.dealed = true;

    if (index === -1) {
      arr2.push(mem.id);
    }

    this.setState({
      members: arr1,
      selMembers: arr2
    });
  }

  del(mem1) {
    const mem = mem1;
    const { members: arr1, selMembers: arr2 } = this.state;

    mem.dealed = true;

    this.setState({
      members: arr1,
      selMembers: arr2
    });
  }

  saveAll() {
    const { members: arr1 } = this.state;
    const arr2 = [];

    arr1.map(mem1 => {
      const mem = mem1;
      mem.dealed = true;
      const index = arr2.indexOf(mem.id);
      if (index === -1) arr2.push(mem.id);
      return mem;
    });

    this.setState({
      members: arr1,
      selMembers: arr2
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
                <span className="llSize pos">{mem.mailbox}</span>
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

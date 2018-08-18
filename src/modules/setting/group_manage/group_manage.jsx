/*
处理申请页面组件
成员数据members:{name:'', mailbox:'',dealed: false},
同意的名单selMembers:[]
transferMsg = (mem, selMem) => {this.setState({members: mem,selMembers: selMem});}返回数据
*/
import React, { Component } from "react";
import "../../../static/css/common.css";
import "./group_manage.css";
import "../join_apply/join_apply.css";
import Del from "../../../components/setting/delete/delete.jsx";

class GroupMana extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delete: undefined
    };
  }

  del(mem) {
    const arr = this.props.members;

    if (!mem.dealed) mem.dealed = true;

    this.props.transferMsg(arr);
  }

  componentWillUnmount() {
    const arr = this.props.members;

    arr.filter(item => !item.dealed);

    this.props.transferMsg(arr);
  }

  transferDel(del) {
    this.setState({
      delete: del
    });
  }

  render() {
    return (
      <div className="subject minH">
        <span className="reArrow" />
        <b className="title">分组管理</b>
        <br />
        <span className="GroupMana_tip tip">上下拖动对分组排序</span>
        <button className="saveBtn btnFlo">添加分组</button>
        <div className="clear present">
          {this.props.members.map(function(mem) {
            return (
              <div className={mem.dealed ? "none" : "cell GroupMana_reCell"}>
                <b>{mem.name}</b>
                <span className="llSize pos GroupMana_rePos">{mem.number}</span>
                <div className="litSel">
                  <span className="fakeBtn">编辑</span>
                  <span
                    className="fakeBtn"
                    onClick={this.transferDel.bind(this, mem)}
                  >
                    删除
                  </span>
                </div>
              </div>
            );
          }, this)}
        </div>

        <Del
          name="确认要移除该组吗?"
          delete={this.state.delete}
          transferMsg={this.transferDel.bind(this)}
          del={this.del.bind(this)}
        />
      </div>
    );
  }
}

export default GroupMana;

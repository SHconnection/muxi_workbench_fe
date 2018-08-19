/*
处理申请页面组件
成员数据members:{name:'', mailbox:'',dealed: false},
同意的名单selMembers:[]
transferMsg = (mem, selMem) => {this.setState({members: mem,selMembers: selMem});}返回数据
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import Del from "../../../components/setting/delete/delete";
import Func from "../../../components/common/function/function";
import "../../../static/css/common.css";
import "./group_manage.css";
import "../join_apply/join_apply.css";

class GroupMana extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteX: undefined
    };

    Func.transferMsgDel = Func.transferMsgDel.bind(this);
  }

  componentWillUnmount() {
    const { members: arr, transferMsg } = this.props;

    arr.filter(item => !item.dealed);

    transferMsg(arr);
  }

  del(mem1) {
    const mem = mem1;

    const { members: arr, transferMsg } = this.props;

    if (!mem.dealed) mem.dealed = true;

    transferMsg(arr);
  }

  render() {
    const { members } = this.props;
    const { deleteX } = this.state;
    return (
      <div className="subject minH">
        <span className="reArrow" />
        <b className="title">分组管理</b>
        <br />
        <span className="GroupMana_tip tip">上下拖动对分组排序</span>
        <button type="button" className="saveBtn btnFlo">
          添加分组
        </button>
        <div className="clear present">
          {members.map(function Map(mem1) {
            const mem = mem1;
            return (
              <div className={mem.dealed ? "none" : "cell GroupMana_reCell"}>
                <b>{mem.name}</b>
                <span className="llSize pos GroupMana_rePos">{mem.number}</span>
                <div className="litSel">
                  <span className="fakeBtn">编辑</span>
                  <span
                    className="fakeBtn"
                    onClick={() => {
                      Func.transferMsgDel(mem);
                    }}
                    onKeyDown={this.handleClick}
                    role="button"
                    tabIndex="-1"
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
          delete={deleteX}
          transferMsg={del => {
            Func.transferMsgDel(del);
          }}
          del={mem1 => {
            this.del(mem1);
          }}
        />
      </div>
    );
  }
}

export default GroupMana;

GroupMana.propTypes = {
  members: PropTypes.arrayOf,
  transferMsg: PropTypes.func
};

GroupMana.defaultProps = {
  members: [],
  transferMsg: () => {}
};

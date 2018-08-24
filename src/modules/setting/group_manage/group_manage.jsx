/*
编辑分组页面组件
*/
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Delete from "../components/delete/delete";
import Func from "../../../components/common/function/function";
import "../../../static/css/common.css";
import "./group_manage.css";
import "../join_apply/join_apply.css";

class GroupManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteX: false,
      data: undefined,
      members: []
    };

    this.transferMsgDel = this.transferMsgDel.bind(this);
  }

  componentDidMount() {
    const arr = Func.getAllGroup();

    this.setState({ members: arr });
  }

  transferMsgDel(deleteX) {
    this.setState({ deleteX });
  }

  del(mem) {
    this.setState({
      data: mem,
      deleteX: true
    });
  }

  render() {
    const { deleteX, data, members } = this.state;

    return (
      <div className="subject minH">
        <span className="reArrow" />
        <b className="title">分组管理</b>
        <br />
        <span className="groupManage-tip tip">上下拖动对分组排序</span>
        <button type="button" className="saveBtn btnFlo">
          添加分组
        </button>
        <div className="clear present">
          {members.map(mem1 => {
            const mem = mem1;

            return (
              <div
                className={mem.dealed ? "none" : "cell groupManage-reCell"}
                key={mem.id}
              >
                <b>{mem.name}</b>
                <span className="llSize pos groupManage-rePos">
                  {mem.count}
                </span>
                <div className="litSel">
                  <Link to={`/GroupMember/${mem.id}`} className="fakeBtn">
                    编辑
                  </Link>
                  <span
                    className="fakeBtn"
                    onClick={() => {
                      this.del(mem);
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

        <Delete
          name="确认要移除该组吗?"
          deleteX={deleteX}
          transferMsg={this.transferMsgDel}
          data={data}
          del
        />
      </div>
    );
  }
}

export default GroupManage;

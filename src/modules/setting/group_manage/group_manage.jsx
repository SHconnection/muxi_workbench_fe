/*
编辑分组页面组件
*/
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Delete from "../components/delete/delete";
import Func from "../../../components/common/function/function";
import ManageService from "../../../service/manage";
import "../../../static/css/common.css";
import "./group_manage.css";
import "../join_apply/join_apply.css";

class GroupManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteX: false,
      data: undefined,
      members: [],
    };

    this.transferMsgDel = this.transferMsgDel.bind(this);
    this.delete = this.delete.bind(this);
    this.drag = this.drag.bind(this);
    this.dragEnter = this.dragEnter.bind(this);
    this.drop = this.drop.bind(this);
  }

  componentDidMount() {
    const arr = Func.getAllGroup();

    this.setState({ members: arr });
  }

  transferMsgDel(deleteX) {
    this.setState({ deleteX });
  }

  delete(mem) {
    this.setState({
      data: mem,
      deleteX: true
    });
  }

  drag(ev){
    this.startID = ev.target.dataset.id;
  }

  dragEnter(ev){
    this.endID = ev.target.dataset.id;
  }

  drop(){
    let {members} = this.state;
    let index1;
    let index2;

    members.map((mem1, index)=>{
      const mem = mem1;
      if(mem.id === parseInt(this.startID))
        index1 = index;
      if(mem.id === parseInt(this.endID))
        index2 = index;
      return mem;
    })
    const temp = members[index1];
    members[index1] = members[index2];
    members[index2] = temp;

    this.setState({members: members})
  }

  dragOver(ev){
    ev.preventDefault();
  }

  render() {
    const { deleteX, data, members } = this.state;

    return (
      <div className="subject minH">
        <span className="reArrow" />
        <b className="title">分组管理</b>
        <br />
        <span className="groupManage-tip tip">上下拖动对分组排序</span>
        <Link to="/teamMember/groupManage/addGroup">
          <button type="button" className="saveBtn btnFlo">
            添加分组
          </button>
        </Link>
        <div className="clear present" onDrop={this.drop}>
          {members.map(mem1 => {
            const mem = mem1;

            return (
              <div
                className={mem.dealed ? "none" : "cell groupManage-reCell"}
                key={mem.id}
                draggable="true" 
                onDragStart={this.drag}
                data-id={mem.id}
                onDragEnter={this.dragEnter}
                onDragOver={this.dragOver}
              >
                <b>{mem.name}</b>
                <span className="llSize pos groupManage-rePos">
                  {mem.count}
                </span>
                <div className="litSel">
                  <Link to={`/teamMember/groupManage/groupMember/${JSON.stringify({name: mem.name, id: mem.id})}`} className="fakeBtn">
                    编辑
                  </Link>
                  <span
                    className="fakeBtn"
                    onClick={() => {
                      this.delete(mem);
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
          groupDel
        />
      </div>
    );
  }
}

export default GroupManage;

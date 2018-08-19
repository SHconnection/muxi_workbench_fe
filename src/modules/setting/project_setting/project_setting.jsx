/*
项目设置--项目信息页面组件
为项目设置首页，下接编辑成员页面
*/
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Func from "../../../components/common/function/function";
import Del from "../../../components/setting/delete/delete";
import ProSetFir from "../../../components/project/project_setFirst/project_setFirst";
import "../../../static/css/common.css";
import "./project_setting.css";

class SetProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteX: false
    };

    Func.transferMsgDel = Func.transferMsgDel.bind(this);
  }

  render() {
    const { deleteX } = this.state;

    return (
      <div className="subject minH">
        <ProSetFir />

        <div className="select">
          <button type="button" className="saveBtn">
            <Link to="/editMem" className="link">
              保存
            </Link>
          </button>
          <button
            type="button"
            className="delBtn"
            onClick={() => {
              Func.transferMsgDel(true);
            }}
          >
            删除项目
          </button>
          <span className="fakeBtn">取消</span>
        </div>

        <Del
          name="确认要移除该项目吗?"
          delete={deleteX}
          transferMsg={del => {
            Func.transferMsgDel(del);
          }}
        />
      </div>
    );
  }
}

export default SetProject;

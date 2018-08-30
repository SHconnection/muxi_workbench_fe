/*
添加成员页面组件
*/
import React, { Component } from "react";
import "../../../static/css/common.css";
import "./addMember.css";

class AddMem extends Component {
  constructor(props) {
    super(props);

    this.copy = this.copy.bind(this);
  }

  copy() {
    const e = this.textInput;

    e.select();

    document.execCommand("copy");
  }

  render() {
    return (
      <div className="subject minH">
        <span className="reArrow" />
        <b className="title">添加新成员</b>
        <div className="present">
          <b className="title littleSize">发送链接邀请新成员</b>
          <br />
          <input
            type="text"
            placeholder="https://modao.cc/app/c10SrQ7RsFKQ9"
            className="inputSize addMember-inputStyle"
            ref={c => {
              this.textInput = c;
            }}
          />
          <button type="button" className="saveBtn" onClick={this.copy}>
            复制
          </button>
          <p className="addMember-fontMargin">
            复制上面的链接发送给需要邀请的人。任何看到邀请的人，都可以申请加入团队，如果想要链接失效，请
            <span className="addMember-fontStyle">重新生成链接。</span>
          </p>
        </div>
      </div>
    );
  }
}

export default AddMem;

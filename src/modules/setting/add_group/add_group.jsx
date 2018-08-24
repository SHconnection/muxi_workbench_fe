/*
项目设置--编辑成员页面组件
承接自项目设置--项目信息页面
接收项目信息参数
*/
import React, { Component } from "react";
import SelectMember from "../components/select_member/select_member";
import "../../../static/css/common.css";
import "./add_group.css";

class AddGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: ""
    };

    this.changeInput = this.changeInput.bind(this);
  }

  changeInput(e) {
    this.setState({ inputValue: e.target.value });
  }

  render() {
    const { inputValue } = this.state;

    return (
      <div className="subject minH">
        <span className="reArrow" />
        <b className="title">添加成员分组</b>
        <br />
        <input
          type="text"
          className="inputSize addGroup-inputMarg"
          placeholder="请为分组命名"
          value={inputValue}
          onChange={this.changeInput}
        />
        <SelectMember addGroup groupName={inputValue} />
      </div>
    );
  }
}

export default AddGroup;

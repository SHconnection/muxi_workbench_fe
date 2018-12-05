/*
项目设置--编辑成员页面组件
承接自项目设置--项目信息页面
接收项目信息参数
*/
import React, { Component } from "react";
import GoBack from "../../../components/common/goBack/index";
import SelectMember from "../components/selectMember/selectMember";
import "../../../static/css/common.css";
import "./addGroup.css";

class AddGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: "",
      inputIsNull: false
    };
  }

  changeInput = e => {
    if (e.target.value) {
      this.setState({
        inputValue: e.target.value,
        inputIsNull: false
      });
    } else {
      this.setState({
        inputValue: e.target.value,
        inputIsNull: true
      });
    }
  };

  render() {
    const { inputValue, inputIsNull } = this.state;

    return (
      <div className="subject minH">
        <GoBack />
        <b className="title">添加成员分组</b>
        <div className="present addGroup-rePresent">
          <input
            type="text"
            className="inputSize"
            placeholder="请为分组命名"
            value={inputValue}
            onBlur={this.changeInput}
            onChange={this.changeInput}
          />
          <p className={inputIsNull ? "warning" : "transparent"}>
            输入框不能为空！
          </p>
        </div>
        <SelectMember addGroup groupName={inputValue} />
      </div>
    );
  }
}

export default AddGroup;

/*
项目设置--编辑成员页面组件
承接自项目设置--项目信息页面
接收项目信息参数
*/
import React, { Component } from "react";
import GoBack from "components/common/goBack/index";
import SelectMember from "../components/selectMember/selectMember";
import "static/css/common.scss";
import "./addGroup.scss";

class AddGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: "",
      inputIsNull: false
    };
  }

  changeInput = e => {
    if (e.target.value.trim()) {
      this.setState({
        inputValue: e.target.value,
        inputIsNull: false
      });
    } else {
      e.target.placeholder = "请为分组命名";
      this.setState({
        inputValue: e.target.value,
        inputIsNull: true
      });
    }
  };

  transferMsg = inputIsNull => {
    this.setState({
      inputIsNull
    });
  };

  render() {
    const { inputValue, inputIsNull } = this.state;

    return (
      <div>
        <GoBack />
        <b className="title">添加成员分组</b>
        <div className="present addGroup-rePresent">
          <input
            type="text"
            className="inputSize"
            placeholder="请为分组命名"
            value={inputValue}
            onFocus={e => {
              e.target.placeholder = "";
            }}
            onBlur={this.changeInput}
            onChange={this.changeInput}
          />
          <p className={inputIsNull ? "warning" : "transparent"}>
            输入框不能为空！
          </p>
        </div>
        <SelectMember
          addGroup
          groupName={inputValue}
          transferMsg={this.transferMsg}
        />
      </div>
    );
  }
}

export default AddGroup;

/*
管理单组界面(修改成员)
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import GoBack from "components/common/goBack/index";
import SelectMember from "../components/selectMember/selectMember";
import "static/css/common.scss";
import "./groupMember.scss";

class GroupMember extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: "",
      inputIsNull: false
    };
  }

  componentDidMount() {
    const {
      location: {
        state: { per }
      }
    } = this.props;

    this.setState({
      inputValue: per.name
    });
  }

  changeInput = e => {
    if (e.target.value.trim()) {
      this.setState({
        inputValue: e.target.value,
        inputIsNull: false
      });
    } else {
      e.target.placeholder = "组别名称";
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
    const {
      location: {
        state: { per }
      }
    } = this.props;

    return (
      <div>
        <GoBack />
        <b className="title groupMember-title">分组管理</b>
        <input
          className="groupMember-groupName"
          placeholder="组别名称"
          value={inputValue}
          onFocus={e => {
            e.target.placeholder = "";
          }}
          onChange={this.changeInput}
          onBlur={this.changeInput}
        />
        <span
          className={
            inputIsNull ? "warning groupMember-warning" : "transparent"
          }
        >
          输入框不能为空！
        </span>
        <SelectMember
          groupMember
          groupID={per.id}
          groupName={inputValue}
          transferMsg={this.transferMsg}
        />
      </div>
    );
  }
}

export default GroupMember;

GroupMember.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      per: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
      })
    })
  })
};

GroupMember.defaultProps = {
  location: {}
};

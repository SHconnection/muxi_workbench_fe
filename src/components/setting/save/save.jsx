import React, { Component } from "react";
import "./save.css";
import "../../../static/css/common.css";

class Save extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={this.props.ifSave ? "subject isSave" : "none"}>
        <div className="circle" />
        保存成功
      </div>
    );
  }
}

export default Save;

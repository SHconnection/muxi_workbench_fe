import React, { Component } from "react";
import "./delete.css";
import "../../../static/css/common.css";

class Del extends Component {
  constructor(props) {
    super(props);
  }

  move() {
    if (this.props.del) {
      this.props.del(this.props.delete);
    }
  }

  miss() {
    if (this.props.transferMsg) {
      this.props.transferMsg(undefined);
    }
    if (this.props.transferMsgAft) {
      this.props.transferMsgAft(true);
    }
  }

  render() {
    return (
      <div className={this.props.delete ? "contain minH" : "none"}>
        <div className = "subject alert">
          <span>{this.props.name}</span>
          <div className="DEl_alertMarg" onClick={this.miss.bind(this)}>
            <button
              className={this.props.cancel ? "none" : "delBtn Del_btnMarg"}
            >
              取消
            </button>
            <button
              className = "saveBtn Del_btnMarg"
              onClick={this.move.bind(this)}
            >
              确定
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Del;

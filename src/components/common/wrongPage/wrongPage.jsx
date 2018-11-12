/*
团队成员页面组件
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import "../../../static/css/common.css";

class WrongPage extends Component {
  render() {
    const { info, cancel } = this.props;

    return (
      <div
        className={info ? "contain minH" : "none"}
        ref={c => {
          this.contain = c;
        }}
      >
        <div className="subject alert">
          <p>{info}</p>
          <button
            type="button"
            className="delBtn delete-btnMarg"
            onClick={() => {
              window.history.back();
            }}
            onKeyDown={this.handleClick}
          >
            返回
          </button>
          <button
            type="button"
            className="certainBtn delete-btnMarg"
            onClick={() => {
              cancel();
            }}
            onKeyDown={this.handleClick}
          >
            取消
          </button>
        </div>
      </div>
    );
  }
}

export default WrongPage;

WrongPage.propTypes = {
  info: PropTypes.string,
  cancel: PropTypes.func
};

WrongPage.defaultProps = {
  info: "",
  cancel: () => {}
};

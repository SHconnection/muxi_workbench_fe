/*
团队成员页面组件
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "static/css/common.scss";
import "./wrongPage.scss";

class WrongPage extends Component {
  componentDidUpdate() {
    if (this.contain) {
      this.contain.style.display = "block";
    }
  }

  render() {
    const {
      storeWrongInfo: { message }
    } = this.props;

    return !message ? null : (
      <div
        className="contain minH wrongPage-wrongTip"
        ref={c => {
          this.contain = c;
        }}
      >
        <div className="subject alert">
          <p>{message}</p>
          <button
            type="button"
            className="delBtn delete-btnMarg"
            onClick={() => {
              this.contain.style.display = "none";
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
              this.contain.style.display = "none";
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

WrongPage.propTypes = {
  storeWrongInfo: PropTypes.shape({
    message: PropTypes.string
  })
};

WrongPage.defaultProps = {
  storeWrongInfo: new Error("")
};

const mapStateToProps = state => ({
  storeWrongInfo: state.wrongInfo
});

export default connect(mapStateToProps)(WrongPage);

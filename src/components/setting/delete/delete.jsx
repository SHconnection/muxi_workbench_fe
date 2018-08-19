/*
删除框组件
删除框名称name:'',
取消cancel:false,
点击删除delete:false,
删除一个数据del = (mem) => {const arr = this.props.members;if(!mem.dealed)mem.dealed = true;this.props.transferMsg(arr);}
更改数据transferMsg = (del) => {this.setState({delete: del});}
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import "../../../static/css/common.css";
import "./delete.css";

class Del extends Component {
  move() {
    const { del, delete: deleteX } = this.props;

    if (del) {
      del(deleteX);
    }
  }

  miss() {
    const { transferMsg } = this.props;

    if (transferMsg) {
      transferMsg(undefined);
    }
  }

  render() {
    const { name, cancel, delete: deleteX } = this.props;

    return (
      <div className={deleteX ? "contain minH" : "none"}>
        <div className="subject alert">
          <span>{name}</span>
          <div
            className="DEl_alertMarg"
            onClick={this.miss.bind(this)}
            onKeyDown={this.handleClick}
            role="presentation"
          >
            <button
              type="button"
              className={cancel ? "none" : "delBtn Del_btnMarg"}
            >
              取消
            </button>
            <button
              type="button"
              className="saveBtn Del_btnMarg"
              onClick={this.move.bind(this)}
              onKeyDown={this.handleClick}
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

Del.propTypes = {
  name: PropTypes.string,
  cancel: PropTypes.bool,
  delete: PropTypes.bool,
  del: PropTypes.func,
  transferMsg: PropTypes.func
};

Del.defaultProps = {
  name: "",
  cancel: false,
  delete: false,
  del: () => {},
  transferMsg: () => {}
};

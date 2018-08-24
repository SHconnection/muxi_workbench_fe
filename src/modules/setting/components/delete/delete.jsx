/*
删除框组件
删除框名称name:'',
是否显示取消键cancel:false,
点击删除deleteX:false,
要实现的效果：
  删除数据del: false, data
  删除项目proDel: false, proId
  删除进度staDEl: false, staId
更新父组件数据transferMsg
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import ProjectService from "../../../../service/project";
import StatusService from "../../../../service/status";
import "../../../../static/css/common.css";
import "./delete.css";

class Delete extends Component {
  constructor(props) {
    super(props);

    this.move = this.move.bind(this);
  }

  move() {
    const { del, data, proDel, proId, staDel, staId, transferMsg } = this.props;

    if (del) {
      data.dealed = true;

      transferMsg(data);
    }

    if (proDel) {
      ProjectService.projectDelete(proId);
    }

    if (staDel) {
      StatusService.statusDelete(staId);
    }
  }

  render() {
    const { name, cancel, deleteX, transferMsg } = this.props;

    return (
      <div className={deleteX ? "contain minH" : "none"}>
        <div className="subject alert">
          <span>{name}</span>
          <div
            className="delete-alertMarg"
            onClick={() => {
              transferMsg(false);
            }}
            onKeyDown={this.handleClick}
            role="presentation"
          >
            <button
              type="button"
              className={cancel ? "none" : "delBtn delete-btnMarg"}
            >
              取消
            </button>
            <button
              type="button"
              className="saveBtn delete-btnMarg"
              onClick={this.move}
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

export default Delete;

Delete.propTypes = {
  name: PropTypes.string,
  cancel: PropTypes.bool,
  deleteX: PropTypes.bool,
  del: PropTypes.bool,
  data: PropTypes.shape({
    dealed: PropTypes.bool
  }),
  proDel: PropTypes.bool,
  proId: PropTypes.number,
  staDel: PropTypes.bool,
  staId: PropTypes.number,
  transferMsg: PropTypes.func
};

Delete.defaultProps = {
  name: "",
  cancel: false,
  deleteX: false,
  del: false,
  data: {
    dealed: false
  },
  proDel: false,
  proId: 0,
  staDel: false,
  staId: 0,
  transferMsg: () => {}
};

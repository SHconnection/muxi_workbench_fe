/*
删除框组件
删除框名称name:'',
是否显示取消键cancel:false,
点击删除deleteX:false,
要实现的效果：
  删除数据del: false, 参数data
  删除项目proDel: false, 参数proId
  删除进度staDel: false, 参数staId
  删除组groupDel:false, 参数data.id
  删除成员memDel:false, 参数userId
  删除个人关注attentionDel: false, 
更新父组件数据transferMsg
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import ProjectService from "../../../../service/project";
import ManageService from "../../../../service/manage";
import StatusService from "../../../../service/status";
import "../../../../static/css/common.css";
import "./delete.css";

class Delete extends Component {
  constructor(props) {
    super(props);

    this.move = this.move.bind(this);
  }

  move() {
    const {
      del,
      data,
      proDel,
      proId,
      staDel,
      staId,
      transferMsg,
      groupDel,
      memDel,
      userId
    } = this.props;

    if (del) {
      data.dealed = true;

      transferMsg(data);
    }

    if (groupDel) {
      ManageService.groupDelete(data.id);
    }

    if (proDel) {
      ProjectService.projectDelete(proId);
    }

    if (staDel) {
      StatusService.statusDelete(staId);
    }

    if (memDel) {
      ManageService.memberDelete(userId);
    }

    // if(attentionDel){
    //   MessageService.attentionDel();
    // }
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
  groupDel: PropTypes.bool,
  memDel: PropTypes.bool,
  userId: PropTypes.number,
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
  groupDel: false,
  memDel: false,
  userId: 0,
  transferMsg: () => {}
};

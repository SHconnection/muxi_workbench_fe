/*
删除框组件
删除框名称name:'',
是否隐藏取消键cancel:false,
点击删除deleteX:false,
要实现的效果：
  显示删除成功certain: false,
  删除数据del: false, 参数data
  删除项目proDel: false, 参数proId
  删除进度staDel: false, 参数staId
  删除组groupDel:false, 参数data.id
  删除成员memDel:false, 参数userId
  删除个人关注attentionDel: false, 参数data.filename
  地址跳转pathJump: false, 
更新父组件数据transferMsg
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import ProjectService from "../../../../service/project";
import ManageService from "../../../../service/manage";
import StatusService from "../../../../service/status";
import MessageService from "../../../../service/message";
import WrongPage from "../../../../components/common/wrongPage/wrongPage";
import "../../../../static/css/common.css";
import "./delete.css";

class Delete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wrong: {}
    };
  }

  move = () => {
    const {
      certain,
      del,
      data,
      proDel,
      proId,
      staDel,
      staId,
      transferMsg,
      groupDel,
      memDel,
      userId,
      attentionDel,
      pathJump
    } = this.props;

    if (certain) {
      transferMsg(false, true);
    }

    if (del) {
      data.dealed = true;

      transferMsg(data);
    }

    if (groupDel) {
      ManageService.groupDelete(data.id)
        .then(() => {
          data.dealed = true;
          transferMsg(false);
        })
        .catch(error => {
          transferMsg(false);
          this.setState({ wrong: error });
        });
    }

    if (proDel) {
      ProjectService.projectDelete(proId)
        .then(() => {
          transferMsg(false);
          window.location.assign(`/project`);
        })
        .catch(error => {
          transferMsg(false);
          this.setState({ wrong: error });
        });
    }

    if (staDel) {
      StatusService.statusDelete(staId)
        .then(() => {
          transferMsg(false);
          window.history.back();
        })
        .catch(error => {
          transferMsg(false);
          this.setState({ wrong: error });
        });
    }

    if (memDel) {
      ManageService.memberDelete(userId)
        .then(() => {
          transferMsg(false, true);
        })
        .catch(error => {
          transferMsg(false);
          this.setState({ wrong: error });
        });
    }

    if (attentionDel) {
      MessageService.attentionDel(data.fileName, data.fileKind)
        .then(() => {
          data.dealed = true;
          transferMsg(false);
        })
        .catch(error => {
          transferMsg(false);
          this.setState({ wrong: error });
        });
    }

    if (pathJump) {
      transferMsg();
    }
  };

  cancel = () => {
    this.setState({ wrong: {} });
  };

  render() {
    const { name, cancel, deleteX, transferMsg } = this.props;
    const { wrong } = this.state;

    return (
      <div>
        <div className={deleteX ? "contain minH" : "none"}>
          <div className="subject alert">
            <p className="delete-infoMaxSize">{name}</p>
            <div className="delete-alertMarg">
              <button
                type="button"
                className={cancel ? "none" : "delBtn delete-btnMarg"}
                onClick={() => {
                  transferMsg(false);
                }}
                onKeyDown={this.handleClick}
              >
                取消
              </button>
              <button
                type="button"
                className="saveBtn delete-btnMarg"
                onClick={() => {
                  this.move();
                }}
                onKeyDown={this.handleClick}
              >
                确定
              </button>
            </div>
          </div>
        </div>

        <WrongPage info={wrong} cancel={this.cancel} />
      </div>
    );
  }
}

export default Delete;

Delete.propTypes = {
  name: PropTypes.string,
  cancel: PropTypes.bool,
  certain: PropTypes.bool,
  deleteX: PropTypes.bool,
  del: PropTypes.bool,
  data: PropTypes.shape({
    dealed: PropTypes.bool,
    filename: PropTypes.string,
    id: PropTypes.number
  }),
  proDel: PropTypes.bool,
  proId: PropTypes.number,
  staDel: PropTypes.bool,
  staId: PropTypes.number,
  groupDel: PropTypes.bool,
  memDel: PropTypes.bool,
  userId: PropTypes.number,
  attentionDel: PropTypes.bool,
  pathJump: PropTypes.bool,
  transferMsg: PropTypes.func
};

Delete.defaultProps = {
  name: "",
  cancel: false,
  certain: false,
  deleteX: false,
  del: false,
  data: {},
  proDel: false,
  proId: 0,
  staDel: false,
  staId: 0,
  groupDel: false,
  memDel: false,
  userId: 0,
  attentionDel: false,
  pathJump: false,
  transferMsg: () => {}
};

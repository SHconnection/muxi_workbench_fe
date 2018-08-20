/*
个人关注组件
数据members:[{fileName:'', projectName:'', userName: '', date: '', isFolder: false, dealed: false}],
transferMsg = (mem) => {this.setState({members: mem});}返回数据
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import Func from "../../../components/common/function/function";
import Del from "../../../components/setting/delete/delete";
import Folder from "../../../assets/img/folder.png";
import File from "../../../assets/img/file.png";
import "../../../static/css/common.css";
import "./personal_attention.css";

class PerAtt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteX: undefined
    };

    Func.transferMsgDel = Func.transferMsgDel.bind(this);
  }

  del(mem1) {
    const mem = mem1;

    const { members: arr, transferMsg } = this.props;

    if (!mem.dealed) mem.dealed = true;

    transferMsg(arr);
  }

  render() {
    const { members } = this.props;
    const { deleteX } = this.state;

    return (
      <div className="present">
        {members.map(function Map(mem1) {
          const mem = mem1;

          return (
            <div className={mem.dealed ? "none" : "PerAtt_cell"}>
              <img
                src={mem.isFolder ? Folder : File}
                className="PerAtt_imgSize"
              />

              <div className="PerAtt_vice IB">
                <span className="llSize">{mem.fileName}</span>
                <br />
                <span className="tip">项目 ：{mem.projectName}</span>
              </div>

              <div className="IB">
                <div className="litSel">
                  <span className="PerAtt_FS">{mem.userName}</span>
                  <span className="PerAtt_FS">{mem.date}</span>
                  <span
                    role="button"
                    tabIndex="-1"
                    className="fakeBtn"
                    onClick={() => {
                      Func.transferMsgDel(mem);
                    }}
                    onKeyDown={this.handleClick}
                  >
                    取消关注
                  </span>
                </div>
              </div>
            </div>
          );
        }, this)}

        <Del
          name="确认要取消关注该项目吗?"
          delete={deleteX}
          transferMsg={del => {
            Func.transferMsgDel(del);
          }}
          del={mem1 => {
            this.del(mem1);
          }}
        />
      </div>
    );
  }
}

export default PerAtt;

PerAtt.propTypes = {
  fileName: PropTypes.string,
  projectName: PropTypes.string,
  date: PropTypes.string,
  userName: PropTypes.string,
  dealed: PropTypes.bool,
  isFolder: PropTypes.bool,
  transferMsg: PropTypes.func
};

PerAtt.defaultProps = {
  fileName: "",
  projectName: "",
  userName: "",
  date: "",
  dealed: false,
  isFolder: false,
  transferMsg: () => {}
};

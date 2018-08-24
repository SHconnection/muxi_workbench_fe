/*
个人关注组件
数据members:[{fileName:'', projectName:'', userName: '', date: '', isFolder: false, dealed: false}],
transferMsg = (mem) => {this.setState({members: mem});}返回数据
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import Delete from "../components/delete/delete";
import Folder from "../../../assets/img/folder.png";
import File from "../../../assets/img/file.png";
import Func from "../../../components/common/function/function";
import "../../../static/css/common.css";
import "./personal_attention.css";

class PersonalAttention extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      deleteX: false
    };

    this.transferMsgDel = this.transferMsgDel.bind(this);
    this.del = this.del.bind(this);
  }

  componentDidMount() {
    const { userID } = this.props;
    const arr = Func.getPersonalAttention(userID);

    this.setState({ members: arr });
  }

  del(data) {
    this.setState({
      data,
      deleteX: true
    });
  }

  transferMsgDel(deleteX) {
    this.setState({
      deleteX
    });
  }

  render() {
    const { data, deleteX, members } = this.state;

    return (
      <div className="present">
        {members.map(mem1 => {
          const mem = mem1;

          return (
            <div
              className={mem.dealed ? "none" : "personalAttention-cell"}
              key={mem.id}
            >
              <img
                src={mem.isFolder ? Folder : File}
                className="personalAttention-imgSize"
                alt=""
              />

              <div className="personalAttention-vice IB">
                <span className="llSize">{mem.fileName}</span>
                <br />
                <span className="tip">
项目 ：
                  {mem.projectName}
                </span>
              </div>

              <div className="IB">
                <div className="personalAttention-litSel">
                  <span className="personalAttention-size">{mem.userName}</span>
                  <span className="personalAttention-size">{mem.date}</span>
                  <span
                    role="button"
                    tabIndex="-1"
                    className="fakeBtn"
                    onClick={() => {
                      this.del(mem);
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

        <Delete
          name="确认要取消关注该项目吗?"
          data={data}
          deleteX={deleteX}
          transferMsg={this.transferMsgDel}
          del
        />
      </div>
    );
  }
}

export default PersonalAttention;

PersonalAttention.propTypes = {
  userID: PropTypes.number
};

PersonalAttention.defaultProps = {
  userID: 0
};

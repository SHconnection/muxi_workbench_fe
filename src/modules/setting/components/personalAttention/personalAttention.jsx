/*
个人关注组件
传入userID
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import Delete from "../delete/delete";
import File from "../../../../assets/img/file.png";
import MessageService from "../../../../service/message";
import "../../../../static/css/common.css";
import "./personalAttention.css";

class PersonalAttention extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      deleteX: false,
      members: []
    };

    this.transferMsgDel = this.transferMsgDel.bind(this);
    this.delete = this.delete.bind(this);
  }

  // componentDidMount() {
  //   const arr = MessageService.getPersonalAttention();

  //   arr.map((item1, index)=>{
  //     const item = item1;
  //     item.id = index;
  //     item.dealed = false;

  //     return item;
  //   })

  //   this.setState({ members: arr });
  // }

  delete(data) {
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
    const { data, deleteX } = this.state;
    const { userID } = this.props;
    const per = JSON.parse(localStorage.per);

    const members = [
      {
        id: 1,
        filename: "123",
        projectName: "456",
        username: "1246",
        date: "2018/07/09"
      }
    ];

    return (
      <div className="present">
        {members.map(mem1 => {
          const mem = mem1;

          return (
            <div
              className={mem.dealed ? "none" : "personalAttention-cell"}
              key={mem.id}
            >
              <img src={File} className="personalAttention-imgSize" alt="" />

              <div className="personalAttention-vice IB">
                <span className="llSize">{mem.filename}</span>
                <br />
                <span className="tip">
项目 ：
                  {mem.projectName}
                </span>
              </div>

              <div className="IB">
                <div className="personalAttention-litSel">
                  <span className="personalAttention-size">{mem.username}</span>
                  <span className="personalAttention-size">{mem.date}</span>
                  <span
                    role="button"
                    tabIndex="-1"
                    className="fakeBtn"
                    onClick={() => {
                      this.delete(mem);
                    }}
                    onKeyDown={this.handleClick}
                  >
                    {per.id === userID ? "取消关注" : ""}
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
          attentionDel
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

/*
个人关注组件
*/
import React, { Component } from "react";
import Delete from "../delete/delete";
import File from "../../../../assets/img/file.png";
import MessageService from "../../../../service/message";
import WrongPage from "../../../../components/common/wrongPage/wrongPage";
import "../../../../static/css/common.css";
import "./personalAttention.css";

class PersonalAttention extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      deleteX: false,
      members: [],
      wrong: ""
    };

    this.transferMsgDel = this.transferMsgDel.bind(this);
    this.delete = this.delete.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentDidMount() {
    const per = JSON.parse(localStorage.per);

    MessageService.getPersonalAttention(per.id)
      .then(attention => {
        const arr = attention.list.map((item1, index) => {
          const item = item1;
          item.id = index;
          item.dealed = false;

          return item;
        });

        this.setState({ members: arr });
      })
      .catch(error => {
        this.setState({ wrong: error });
      });
  }

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

  cancel() {
    this.setState({ wrong: "" });
  }

  render() {
    const { data, deleteX, members, wrong } = this.state;
    const per = JSON.parse(localStorage.per);
    const user = JSON.parse(localStorage.user);

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
                <span className="tip">项目 ：{mem.projectName}</span>
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
                    {user.id === per.id ? "取消关注" : ""}
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
          attentionDel
        />

        <WrongPage info={wrong} cancel={this.cancel} />
      </div>
    );
  }
}

export default PersonalAttention;

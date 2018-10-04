/*
查看全部信息
*/
import React, { Component } from "react";
import Gotop from "../../components/common/toTop/top";
import MessageService from "../../service/message";
import "../../static/css/common.css";
import "./index.css";

const kind = ["进度", "文件", "评论", "团队"];

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MessageList: []
    };
    this.readAll = this.readAll.bind(this);
  }

  componentDidMount() {
    MessageService.getMessageList(1).then(res => {
      this.setState({
        MessageList: res.list
      });
      // console.log("res:",res);
    });
  }

  readAll() {
    MessageService.messageAllRead(localStorage.username);
    this.setState({});
  }

  render() {
    const { MessageList } = this.state;
    return (
      <div className="subject">
        <div className="message-container">
          <div className="message-header">
            <span className="message-all">全部通知</span>
            <span
              className="message-readed message-readall"
              onClick={this.readAll}
              onKeyDown={() => {}}
              role="presentation"
            >
              全部标为已读
            </span>
          </div>
          <div className="message-list">
            {MessageList.map(el => (
              <div className="message-item" key={el.sourceID}>
                <div className="message-text">
                  {el.fromName}
                  {el.action}
                  {kind[el.sourceKind]}
                </div>
                <div className="message-date">{el.time}</div>
                <div className="message-readed">{el.readed ? "已读" : ""}</div>
              </div>
            ))}
          </div>
          <div className="message-none">没有更多通知了</div>
        </div>
        <Gotop className="go-top" />
      </div>
    );
  }
}

export default Message;

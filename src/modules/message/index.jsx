/*
查看全部信息
*/
import React, { Component } from "react";
import "../../static/css/common.css";
import "./index.css";

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MessageList: [
        {
          sourceID: 0,
          fromName: "x",
          fromAvatar: "x",
          time: "2018/01/01",
          sourceKind: 0,
          readed: false
        },
        {
          sourceID: 1,
          fromName: "xx",
          fromAvatar: "xx",
          time: "2018/02/02",
          sourceKind: 1,
          readed: true
        },
        {
          sourceID: 2,
          fromName: "xxx",
          fromAvatar: "xxx",
          time: "2018/03/03",
          sourceKind: 1,
          readed: true
        }
      ]
    };
  }

  render() {
    const { MessageList } = this.state;
    return (
      <div className="subject">
        <div className="message-container">
          <div className="message-header">
            <span className="message-all">全部通知</span>
            <span className="message-readed">全部标为已读</span>
          </div>
          <div className="message-list">
            {MessageList.map(el => (
              <div className="message-item">
                <div className="message-text">
                  {el.fromName}
                  评价了你的文档
                </div>
                <div className="message-date">{el.time}</div>
                <div className="message-readed">已读</div>
              </div>
            ))}
          </div>
          <div className="message-none">没有更多通知了</div>
        </div>
      </div>
    );
  }
}

export default Message;

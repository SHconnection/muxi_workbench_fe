/*
查看全部信息
*/
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Gotop from "../../components/common/toTop/top";
import WrongPage from "../../components/common/wrongPage/wrongPage";
import MessageService from "../../service/message";
import "../../static/css/common.css";
import "./index.css";

const kind = ["进度", "文件", "评论", "团队"];

function getPath(sourcekind, projectID, sourceID) {
  switch (sourcekind) {
    case 0:
      return `/status/${sourceID}`;
    case 1:
      return `/project/${projectID}/file/${sourceID}`;
    case 2:
      return `/project/${projectID}/file/${sourceID}`;
    case 3:
      return `/project/${projectID}/doc/${sourceID}`;
    default:
      return `/`;
  }
}

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MessageList: [],
      wrong: {}
    };
    this.readAll = this.readAll.bind(this);
    this.getMessage = this.getMessage.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentDidMount() {
    this.getMessage();
  }

  getMessage() {
    MessageService.getMessageList()
      .then(res => {
        // console.log(res);
        this.setState({
          MessageList: res.list.reverse()
        });
      })
      .catch(error => {
        this.setState({ wrong: error });
      });
  }

  readAll() {
    MessageService.messageAllRead(localStorage.username)
      .then(() => {
        this.getMessage();
      })
      .catch(error => {
        this.setState({ wrong: error });
      });
  }

  cancel() {
    this.setState({ wrong: {} });
  }

  render() {
    const { MessageList, wrong } = this.state;
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
                  <Link
                    className="info-item-to"
                    to={`${getPath(el.sourceKind, el.projectID, el.sourceID)}`}
                  >
                    {kind[el.sourceKind]}
                  </Link>
                </div>
                <div className="message-date">{el.time}</div>
                <div className="message-readed">{el.readed ? "已读" : ""}</div>
              </div>
            ))}
          </div>
          <div className="message-none">没有更多通知了</div>
        </div>
        <Gotop className="go-top" />
        <WrongPage info={wrong} cancel={this.cancel} />
      </div>
    );
  }
}

export default Message;

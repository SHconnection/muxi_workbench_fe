import React, { Component } from "react";
import ReactSVG from "react-svg";
import { Link } from "react-router-dom";
// import { NavLink } from "react-router-dom";
import SettingIcon from "../../../../assets/svg/commonIcon/setting.svg";
import InfoRemindIcon from "../../../../assets/svg/commonIcon/infoRemind.svg";
import InfoIcon from "../../../../assets/svg/commonIcon/info.svg";
import MessageService from "../../../../service/message";
import "./index.css";

const kind = ["进度", "文件", "评论", "团队"];

class Inform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      MessageList: []
    };
    this.readAll = this.readAll.bind(this);
    this.getMessage = this.getMessage.bind(this);
  }

  componentDidMount() {
    this.getMessage();
  }

  getMessage() {
    MessageService.getMessageList(1).then(res => {
      this.setState({
        MessageList: res.list.filter(item => item.readed === false)
      });
      // console.log("res:",res);
    });
  }

  enter() {
    this.setState({
      hover: true
    });
  }

  leave() {
    this.setState({
      hover: false
    });
  }

  readAll() {
    MessageService.messageAllRead(localStorage.usermname).then(() => {
      this.getMessage();
    });
  }

  render() {
    const { hover, MessageList } = this.state;
    const message = MessageList.length;
    // console.log("message:",message);
    // console.log("messagelist", MessageList);
    return (
      <div>
        <div onMouseEnter={this.enter.bind(this)}>
          <ReactSVG
            className="header-info-icon"
            path={message ? InfoRemindIcon : InfoIcon}
            svgStyle={{ width: 22 }}
          />
        </div>
        {hover && (
          <div
            className="header-info-container"
            onMouseLeave={this.leave.bind(this)}
          >
            <div className="header-info-header">
              <strong>通知</strong>
              <div
                className={
                  message ? "header-info-read" : "header-info-read read-grey"
                }
                onClick={this.readAll}
                onKeyDown={() => {}}
                role="presentation"
              >
                全部已读
              </div>
            </div>
            <div className="header-info-content">
              {MessageList.map((el, index) => {
                if (index <= 5) {
                  // console.log(index);
                  return (
                    !el.readed && (
                      <div className="info-item" key={el.sourceID}>
                        <div className="info-text">
                          {el.fromName}
                          {el.action}
                          <Link
                            className="info-item-to"
                            to={`/status/${el.sourceID}`}
                          >
                            {kind[el.sourceKind]}
                          </Link>
                        </div>
                        <div className="info-date">{el.time.split(" ")[0]}</div>
                        {/* <ReactSVG
                            className="info-hook"
                            path={Check}
                            svgStyle={{ width: 14 }}
                            // onClick={this.read(el.sourceID)}
                          /> */}
                      </div>
                    )
                  );
                }
                return false;
              })}
              {!message && <div className="info-none">无新的通知</div>}
            </div>
            <div className="header-info-footer">
              <ReactSVG
                className="info-setting-icon"
                path={SettingIcon}
                svgStyle={{ width: 14 }}
              />
              <Link
                className="header-info-setting footer-text"
                to="/member/teamMember/personalInfo/personalSet"
              >
                通知设置
              </Link>
              <Link className="header-info-all footer-text" to="/message">
                查看所有通知
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Inform;

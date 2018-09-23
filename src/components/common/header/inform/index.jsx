import React, { Component } from "react";
import ReactSVG from "react-svg";
import { Link } from "react-router-dom";
// import { NavLink } from "react-router-dom";
import SettingIcon from "../../../../assets/svg/commonIcon/setting.svg";
import InfoRemindIcon from "../../../../assets/svg/commonIcon/infoRemind.svg";
import InfoIcon from "../../../../assets/svg/commonIcon/info.svg";
import Check from "../../../../assets/svg/commonIcon/check.svg";
import MessageService from "../../../../service/message";
import "./index.css";

class Inform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
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

  // componentDidMount() {
  //   const arr = MessageService.getMessageList(1);
  //     this.setState({
  //       MessageList: arr.list
  //     });
  // }

  
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

  // read(id) {}

  render() {
    
    const { hover, MessageList } = this.state;
    const message = MessageList.length;
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
                // onClick={this.read.bind(this)}
              >
                全部已读
              </div>
            </div>
            <div className="header-info-content">
              {MessageList.map(
                el =>
                  el.readed && (
                    <div className="info-item" key={el.sourceID}>
                      <div className="info-text">
                        {el.fromName}
                        评论了你的
                        {/* {el.action} */}
                        <Link className="info-item-to" to="/">
                          文档
                        </Link>
                      </div>
                      <div className="info-date">{el.time}</div>
                      {/* <ReactSVG
                        className="info-hook"
                        path={Check}
                        svgStyle={{ width: 14 }}
                        // onClick={this.read(el.sourceID)}
                      /> */}
                    </div>
                  )
              )}
              {!message && <div className="info-none">无新的通知</div>}
            </div>
            <div className="header-info-footer">
              <ReactSVG
                className="info-setting-icon"
                path={SettingIcon}
                svgStyle={{ width: 14 }}
              />
              <Link className="header-info-setting footer-text" to="/member/teamMember/personalInfo/personalSet/${per.id}">
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

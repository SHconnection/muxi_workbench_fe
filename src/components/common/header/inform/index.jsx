import React, { Component } from "react";
import ReactSVG from "react-svg";
import { Link } from "react-router-dom";
// import { NavLink } from "react-router-dom";
import infoRemindIcon from "../../../../assets/img/info-remind@2x.png";
import SettingIcon from "../../../../assets/svg/commonIcon/setting.svg";
import Hook from "../../../../assets/svg/commonIcon/hook.svg";

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
        <img
          className="header-info-icon"
          src={infoRemindIcon}
          alt="info-remind"
          onMouseEnter={this.enter.bind(this)}
        />
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
                    <div className="info-item" key={el.id}>
                      <div className="info-text">
                        {el.fromName}
                        评论了你的
                        <Link className="info-item-to" to="/">
                          文档
                        </Link>
                      </div>
                      <div className="info-date">{el.time}</div>
                      <ReactSVG
                        className="info-hook"
                        path={Hook}
                        svgStyle={{ width: 14 }}
                        // onClick={this.read(el.sourceID)}
                      />
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
              <Link className="header-info-setting footer-text" to="/">
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

import React, { Component } from "react";
import ReactSVG from "react-svg";
import { Link } from "react-router-dom";
// import { NavLink } from "react-router-dom";
import SettingIcon from "../../../../assets/svg/commonIcon/setting.svg";
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
          time: "2018/1/1",
          sourceKind: 0,
          readed: false
        },
        {
          sourceID: 1,
          fromName: "xx",
          fromAvatar: "xx",
          time: "2018/2/2",
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

  allread() {
    this.setState({});
  }

  render() {
    const { icon } = this.props;
    const { hover, MessageList } = this.state;
    return (
      <div>
        <img
          className="header-info-icon"
          src={icon}
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
                className="header-info-read"
                onClick={this.allread.bind(this)}
              >
                全部已读
              </div>
            </div>
            <div className="header-info-content">
              {MessageList.map(el => (
                <div className="info-item" key={el.id}>
                  <div className="info-text">
                    {el.fromName}
                    评论了你的
                    <Link className="info-item-to" to="/">
                      文档
                    </Link>
                  </div>
                  <div className="info-date">{el.time}</div>
                </div>
              ))}
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
              <Link className="header-info-all footer-text" to="/">
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

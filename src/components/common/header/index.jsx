import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/img/logo@2x.png";
import searchIcon from "../../../assets/img/search@2x.png";
import infoRemindIcon from "../../../assets/img/info-remind@2x.png";
import AvatarImg from "../../../assets/img/avatar.png";
import Avatar from "../avatar/index";
import "./index.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInput: false
    };
  }

  clickSearchIcon() {
    const that = this;
    this.setState({
      showInput: !that.state.showInput
    });
  }

  render() {
    console.log(this.con);
    const { showInput } = this.state;
    return (
      <div className="header-container">
        <div className="header-content">
          <div className="header-left">
            <img className="header-logo-img" src={logo} alt="logo" />
            <div className="header-logo-text">木犀工作台</div>
            <div className="header-tab-container">
              <NavLink
                to="/project"
                className="header-tab-item"
                activeClassName="header-tab-item header-tab-item-active"
              >
                项目
              </NavLink>
              <NavLink
                to="/status"
                className="header-tab-item"
                activeClassName="header-tab-item header-tab-item-active"
              >
                进度
              </NavLink>
              <NavLink
                to="/feed"
                className="header-tab-item"
                activeClassName="header-tab-item header-tab-item-active"
              >
                动态
              </NavLink>
              <NavLink
                to="/teamMember"
                className="header-tab-item"
                activeClassName="header-tab-item header-tab-item-active"
              >
                成员
              </NavLink>
            </div>
          </div>
          <div className="header-right">
            <div>
              <NavLink to="/edit" className="header-write-progress">
                写进度
              </NavLink>
            </div>
            <div className="header-avatar">
              <Avatar src={AvatarImg} />
            </div>
            <div>
              <img
                className="header-info-icon"
                src={infoRemindIcon}
                alt="info-remind"
              />
            </div>
            {showInput && <input className="header-search-input" type="text" />}
            <div
              onClick={this.clickSearchIcon.bind(this)}
              onKeyDown={() => {}}
              role="presentation"
            >
              <img
                className="header-search-icon"
                src={searchIcon}
                alt="search"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;

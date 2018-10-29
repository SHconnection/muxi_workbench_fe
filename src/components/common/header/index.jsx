import React, { Component } from "react";
import { NavLink, Redirect, Link } from "react-router-dom";
import logo from "../../../assets/img/logo@2x.png";
import searchIcon from "../../../assets/img/search@2x.png";
import Avatar from "../avatar/index";
import Inform from "./inform/index";
import "./index.css";

const AvatarImg = localStorage.userAvatar;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInput: false,
      redirect: false
    };
    this.searchRef = React.createRef();
    this.enterSearch = this.enterSearch.bind(this);
    this.searchText = "";
  }

  clickSearchIcon() {
    const that = this;
    this.setState({
      showInput: !that.state.showInput
    });
  }

  searchItem() {
    const { value } = this.searchRef.current;
    // console.log(value);
    if (value !== "") {
      this.searchText = value;
      this.setState({
        redirect: true
      });
    }
  }

  enterSearch(e) {
    if (e.keyCode === 13) {
      this.searchItem();
    }
  }

  render() {
    const { showInput, redirect } = this.state;
    const url = `/search/${encodeURIComponent(
      encodeURIComponent(encodeURIComponent(this.searchText))
    )}`;
    if (redirect) {
      return (
        <div>
          <Header />
          <Redirect push to={url} />
        </div>
      );
    }

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
                to="/member"
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
            <Link
              className="header-avatar"
              to="/member/teamMember/personalInfo/personalSet"
            >
              <Avatar src={AvatarImg} />
            </Link>
            <div>
              <Inform />
            </div>
            {showInput && (
              <input
                className="header-search-input"
                ref={this.searchRef}
                onKeyUp={this.enterSearch}
                type="text"
                // autoFocus
              />
            )}
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

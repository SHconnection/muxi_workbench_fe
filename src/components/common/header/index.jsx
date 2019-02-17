import React, { Component } from "react";
import ReactSVG from "react-svg";
import { NavLink, Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import logo from "../../../assets/img/logo@2x.png";
import searchIcon from "../../../assets/svg/commonIcon/search.svg";
import Avatar from "../avatar/index";
import Inform from "./inform/index";
import Store from "../../../store";
import ManageService from "../../../service/manage";
import LandingService from "../../../service/landing";
import Cookie from "../../../service/cookie";
import WrongPage from "../wrongPage/wrongPage";
import "./index.css";

const User = decodeURIComponent(LandingService.getUsername());
const data = {
  name: User,
  email: "",
  avatar: "",
  tel: "",
  teamID: 1
};
const data1 = {
  name: User
};

Store.dispatch({
  type: "substituteUserName",
  payload: User || ""
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInput: false,
      wrong: {}
    };
    this.searchRef = React.createRef();
  }

  componentDidMount() {
    this.loginBeforeGetInform();
  }

  clickSearchIcon = () => {
    const that = this;
    this.setState({
      showInput: !that.state.showInput
    });
  };

  searchItem = () => {
    const { value } = this.searchRef.current;
    // console.log(value);
    if (value !== "") {
      this.searchText = value;
      const url = `/search/${encodeURIComponent(
        encodeURIComponent(encodeURIComponent(this.searchText))
      )}`;
      const { history } = this.props;
      history.push(`${url}`);
    }
  };

  enterSearch = e => {
    if (e.keyCode === 13) {
      this.searchItem();
      const that = this;
      this.setState({
        showInput: !that.state.showInput
      });
    }
  };

  loginBeforeGetInform = () => {
    LandingService.getToken(data1)
      .then(response => {
        Store.dispatch({
          type: "substituteId",
          payload: response.uid || 0
        });
        Store.dispatch({
          type: "substituteToken",
          payload: response.token || ""
        });
        Cookie.setCookie("workbench_token", response.token);
        Store.dispatch({
          type: "substituteRole",
          payload: response.urole || 1
        });
        ManageService.getPersonalSet(response.uid)
          .then(res => {
            Store.dispatch({
              type: "substituteAvatar",
              payload: res.avatar || ""
            });
            Store.dispatch({
              type: "substituteEmail",
              payload: res.email || ""
            });
            Store.dispatch({
              type: "substituteLoginSuccess",
              payload: 1
            });
          })
          .catch(error => {
            this.setState({
              wrong: error
            });
          });
      })
      .catch(() => {
        LandingService.SignUp(data)
          .then(() => {
            Store.dispatch({
              type: "substituteLoginSuccess",
              payload: 2
            });
          })
          .catch(error => {
            this.setState({
              wrong: error
            });
          });
      });
  };

  cancel = () => {
    this.setState({ wrong: {} });
  };

  render() {
    const { showInput, wrong } = this.state;
    const { storeAvatar, storeId } = this.props;

    return (
      <div>
        <div className="header-container">
          <div className="header-content">
            <div className="header-left">
              <img className="header-logo-img" src={logo} alt="logo" />
              <div className="header-logo-text">木犀工作台</div>
              <div className="header-tab-container">
                <NavLink
                  to="/project"
                  className="header-tab-item"
                  activeClassName="header-tab-item-active"
                >
                  项目
                </NavLink>
                <NavLink
                  to="/status"
                  className="header-tab-item"
                  activeClassName="header-tab-item-active"
                >
                  进度
                </NavLink>
                <NavLink
                  to="/feed"
                  className="header-tab-item"
                  activeClassName="header-tab-item-active"
                >
                  动态
                </NavLink>
                <NavLink
                  to="/teamMember"
                  className="header-tab-item"
                  activeClassName="header-tab-item-active"
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
                to="/teamMember/personalInfo/personalSet"
                onClick={() => {
                  Store.dispatch({
                    type: "substitutePer",
                    payload: storeId
                  });
                }}
              >
                <Avatar src={storeAvatar} />
              </Link>

              <Inform />

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
                <ReactSVG
                  className="header-search-icon"
                  path={searchIcon}
                  svgStyle={{ width: 22 }}
                />
              </div>
            </div>
          </div>
        </div>
        <WrongPage info={wrong} cancel={this.cancel} />
      </div>
    );
  }
}
Header.propTypes = {
  history: PropTypes.shape({}),
  storeAvatar: PropTypes.string,
  storeId: PropTypes.number
};
Header.defaultProps = {
  history: {},
  storeAvatar: "",
  storeId: 0
};

const mapStateToProps = state => ({
  storeAvatar: state.avatar,
  storeId: state.id
});

export default connect(mapStateToProps)(withRouter(Header));

/*
个人信息页面组件
*/
import React, { Component } from "react";
import { Route, NavLink, Link, Redirect, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import PersonalAttention from "../components/personalAttention/personalAttention";
import Dynamic from "../../feed/dynamic";
import Progress from "../../status/progress/progress";
import ManageService from "../../../service/manage";
import WrongPage from "../../../components/common/wrongPage/wrongPage";
import "../../../static/css/common.css";
import "./personalInfo.css";

class PersonalInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      per: {},
      wrong: {}
    };
    this.cancel = this.cancel.bind(this);
  }

  componentDidMount() {
    const id = parseInt(localStorage.per, 10);

    ManageService.getPersonalSet(id)
      .then(info => {
        const { per } = this.state;

        per.id = id;
        per.name = info.name;
        per.email = info.email;
        per.avatar = info.avatar;

        this.setState(per);
      })
      .catch(error => {
        this.setState({ wrong: error });
      });
  }

  cancel() {
    this.setState({ wrong: {} });
  }

  render() {
    const { per, wrong } = this.state;
    const { match } = this.props;

    return (
      <div className="subject minH">
        <div className="personal">
          <div className="personalInfo-personalInformation">
            <img
              src={per.avatar}
              className="personalInfo-avatar"
              alt="加载中..."
            />
            <div className="personalIntro">
              <b className="personalName">{per.name}</b>
              <Link to={`${match.url}/personalSet`} className="fakeBtn">
                {per.id === parseInt(localStorage.id, 10) ? "更改设置" : ""}
              </Link>
              <div className="llSize">{per.email}</div>
            </div>
          </div>
          <Link
            to={`${match.url}/setPersonalInfo/${per.name}`}
            className="personalInfo-btnMarg"
          >
            <button
              type="button"
              className={
                localStorage.role > localStorage.perRole
                  ? "saveBtn personalInfo-saveBtn"
                  : "none"
              }
            >
              管理成员
            </button>
          </Link>
        </div>
        <div className="personalInfo-select">
          <div className="selectItem">
            <NavLink
              activeClassName="personalInfo-active"
              className="llSize singleItem"
              to={`${match.url}/personalDynamic/${per.id}`}
            >
              动态
            </NavLink>
            <NavLink
              activeClassName="personalInfo-active"
              className="llSize singleItem"
              to={`${match.url}/personalProgress/${per.id}`}
            >
              进度
            </NavLink>
            <NavLink
              activeClassName="personalInfo-active"
              className="llSize singleItem"
              to={`${match.url}/personalAttention`}
            >
              关注
            </NavLink>
          </div>
        </div>
        <Switch>
          <Redirect
            exact
            path={`${match.url}`}
            to={`${match.url}/personalAttention`}
          />
          <Route
            path={`${match.url}/personalDynamic/:uid`}
            component={Dynamic}
          />
          <Route
            path={`${match.url}/personalAttention`}
            component={PersonalAttention}
          />
          <Route
            path={`${match.url}/personalProgress/:uid`}
            component={Progress}
          />
        </Switch>

        <WrongPage info={wrong} cancel={this.cancel} />
      </div>
    );
  }
}

export default PersonalInfo;

PersonalInfo.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  })
};

PersonalInfo.defaultProps = {
  match: {}
};

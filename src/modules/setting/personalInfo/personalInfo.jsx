/*
个人信息页面组件
*/
import React, { Component } from "react";
import { Route, NavLink, Link, Redirect, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Avatar from "../../../components/common/avatar/index";
import PersonalAttention from "../components/personalAttention/personalAttention";
import Dynamic from "../../feed/dynamic";
import Progress from "../../status/index";
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
  }

  componentDidMount() {
    const { storePer } = this.props;

    const url = window.location.href;
    const re = /\/(\d+)$/;
    let id;
    if (re.exec(url) && re.exec(url)[1]) {
      id = re.exec(url)[1];
    } else {
      id = parseInt(storePer, 10);
    }

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
      })
      .finally(() => {});
  }

  cancel = () => {
    this.setState({ wrong: {} });
  };

  render() {
    const { per, wrong } = this.state;
    const { match, location, storeId, storePerRole, storeRole } = this.props;

    let uid;
    if (location.state && location.state.uid) {
      const {
        state: { uid: id }
      } = location;
      uid = id;
    } else {
      uid = per.id;
    }

    return (
      <div className="subject minH">
        <div className="personal">
          <div className="personalInfo-personalInformation">
            <Avatar src={per.avatar} width={114} height={114} />
            <div className="personalInfo-personalIntro">
              <b className="personalName">{per.name}</b>
              <Link to={`${match.url}/personalSet`} className="fakeBtn">
                {parseInt(per.id, 10) === parseInt(storeId, 10)
                  ? "更改设置"
                  : ""}
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
                parseInt(storeRole, 10) === 7 &&
                parseInt(storeRole, 10) !== parseInt(storePerRole, 10)
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
              to={`${match.url}/personalAttention/${per.id}`}
            >
              关注
            </NavLink>
          </div>
        </div>
        <Switch>
          <Redirect
            exact
            path="/teamMember/personalInfo"
            to={`${match.url}/personalAttention/${uid}`}
          />
          <Route
            path={`${match.url}/personalDynamic/:uid`}
            component={Dynamic}
          />
          <Route
            path={`${match.url}/personalAttention/:uid`}
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

PersonalInfo.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  }),
  location: PropTypes.shape({
    state: PropTypes.shape({
      uid: PropTypes.number
    })
  }),
  storeId: PropTypes.number,
  storePer: PropTypes.number,
  storeRole: PropTypes.number,
  storePerRole: PropTypes.number
};

PersonalInfo.defaultProps = {
  match: {},
  location: {},
  storeId: 0,
  storeRole: 1,
  storePer: 0,
  storePerRole: 1
};

const mapStateToProps = state => ({
  storeId: state.id,
  storePer: state.per,
  storePerRole: state.perRole,
  storeRole: state.role
});

export default connect(mapStateToProps)(PersonalInfo);

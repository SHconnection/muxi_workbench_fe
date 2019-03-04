/*
个人信息页面组件
*/
import React, { Component } from "react";
import { Route, NavLink, Link, Redirect, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Avatar from "components/common/avatar/index";
import ManageService from "service/manage";
import Loading from "components/common/loading/index";
import { Store } from "store";
import PersonalAttention from "../components/personalAttention/personalAttention";
import Dynamic from "../../feed/dynamic";
import Progress from "../../status/index";
import "static/css/common.css";
import "./personalInfo.scss";

class PersonalInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      per: {},
      loading: true
    };
  }

  componentDidMount() {
    console.log("mount");
    const { storePer } = this.props;

    ManageService.getPersonalSet(storePer)
      .then(info => {
        this.setState(() => ({
          per: {
            name: info.name,
            email: info.email,
            avatar: info.avatar
          },
          loading: false
        }));
      })
      .catch(error => {
        Store.dispatch({
          type: "substituteWrongInfo",
          payload: error
        });
      });
  }

  render() {
    const { per, loading } = this.state;
    const { match, storeId, storePerRole, storeRole, storePer } = this.props;

    return (
      <div>
        {loading ? (
          <Loading loading />
        ) : (
          <div>
            <div className="personal">
              <div className="personalInfo-personalInformation">
                <Avatar src={per.avatar} width={114} height={114} />
                <div className="personalInfo-personalIntro">
                  <b className="personalName">{per.name}</b>
                  <Link to={`${match.url}/personalSet`} className="fakeBtn">
                    {parseInt(storePer, 10) === parseInt(storeId, 10)
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
                  to={`${match.url}/personalDynamic/${storePer}`}
                >
                  动态
                </NavLink>
                <NavLink
                  activeClassName="personalInfo-active"
                  className="llSize singleItem"
                  to={`${match.url}/personalProgress/${storePer}`}
                >
                  进度
                </NavLink>
                <NavLink
                  activeClassName="personalInfo-active"
                  className="llSize singleItem"
                  to={`${match.url}/personalAttention/${storePer}`}
                >
                  关注
                </NavLink>
              </div>
            </div>
            <Switch>
              <Redirect
                exact
                path="/teamMember/personalInfo"
                to={`${match.url}/personalAttention/${storePer}`}
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
          </div>
        )}
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

/*
个人信息页面组件
传入per
*/
import React from "react";
import { Route, NavLink, Link, Redirect, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import PersonalAttention from "../components/personalAttention/personalAttention";
import "../../../static/css/common.css";
import "./personalInfo.css";

const PersonalInfo = ({ match }) => {
  const per = JSON.parse(localStorage.per);
  // const setPersonalInfoPath = {
  //   pathname: `${match.url}/setPersonalInfo`,
  //   state: { per }
  // };

  return (
    <div className="subject minH">
      <div className="personal">
        <img src={per.avatar} className="personalInfo-avatar" alt="" />
        <div className="personalIntro">
          <b className="personalName">{per.name}</b>
          <Link to={`${match.url}/personalSet/${per.id}`} className="fakeBtn">
            {/* {per.id === localStorage.user.id ? "更改设置" : ""} */}
          </Link>
          <span className="llSize">{per.email}</span>
        </div>
        {/* <Link to={setPersonalInfoPath}><button className="saveBtn personalInfo-btnMarg">{localStorage.user.role > 1 ? "管理成员" : ""}</button></Link> */}
      </div>
      <div className="personalInfo-select">
        <div className="selectItem">
          <NavLink
            activeClassName="personalInfo-active"
            className="llSize singleItem"
            to={`${match.url}/personalDynamic`}
          >
            动态
          </NavLink>
          <NavLink
            activeClassName="personalInfo-active"
            className="llSize singleItem"
            to={`${match.url}/personalProgress`}
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
          to={`${match.url}/personalDynamic`}
        />
        {/* <Route
          path={`${match.url}/personalDynamic`}
          component={PersonalDynamic}
        /> */}

        <Route
          path={`${match.url}/personalAttention`}
          component={PersonalAttention}
        />
        {/* <Route
          path={`${match.url}/personalProgress`}
          component={PersonalProgress}
        /> */}
      </Switch>
    </div>
  );
};

export default PersonalInfo;

PersonalInfo.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  })
};

PersonalInfo.defaultProps = {
  match: {}
};

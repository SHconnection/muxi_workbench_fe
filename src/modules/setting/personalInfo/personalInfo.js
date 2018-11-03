/*
个人信息页面组件
*/
import React from "react";
import { Route, NavLink, Link, Redirect, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import PersonalAttention from "../components/personalAttention/personalAttention";
import Dynamic from "../../feed/dynamic";
import Progress from "../../status/progress/progress";
import Cookie from "../../../service/cookie";
import "../../../static/css/common.css";
import "./personalInfo.css";

const PersonalInfo = ({ match }) => {
  const per = JSON.parse(Cookie.getCookie("per"));

  return (
    <div className="subject minH">
      <div className="personal">
        <div className="personalInfo-personalInformation">
          <img src={per.avatar} className="personalInfo-avatar" alt="" />
          <div className="personalIntro">
            <b className="personalName">{per.name}</b>
            <Link to={`${match.url}/personalSet`} className="fakeBtn">
              {per.id === JSON.parse(Cookie.getCookie("user")).id
                ? "更改设置"
                : ""}
            </Link>
            <div className="llSize">{per.email}</div>
          </div>
        </div>
        <Link
          to={`${match.url}/setPersonalInfo`}
          className="personalInfo-btnMarg"
        >
          <button type="button" className="saveBtn personalInfo-saveBtn">
            {JSON.parse(Cookie.getCookie("user")).role > 1 ? "管理成员" : ""}
          </button>
        </Link>
      </div>
      <div className="personalInfo-select">
        <div className="selectItem">
          <NavLink
            activeClassName="personalInfo-active"
            className="llSize singleItem"
            to={`${match.url}/personalDynamic/${String(per.id)}`}
          >
            动态
          </NavLink>
          <NavLink
            activeClassName="personalInfo-active"
            className="llSize singleItem"
            to={`${match.url}/personalProgress/${String(per.id)}`}
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
        <Route path={`${match.url}/personalDynamic/:uid`} component={Dynamic} />
        <Route
          path={`${match.url}/personalAttention`}
          component={PersonalAttention}
        />
        <Route
          path={`${match.url}/personalProgress/:uid`}
          component={Progress}
        />
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

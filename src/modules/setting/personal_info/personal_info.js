/*
个人信息页面组件
传入per
*/
import React from "react";
import { BrowserRouter, Route, NavLink, Link, Redirect, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import PersonalAttention from "../components/personal_attention/personal_attention";
import "../../../static/css/common.css";
import "./personal_info.css";

const PersonalInfo = ({ match }) => {
  const per = JSON.parse(localStorage.per);

  return (
    <div className="subject minH">
      <div className="personal">
        <img src={per.avatar} className="personalInfo-avatar" alt="" />
        <div className="personalIntro">
          <b className="personalName">{per.name}</b>
          <Link
            to={`${match.url}/personalSet/${per.id}`}
            className="fakeBtn"
          >
            {/* {per.id === localStorage.user.id ? "更改设置" : ""} */}
          </Link>
          <span className="llSize">{per.email}</span>
        </div>
        {/* <Link to={`${match.url}/setPersonalInfo/${JSON.stringify(per)}`}><button className="saveBtn personalInfo-btnMarg">{localStorage.user.role > 1 ? "管理成员" : ""}</button></Link> */}
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
        <Redirect exact path={`${match.url}`} to={`${match.url}/personalAttention`} />
        <Route
          path={`${match.url}/personalDynamic`}
          component={PersonalAttention}
        />
        <Route
          path={`${match.url}/personalProgress`}
          component={PersonalAttention}
        />
        <Route
          path={`${match.url}/personalAttention`}
          component={PersonalAttention}
          />
      </Switch>
    </div>
  );
};

export default PersonalInfo;

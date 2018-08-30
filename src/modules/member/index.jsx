/*
团队成员入口文件
*/
import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import TeamMember from "./teamMember/teamMember";
import AddMember from "../setting/addMember/addMember";
import AddGroup from "../setting/addGroup/addGroup";
import GroupManage from "../setting/groupManage/groupManage";
import GroupMember from "../setting/groupMember/groupMember";
import PersonalInfo from "../setting/personalInfo/personalInfo";
import PersonalSet from "../setting/personalSetting/personalSetting";
import SetPersonalInfo from "../setting/setPersonInfo/setPersonInfo";
import "../../static/css/common.css";
import "./index.css";

const Member = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}`} to={`${match.url}/teamMember`} />
    <Route exact path={`${match.url}/teamMember`} component={TeamMember} />
    <Route path={`${match.url}/teamMember/addMember`} component={AddMember} />
    <Route
      exact
      path={`${match.url}/teamMember/groupManage`}
      component={GroupManage}
    />
    <Route
      path={`${match.url}/teamMember/groupManage/addGroup`}
      component={AddGroup}
    />
    <Route
      path={`${match.url}/teamMember/groupManage/groupMember/:group`}
      component={GroupMember}
    />
    <Route
      path={`${match.url}/teamMember/personalInfo/personalSet/:id`}
      component={PersonalSet}
    />
    <Route
      path={`${match.url}/teamMember/personalInfo/setPersonalInfo`}
      component={SetPersonalInfo}
    />
    <Route
      path={`${match.url}/teamMember/personalInfo`}
      component={PersonalInfo}
    />
  </Switch>
);

export default Member;

Member.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  })
};

Member.defaultProps = {
  match: {}
};

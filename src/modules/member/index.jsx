/*
团队成员入口文件
*/
import React from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import TeamMember from "./teamMember/teamMember";
import AddMember from "../setting/addMember/addMember";
import AddGroup from "../setting/addGroup/addGroup";
import GroupManage from "../setting/groupManage/groupManage";
import GroupMember from "../setting/groupMember/groupMember";
import PersonalInfo from "../setting/personalInfo/personalInfo";
import PersonalSet from "../setting/personalSetting/personalSetting";
import SetPersonalInfo from "../setting/setPersonInfo/setPersonInfo";
import SetManager from "../setting/setManager/setManager";
import JoinApply from "../setting/joinApply/joinApply";
import SetPermission from "../setting/setPermission/setPermission";

const Member = ({ match }) => (
  <Switch>
    <Route exact path={`${match.url}`} component={TeamMember} />
    <Route path={`${match.url}/addMember`} component={AddMember} />
    <Route exact path={`${match.url}/joinApply`} component={JoinApply} />
    <Route
      path={`${match.url}/joinApply/setPermission`}
      component={SetPermission}
    />
    <Route exact path={`${match.url}/groupManage`} component={GroupManage} />
    <Route path={`${match.url}/groupManage/addGroup`} component={AddGroup} />
    <Route
      path={`${match.url}/groupManage/groupMember`}
      component={GroupMember}
    />
    <Route
      path={`${match.url}/personalInfo/personalSet`}
      component={PersonalSet}
    />
    <Route
      path={`${match.url}/personalInfo/setPersonalInfo/:name`}
      component={SetPersonalInfo}
    />
    <Route path={`${match.url}/SetManager`} component={SetManager} />
    <Route path={`${match.url}/personalInfo`} component={PersonalInfo} />
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

/*
团队成员入口文件
*/
import React from "react";
import {Route,Redirect,Switch} from "react-router-dom";
import ManageService from "../../service/manage";
import TeamMember from "./team_member/team_member";
import AddMember from "../setting/add_member/add_member";
import AddGroup from "../setting/add_group/add_group";
import GroupManage from "../setting/group_manage/group_manage";
import GroupMember from "../setting/group_member/group_member";
import PersonalInfo from "../setting/personal_info/personal_info";
import PersonalSet from "../setting/personal_setting/personal_setting";
import SetPersonalInfo from "../setting/set_personInfo/set_personInfo";
import "../../static/css/common.css";
import "./index.css";

const Member = ({match}) => (
	<Switch>
		<Redirect exact from={`${match.url}`} to={`${match.url}/teamMember`} />
		<Route exact path={`${match.url}/teamMember`} component={TeamMember} />
		<Route path={`${match.url}/teamMember/addMember`} component={AddMember} />
		<Route exact path={`${match.url}/teamMember/groupManage`} component={GroupManage} />
		<Route path={`${match.url}/teamMember/groupManage/addGroup`} component={AddGroup} />
		<Route
          path={`${match.url}/teamMember/groupManage/groupMember/:group`}
          component={GroupMember}
        />
		<Route
          path={`${match.url}/teamMember/personalInfo/personalSet/:id`}
          component={PersonalSet}
        />
		<Route
          path={`${match.url}/teamMember/personalInfo/setPersonalInfo/:per`}
          component={SetPersonalInfo}
        />
		<Route
          path={`${match.url}/teamMember/personalInfo`}
          component={PersonalInfo}
        />
	</Switch>
)

export default Member;
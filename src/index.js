import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import NoMatch from "./components/common/noMatch/index";
import Project from "./modules/project/index";
import Dynamic from "./modules/feed/dynamic";
import Progress from "./modules/status/progress";
import TeamMember from "./modules/member/team_member";
import AddMember from "./modules/setting/add_member/add_member";
import AddGroup from "./modules/setting/add_group/add_group";
import GroupManage from "./modules/setting/group_manage/group_manage";
import GroupMember from "./modules/setting/group_member/group_member";
import PersonalInfo from "./modules/setting/personal_info/personal_info";
import PersonalSet from "./modules/setting/personal_setting/personal_setting";
import SetPersonalInfo from "./modules/setting/set_personInfo/set_personInfo";
import Header from "./components/common/header/index";
import edit from "./modules/status/markdown/edit";
import "./index.css";

ReactDOM.render(
  <Router>
    <div className="app-container">
      <Header className="header" />
      <Switch>
        <Redirect exact from="/" to="/project" />
        <Route path="/project" component={Project} />
        <Route path="/feed" component={Dynamic} />
        <Route path="/status" component={Progress} />
        <Route path="/member" component={member} />
        <Route path="/edit" component={edit} />
        <Route exact path="/teamMember" component={TeamMember} />
        <Route path="/teamMember/addMember" component={AddMember} />
        <Route exact path="/teamMember/groupManage" component={GroupManage} />
        <Route path="/teamMember/groupManage/addGroup" component={AddGroup} />
        <Route path="/teamMember/groupManage/groupMember/:group" component={GroupMember} />
        <Route exact path="/teamMember/personalInfo/" component={PersonalInfo} />
        <Route path="/teamMember/personalInfo/personalSet/:id" component={PersonalSet} />
        <Route path="/teamMember/personalInfo/setPersonalInfo/:per" component={SetPersonalInfo} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();

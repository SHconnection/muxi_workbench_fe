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
import Progress from "./modules/status/index";
import Member from "./modules/member/index";
import Message from "./modules/message/index";
import Search from "./modules/search/index";
import Header from "./components/common/header/index";
import edit from "./modules/status/markdown/edit";
import LoginService from "./service/landing";
import ManageService from "./service/manage";
// import load from "./router/index"

const data = {
  username: "呼啦呼啦",
  email: "huhuhu@163.com",
  avatar: "",
  tel: "",
  teamID: 0
};
const data1 = {
  username: "darren"
};
localStorage.username = data1.username;

LoginService.getToken(data1).then(response => {
  if (response === 401) {
    LoginService.SignUp(data);
  } else {
    const user = {};
    user.token = response.token;
    user.role = 7;
    user.id = response.uid;
    localStorage.token = response.token;
    localStorage.user = JSON.stringify(user);
    localStorage.per = JSON.stringify(user);
    ManageService.getPersonalSet(user.id)
      .then(res => {
        localStorage.userAvatar = res.avatar;
      })
      .catch(error => {
        console.error(error);
      });
  }
});

ReactDOM.render(
  <Router>
    <div className="app-container">
      <Header className="header" />
      <Switch>
        <Redirect exact from="/" to="/project" />
        <Route path="/project" component={Project} />
        <Route path="/feed" component={Dynamic} />
        <Route path="/status" component={Progress} />
        <Route path="/edit" component={edit} />
        <Route path="/member" component={Member} />
        <Route path="/message" component={Message} />
        <Route path="/search" component={Search} />
        {/* <Route path="/landing" component={load} /> */}
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();

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
import Progress from "./modules/status/progress/progress";
import Member from "./modules/member/index";
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
        <Route path="/edit" component={edit} />
        <Route path="/member" component={Member} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();

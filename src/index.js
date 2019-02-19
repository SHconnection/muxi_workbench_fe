import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Provider } from "react-redux";
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
import load from "./modules/landing";
import Store from "./store";
import "./index.css";

ReactDOM.render(
  <Provider store={Store}>
    <Router>
      <div className="app-container">
        <Switch>
          <Redirect exact from="/" to="/project" />
          <Route path="/project" component={Project} />
          <Route path="/feed" component={Dynamic} />
          <Route path="/status" component={Progress} />
          <Route path="/edit" component={edit} />
          <Route path="/teamMember" component={Member} />
          <Route path="/message" component={Message} />
          <Route path="/search" component={Search} />
          <Route path="/landing" component={load} />
          <Route component={NoMatch} />
        </Switch>
        <Header />
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
if (process.env.NODE_ENV === "production") {
  console.log(
    `Muxi Workbench FE version ${process.env.REACT_APP_VERSION} 😎🤣😂😅😇😘`
  );
}

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Index from "./index/index";
import NewProject from "./new/index";
import NoMatch from "../../components/common/noMatch/index";
import "../../static/css/common.css";

class Project extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { match } = this.props;
    return (
      <div className="subject">
        <Route path={`${match.url}/new`} component={NewProject} />
        <Route exact path={match.url} component={Index} />
      </div>
    );
  }
}

export default Project;

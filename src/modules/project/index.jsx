import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import Index from "./index/index";
import NewProject from "./new/index";
import "../../static/css/common.css";

const Project = props => {
  const { match } = props;
  return (
    <div className="subject">
      <Route exact path={match.url} component={Index} />
      <Route path={`${match.url}/new`} component={NewProject} />
    </div>
  );
};

Project.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  })
};

Project.defaultProps = {
  match: {}
};

export default Project;

import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import Index from "./index/index";
import NewProject from "./new/index";
import ProjectDetail from "./detail/index"
import "../../static/css/common.css";

const Project = props => {
  const { match } = props;
  return (
    <div className="subject">
      <Route exact path={match.url} component={Index} />
      <Route path={`${match.url}/new`} component={NewProject} />
      <Route path={`${match.url}/:id/preview`} component={ProjectDetail} />
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

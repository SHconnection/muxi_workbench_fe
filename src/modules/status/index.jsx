import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import Index from "./progress/progress";
import detail from "./details/detail";
import Edit from "./markdown/edit";

const Project = props => {
  const { match } = props;
  return (
    <div>
      <Route exact path={match.url} component={Index} />
      <Route exact path={`${match.url}/:id`} component={detail} />
      <Route path={`${match.url}/:id/reEdit`} component={Edit} />
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

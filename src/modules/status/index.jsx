/* eslint-disable import/no-unresolved */
import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import Index from "./progress/progress";
import Detail from "./details/detail";
import Edit from "./markdown/edit";

import "../../static/css/common.css";

const Progress = props => {
  const { match } = props;

  return (
    <div>
      <Route exact path={match.url} component={Index} />
      <Route exact path={`${match.url}/:id`} component={Detail} />
      <Route path={`${match.url}/:id/reEdit`} component={Edit} />
    </div>
  );
};

Progress.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  })
};

Progress.defaultProps = {
  match: {}
};

export default Progress;

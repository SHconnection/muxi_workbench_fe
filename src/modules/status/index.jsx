import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import Index from "./progress/progress";
import Detail from "./details/detail";
import Edit from "./markdown/edit";

const Status = props => {
  const { match } = props;
  return (
    <div>
      <Route exact path={match.url} render={() => <Index pathUrl={match} />} />
      {/* <Route exact path={match.url} component={Index} /> */}
      <Route exact path={`${match.url}/:id`} component={Detail} />
      <Route path={`${match.url}/:id/reEdit`} component={Edit} />
    </div>
  );
};

Status.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  })
};

Status.defaultProps = {
  match: {}
};

export default Status;

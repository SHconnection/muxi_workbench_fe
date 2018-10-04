import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import Index from "./index/index";
import NewProject from "./new/index";
import ProjectDetail from "./detail/index";
import SetProject from "../setting/projectSetting/projectSetting";
import EditMember from "../setting/editMember/editMember";
import ProjectDetailAllFile from "./detail/allFile/index";
import ProjectDetailAllDoc from "./detail/allDoc/index";
import DocPreview from "./detail/docPreview/index";
import LoginService from "../../service/login";
import "../../static/css/common.css";

const Project = props => {
  const { match } = props;
  const data = {
    username: "jizhuoqi"
  };
  localStorage.username = data.username;

  LoginService.getToken(data).then(response => {
    const user = {};
    user.token = response.token;
    user.role = 7;
    user.id = 9;
    localStorage.token = response.token;
    localStorage.user = JSON.stringify(user);
    localStorage.per = JSON.stringify(user);
  });

  return (
    <div className="subject minH">
      <Route exact path={match.url} component={Index} />
      <Route path={`${match.url}/new`} component={NewProject} />
      <Route path={`${match.url}/:id/preview`} component={ProjectDetail} />
      <Route path={`${match.url}/:id/setting`} component={SetProject} />
      <Route path={`${match.url}/:id/editMem`} component={EditMember} />
      <Route
        path={`${match.url}/:id/allFile`}
        component={ProjectDetailAllFile}
      />
      <Route path={`${match.url}/:id/allDoc`} component={ProjectDetailAllDoc} />
      <Route
        path={`${match.url}/:pid/fileFolder/:id`}
        component={ProjectDetailAllFile}
      />
      <Route
        path={`${match.url}/:pid/docFolder/:id`}
        component={ProjectDetailAllDoc}
      />
      <Route path={`${match.url}/doc/:id`} component={DocPreview} />
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

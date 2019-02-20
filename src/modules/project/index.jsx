import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import Index from "./index/index";
import NewProject from "./new/index";
import ProjectMember from "./detail/member";
import ProjectTrash from "./detail/trash";
import ProjectDetail from "./detail/index";
import SetProject from "../setting/projectSetting/projectSetting";
import EditMember from "../setting/editMember/editMember";
import ProjectDetailAllFile from "./detail/allFile/index";
import ProjectDetailAllDoc from "./detail/allDoc/index";
import BatchFile from "./detail/batchFile/index";
import BatchDoc from "./detail/batchDoc/index";
import DocPreview from "./detail/docPreview/index";
import FilePreview from "./detail/filePreview/index";
import NewDoc from "./detail/newDoc/index";
import EditDoc from "./detail/editDoc/index";

import "../../static/css/common.css";

const Project = props => {
  const { match } = props;

  return (
    <div className="router-warpper">
      <Route exact path={match.url} component={Index} />
      <Route path={`${match.url}/new`} component={NewProject} />
      <Route path={`${match.url}/:id/preview`} component={ProjectDetail} />
      <Route path={`${match.url}/:id/setting`} component={SetProject} />
      <Route path={`${match.url}/:id/member`} component={ProjectMember} />
      <Route path={`${match.url}/:id/trash`} component={ProjectTrash} />
      <Route path={`${match.url}/:id/editMem`} component={EditMember} />
      <Route
        path={`${match.url}/:pid/fileFolder/:id`}
        component={ProjectDetailAllFile}
      />
      <Route
        path={`${match.url}/:pid/docFolder/:id`}
        component={ProjectDetailAllDoc}
      />
      <Route path={`${match.url}/:pid/batchFile/:id`} component={BatchFile} />
      <Route path={`${match.url}/:pid/batchDoc/:id`} component={BatchDoc} />
      <Route path={`${match.url}/:pid/newDoc/:id`} component={NewDoc} />
      <Route path={`${match.url}/:pid/file/:id`} component={FilePreview} />
      <Route path={`${match.url}/:pid/doc/:id`} component={DocPreview} />
      <Route path={`${match.url}/:pid/docEdit/:id`} component={EditDoc} />
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

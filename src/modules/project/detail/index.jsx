import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import GoBack from "../../../components/common/goBack/index";
import ProjectDetailIndex from "./index/index";
import ProjectDetailAllFile from './allFile/index';
// import Icon from "../../../components/common/icon/index";
// import Select from "../../../components/common/select/index"
// import FileIcon from "../components/fileIcon/index"
import "./index.css";
import "../../../static/css/common.css";

class ProjectDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    // const { projectInfo,fileOption,folderList } = this.state;
    // const { match } = this.props
    return (
      <div className="projectDetail-container">
        <GoBack />
        <Route path="/project/:id/preview" component={ProjectDetailIndex} />
        {/* <Route exact path={match.url} render={(props) => <ProjectDetailIndex id={match.params.id} {...props} />} /> */}
        {/* <div className="projectDetail-content">
          <div className="projectDetail-header">
            <div className="projectDetail-header-left">
              <div className="title">{projectInfo.name}</div>
              <div className="tip">{projectInfo.intro}</div>
            </div>
            <div className="projectDetail-header-right">
              <div className="projectDetail-header-icon-container">
                <Icon text={`${projectInfo.userCount}`} tip="成员" url="/member" />
              </div>
              <div className="projectDetail-header-icon-container">
                <Icon type="trash" tip="回收站" to="/trash" />
              </div>
              <div className="projectDetail-header-icon-container">
                <Icon type="setting" tip="设置" to="/setting" />
              </div>
            </div>
          </div>
          <div className="projectDetail-file-container">
            <div className="peojectDetail-file-header">
              <div className="title littleSize">文件</div>
              <div className="projectDetail-file-select">
                <Select items={fileOption}  />
                <FileIcon />
              </div>
            </div>
          </div>
        </div> */}
      </div>
    )
  }
}

ProjectDetail.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  })
};

ProjectDetail.defaultProps = {
  match: {}
};

export default ProjectDetail;

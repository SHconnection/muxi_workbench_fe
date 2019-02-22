import React, { Component } from "react";
import PropTypes from "prop-types";
import GoBack from "components/common/goBack/index";
import FileService from "service/file";
import ProjectService from "service/project";
import { Store } from "store";
import TrashList from "./list/index";
import { FileTree } from "../../fileTree1";
import AlertMoveFile from "../../components/alertMoveFile";
import "./index.css";
import "static/css/common.css";

class ProjectTrash extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    this.state = {
      pid: match.params.id,
      fileList: [],
      fileTree: {},
      currentFile: {}
    };
    this.getTrash = this.getTrash.bind(this);
    this.restore = this.restore.bind(this);
    this.getFileTree = this.getFileTree.bind(this);
    this.confirmMoveFile = this.confirmMoveFile.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
    this.getTrash();
    this.getFileTree();
  }

  // 获取文件树
  getFileTree() {
    const { pid } = this.state;
    FileTree.getFileTree(pid)
      .then(res => {
        this.setState({
          fileTree: res
        });
      })
      .finally(() => {});
  }

  getTrash() {
    const { pid } = this.state;
    FileService.getProjectTrash(pid)
      .then(res => {
        this.setState({
          fileList: res.FileList
        });
      })
      .catch(error => {
        Store.dispatch({
          type: "substituteWrongInfo",
          payload: error
        });
      })
      .finally(() => {});
  }

  restore(file) {
    this.setState({
      currentFile: file,
      showMoveAlert: true
    });
  }

  // 确认移动文件
  confirmMoveFile(finalMoveFolderId) {
    const { pid, currentFile, fileTree } = this.state;
    if (currentFile) {
      const fileTreeTemp = JSON.parse(JSON.stringify(fileTree));
      const newNode = {
        folder: false,
        id: currentFile.id,
        name: currentFile.name
      };
      const newTree = FileTree.insertNode(
        newNode,
        finalMoveFolderId,
        fileTreeTemp
      );
      if (newTree) {
        FileTree.initNodeFinalSelected(newTree);
        FileTree.initNodeSelected(newTree);
        newTree.selected = true;
        newTree.finalSelected = true;
        ProjectService.updateProjectFileTree(pid, JSON.stringify(newTree))
          .then(() => {
            FileService.putBackProjectTrash(pid, currentFile.id).then(() => {
              this.hideAlert();
              this.getTrash();
            });
          })
          .catch(error => {
            Store.dispatch({
              type: "substituteWrongInfo",
              payload: error
            });
          });
      }
    }
  }

  hideAlert() {
    this.setState({
      currentFile: {},
      showMoveAlert: false
    });
  }

  render() {
    const { fileList, fileTree, showMoveAlert } = this.state;
    return (
      <div className="projectDetail-container">
        <GoBack />
        <div className="projectDetail-content">
          <div className="projectDetail-header">
            <div className="title">回收站</div>
          </div>
          <div className="projectDetail-allFile-list">
            {fileList.length ? (
              <div className="projectDetail-allFile-list-title">
                <div className="projectDetail-allFile-list-name">文件名称</div>
                <div className="trash-filelist-deletetime">删除日期</div>
                <div className="trash-filelist-createtime">创建日期</div>
              </div>
            ) : (
              <div className="tip">回收站很干净～</div>
            )}
            {fileList.map(el => (
              <TrashList item={el} restore={this.restore} key={el.id} />
            ))}
          </div>
        </div>
        {showMoveAlert ? (
          <AlertMoveFile
            fileTree={fileTree}
            cancel={this.hideAlert}
            confirmMoveFile={this.confirmMoveFile}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

ProjectTrash.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  })
};

ProjectTrash.defaultProps = {
  match: {}
};

export default ProjectTrash;

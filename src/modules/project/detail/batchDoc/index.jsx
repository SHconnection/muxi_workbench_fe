import React, { Component } from "react";
import PropTypes from "prop-types";
import GoBack from "components/common/goBack/index";
import ProjectService from "service/project";
import FileService from "service/file";
import { Store } from "store";
import AlertMoveFile from "../../components/alertMoveFile";
import AlertDeleteFile from "../../components/alertDeleteFile";
import { FileTree } from "../../fileTree";
import FileListBatch from "../../components/fileListBatch/index";
import "./index.scss";
import "static/css/common.scss";

class BatchDoc extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    this.state = {
      // 当前项目id
      pid: parseInt(match.params.pid, 0),
      // 当前视图的文件树节点id
      fileRootId: parseInt(match.params.id, 0),
      // 当前视图name
      currentRootName: "",
      // 当前路径
      fileUrl: "",
      // 文件树
      fileTree: {},
      // 是否显示删除文件
      showDleteFile: false,
      // 是否显示移动文件
      showMoveFile: false,
      // 文件列表
      fileList: [],
      // 是否全部选中
      checkedAll: false
    };
    this.getDocUrl = this.getDocUrl.bind(this);
    this.updateFilesList = this.updateFilesList.bind(this);
    this.check = this.check.bind(this);
    this.checkAll = this.checkAll.bind(this);
    this.deleteFiles = this.deleteFiles.bind(this);
    this.moveFiles = this.moveFiles.bind(this);
    this.confirmDeleteFile = this.confirmDeleteFile.bind(this);
    this.confirmMoveFile = this.confirmMoveFile.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
    this.updateFilesList(parseInt(match.params.id, 0));
  }

  // 算出文件的路径
  getDocUrl(id, tree) {
    // 找到文件所在节点
    const node = FileTree.searchNode(id, tree);
    if (node) {
      if (node.router.length) {
        const fileIdUrl = JSON.parse(JSON.stringify(node.router));
        // fileIdUrl.pop()
        fileIdUrl.shift();
        const postData = {
          folder: fileIdUrl.map(el => parseInt(el, 0)),
          doc: []
        };
        FileService.getDocList(postData)
          .then(res => {
            let fileUrl = `${tree.name}`;
            if (res.FolderList && res.FolderList.length) {
              fileUrl += `${res.FolderList.map(el => `/${el.name}`).reduce(
                (el1, el2) => el1 + el2
              )}`;
            }
            this.setState({
              fileUrl
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

  // 根据文件树更新当前视图的文件
  updateFilesList(id) {
    const { pid } = this.state;
    const fileRootId = id;
    // 请求树
    FileTree.getDocTree(pid)
      .then(res => {
        this.setState({
          fileTree: res,
          currentRootName: FileTree.searchNode(fileRootId, res).name
        });
        // 算当前路径
        this.getDocUrl(fileRootId, res);
        // 请求filelist
        FileService.getDocList(FileTree.findDocIdList(fileRootId, res))
          .then(res1 => {
            /* eslint-disable */
            res1.DocList.forEach(item => {
              item.checked = false;
            });
            /* eslint-disable */
            this.setState({
              filesList: res1,
              fileList: res1.DocList,
              checkAll: false
            });
            this.hideAlert();
          })
          .catch(error => {
            Store.dispatch({
              type: "substituteWrongInfo",
              payload: error
            });
          });
      })
      .catch(error => {
        Store.dispatch({
          type: "substituteWrongInfo",
          payload: error
        });
      });
  }

  // 勾选
  check(id, index) {
    const { fileList, checkedAll } = this.state;
    fileList[index].checked = !fileList[index].checked;
    if (checkAll) {
      this.setState({
        checkedAll: false
      });
    }
    if (fileList.every(el => el.checked)) {
      this.setState({
        checkedAll: true
      });
    }
    this.setState({
      fileList
    });
  }

  // 全选
  checkAll() {
    const { fileList, checkedAll } = this.state;
    fileList.forEach(el => {
      el.checked = !checkedAll;
    });
    this.setState({
      checkedAll: !checkedAll
    });
  }

  // 删除文件们
  deleteFiles() {
    const { fileList } = this.state;
    const fileDel = fileList.filter(el => el.checked);
    if (fileDel.length) {
      this.setState({
        showDleteFile: true
      });
    }
  }

  // 确认删除文件
  confirmDeleteFile() {
    const { pid, fileRootId, fileList, fileTree } = this.state;
    const nodeTemp = FileTree.searchNode(fileRootId, fileTree).child;
    let fileStart = 0;
    for (let i = 0; i < nodeTemp.length; i += 1) {
      if (nodeTemp[i].folder) {
        fileStart += 1;
      } else {
        if (fileList[i - fileStart].checked) {
          nodeTemp.splice(i, 1);
          fileList.splice(i - fileStart, 1);
          i -= 1;
        }
      }
    }
    ProjectService.updateProjectDocTree(pid, JSON.stringify(fileTree))
      .then(() => {
        // 更新视图
        this.updateFilesList(fileRootId);
      })
      .catch(error => {
        Store.dispatch({
          type: "substituteWrongInfo",
          payload: error
        });
      });
  }

  // 移动文件们
  moveFiles() {
    const { fileList } = this.state;
    const fileMove = fileList.filter(el => el.checked);
    if (fileMove.length) {
      this.setState({
        showMoveFile: true
      });
    }
  }

  // 确认移动文件
  confirmMoveFile(finalMoveFolderId) {
    const { pid, fileRootId, fileList, fileTree } = this.state;
    const movedNode = FileTree.searchNode(finalMoveFolderId, fileTree);
    /* eslint-disable */
    if (movedNode.id == fileRootId) {
      /* eslint-disable */
      return;
    }
    const nodeTemp = FileTree.searchNode(fileRootId, fileTree).child;
    let fileStart = 0;
    for (let i = 0; i < nodeTemp.length; i += 1) {
      if (nodeTemp[i].folder) {
        fileStart += 1;
      } else {
        if (fileList[i - fileStart].checked) {
          movedNode.child.push(nodeTemp.splice(i, 1)[0]);
          fileList.splice(i - fileStart, 1);
          i -= 1;
        }
      }
    }
    FileTree.initNodeFinalSelected(fileTree);
    FileTree.initNodeSelected(fileTree);
    fileTree.selected = true;
    fileTree.finalSelected = true;
    ProjectService.updateProjectDocTree(pid, JSON.stringify(fileTree))
      .then(() => {
        // 更新视图
        this.updateFilesList(fileRootId);
      })
      .catch(error => {
        Store.dispatch({
          type: "substituteWrongInfo",
          payload: error
        });
      });
  }

  // 隐藏弹出框
  hideAlert() {
    this.setState({
      showDleteFile: false,
      showMoveFile: false
    });
  }

  render() {
    const {
      currentRootName,
      checkedAll,
      fileList,
      fileUrl,
      fileTree,
      showDleteFile,
      showMoveFile
    } = this.state;
    return (
      <div className="projectDetail-container">
        <GoBack />
        <div className="projectDetail-content">
          <div className="projectDetail-header">
            <div className="title">{currentRootName}</div>
            {fileList.length ? (
              <div className="projectDetail-header-right">
                <input
                  type="checkbox"
                  checked={checkedAll}
                  onChange={this.checkAll}
                  id="checkAll"
                />
                <label htmlFor="checkAll">{`全选`}</label>
              </div>
            ) : (
              ""
            )}
          </div>
          {fileList.length ? (
            <div className="projectDetail-allFile-list">
              <div className="projectDetail-allFile-list-title">
                <div className="projectDetail-allFile-list-name">文件名称</div>
                <div className="projectDetail-allFile-list-uploader">
                  上传者
                </div>
                <div className="projectDetail-allFile-list-time">上传时间</div>
                <div className="projectDetail-allFile-list-url">路径</div>
              </div>
              {fileList.map((el, index) => (
                <div key={el.id}>
                  <FileListBatch
                    item={el}
                    index={index}
                    fileUrl={fileUrl}
                    check={this.check}
                  />
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
          {fileList.length ? (
            <div className="projectDetail-batch-foot">
              <div
                onClick={() => {
                  this.deleteFiles();
                }}
                onKeyDown={() => {}}
                role="presentation"
              >
                删除
              </div>
              <div
                onClick={() => {
                  this.moveFiles();
                }}
                onKeyDown={() => {}}
                role="presentation"
              >
                移动
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        {/* 删除文件弹出框 */}
        {showDleteFile && (
          <AlertDeleteFile
            type="文件"
            cancel={this.hideAlert}
            confirmDelete={this.confirmDeleteFile}
          />
        )}
        {/* 移动文件弹出框 */}
        {showMoveFile ? (
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

BatchDoc.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  })
};

BatchDoc.defaultProps = {
  match: {}
};

export default BatchDoc;

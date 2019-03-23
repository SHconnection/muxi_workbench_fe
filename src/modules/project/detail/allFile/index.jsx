import React, { Component } from "react";
import PropTypes from "prop-types";
import Loading from "components/common/loading";
import GoBack from "components/common/goBack/index";
import Icon from "components/common/icon/index";
import Button from "components/common/button/index";
import Select from "components/common/select/index";
import ProjectService from "service/project";
import FileService from "service/file";
import Spin from "components/common/spin";
import { Store } from "store";
import AlertMoveFile from "../../components/alertMoveFile";
import AlertDeleteFile from "../../components/alertDeleteFile";
import AlertCreateFolder from "../../components/alertCreateFolder";
import { FileTree } from "../../fileTree";
import FileItem from "../../components/fileItem/index";
import FolderItem from "../../components/folderItem/index";
import FileList from "../../components/fileList/index";
import "./index.scss";
import "static/css/common.scss";

class ProjectDetailAllFile extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    this.state = {
      uploading: false,
      loading: true,
      // 当前项目id
      pid: parseInt(match.params.pid, 10),
      // 当前正在操作的fileid
      currentFileId: undefined,
      // 当前正在操作的fileFolderId
      currentFileFolderId: undefined,
      // 当前视图的文件树节点id
      fileRootId: parseInt(match.params.id, 10),
      // 当前视图name
      currentRootName: "",
      // 当前路径
      fileUrl: "",
      // 文件树
      fileTree: {},
      // 是否是item形式排版
      itemLayOut: true,
      // 是否显示创建文件框
      showCreateFile: false,
      // 是否显示删除文件
      showDleteFile: false,
      // 是否显示移动文件
      showMoveFile: false,
      // 文件（夹）列表
      filesList: {
        FolderList: [],
        FileList: []
      },
      // 创建文件夹和上传文件选项
      fileOption: [
        {
          id: 0,
          value: "上传文件",
          type: "file"
        },
        {
          id: 1,
          value: "创建文件夹"
        }
      ]
    };
    this.getFileUrl = this.getFileUrl.bind(this);
    this.updateFilesList = this.updateFilesList.bind(this);
    this.changeLayoutToItem = this.changeLayoutToItem.bind(this);
    this.changeLayoutToList = this.changeLayoutToList.bind(this);
    this.startCreateFile = this.startCreateFile.bind(this);
    this.confirmCreateFile = this.confirmCreateFile.bind(this);
    this.startDeleteFile = this.startDeleteFile.bind(this);
    this.confirmDeleteFile = this.confirmDeleteFile.bind(this);
    this.moveFile = this.moveFile.bind(this);
    this.confirmMoveFile = this.confirmMoveFile.bind(this);
    this.fileToTop = this.fileToTop.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    this.updateFilesList(parseInt(id, 10));
  }

  componentWillUpdate(nextProps) {
    const { fileRootId } = this.state;
    const {
      match: {
        params: { id }
      }
    } = nextProps;
    if (fileRootId !== parseInt(id, 10)) {
      this.updateFilesList(parseInt(id, 10));
    }
  }

  // 算出文件的路径
  getFileUrl(id, tree) {
    // 找到文件所在节点
    const node = FileTree.searchNode(id, tree);
    if (node) {
      if (node.router.length) {
        const fileIdUrl = JSON.parse(JSON.stringify(node.router));
        // fileIdUrl.pop()
        fileIdUrl.shift();
        const postData = {
          folder: fileIdUrl.map(el => parseInt(el, 0)),
          file: []
        };
        FileService.getFileList(postData)
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
    this.setState({
      loading: true,
      fileRootId: id
    });
    const { pid } = this.state;
    // 请求树
    FileTree.getFileTree(pid)
      .then(res => {
        this.setState({
          fileTree: res,
          currentRootName: FileTree.searchNode(id, res).name
        });
        // 算当前路径
        this.getFileUrl(id, res);
        // 请求filelist
        FileService.getFileList(FileTree.findFileIdList(id, res))
          .then(res1 => {
            this.setState({
              filesList: res1,
              loading: false
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

  // 开始创建文件（夹）
  startCreateFile(index) {
    const { pid, fileRootId, fileTree } = this.state;
    if (index === 1) {
      this.hideAlert();
      this.setState({
        showCreateFile: true
      });
    } else {
      /*
      / 这里是上传文件
      */
      this.setState({
        uploading: true
      });
      const formData = new FormData();
      formData.append("project_id", pid);
      formData.append("file", index);
      FileService.uploadFile(formData)
        .then(res => {
          if (res.status === 201) {
            res.json().then(data => {
              // 上传成功，更新文件树
              const newNode = { folder: false, id: data.fid, name: data.name };
              ProjectService.updateProjectFileTree(
                pid,
                JSON.stringify(
                  FileTree.insertNode(newNode, fileRootId, fileTree)
                )
              )
                .then(() => {
                  // 更新视图
                  this.updateFilesList(fileRootId);
                  this.setState({
                    uploading: false
                  });
                })
                .catch(error => {
                  Store.dispatch({
                    type: "substituteWrongInfo",
                    payload: error
                  });
                });
            });
          }
          if (res.status === 413) {
            alert(res.statusText);
          }
        })
        .catch(error => {
          Store.dispatch({
            type: "substituteWrongInfo",
            payload: error
          });
        });
    }
  }

  // 点击确认创建文件夹
  confirmCreateFile(inputText) {
    const { pid, fileTree, fileRootId } = this.state;
    if (inputText) {
      // 请求创建
      FileService.createFileFolder(inputText, pid)
        .then(res => {
          // 更新树
          const newNode = {
            folder: true,
            id: res.id,
            name: inputText,
            child: []
          };
          ProjectService.updateProjectFileTree(
            pid,
            JSON.stringify(FileTree.insertNode(newNode, fileRootId, fileTree))
          )
            .then(() => {
              // 更新视图
              this.updateFilesList(fileRootId);
              this.setState({
                showCreateFile: false
              });
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
  }

  // 开始删除文件
  startDeleteFile(id, str) {
    this.hideAlert();
    this.setState({
      showDleteFile: true
    });
    if (str === "file") {
      this.setState({
        currentFileId: id
      });
    } else {
      this.setState({
        currentFileFolderId: id
      });
    }
  }

  // 确认删除文件
  confirmDeleteFile() {
    const { currentFileId, currentFileFolderId, fileTree } = this.state;
    // 文件
    if (currentFileId) {
      FileService.deleteFile(currentFileId)
        .then(() => {
          // 删除成功
          this.deleteFileNode(currentFileId);
        })
        .catch(error => {
          Store.dispatch({
            type: "substituteWrongInfo",
            payload: error
          });
        });
    }
    // 文件夹
    if (currentFileFolderId) {
      const postData = FileTree.findAllFileList(currentFileFolderId, fileTree);
      FileService.deleteFileFolder(currentFileFolderId, postData)
        .then(() => {
          // 删除成功
          this.deleteFileNode(currentFileFolderId);
        })
        .catch(error => {
          Store.dispatch({
            type: "substituteWrongInfo",
            payload: error
          });
        });
    }
  }

  // 删除文件树节点并更新视图
  deleteFileNode(id) {
    const { pid, fileTree, fileRootId } = this.state;
    // 更新文件树
    const newTree = FileTree.deleteNode(id, fileTree).root;
    if (newTree) {
      ProjectService.updateProjectFileTree(pid, JSON.stringify(newTree))
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
  }

  // 开始移动文件
  moveFile(id, str) {
    // 移动文件获文件夹
    this.setState({
      showMoveFile: true
    });
    if (str === "file") {
      this.setState({
        currentFileId: id
      });
    } else {
      this.setState({
        currentFileFolderId: id
      });
    }
  }

  // 确认移动文件
  confirmMoveFile(finalMoveFolderId) {
    const {
      pid,
      fileTree,
      currentFileFolderId,
      currentFileId,
      fileRootId
    } = this.state;
    const moveId = currentFileFolderId || currentFileId;
    const fileTreeTemp = JSON.parse(JSON.stringify(fileTree));
    const newTree = FileTree.moveNode(moveId, finalMoveFolderId, fileTreeTemp);
    if (newTree) {
      FileTree.initNodeFinalSelected(newTree);
      FileTree.initNodeSelected(newTree);
      newTree.selected = true;
      newTree.finalSelected = true;
      ProjectService.updateProjectFileTree(pid, JSON.stringify(newTree))
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
  }

  // 置顶
  fileToTop(index) {
    const { pid, fileRootId, fileTree } = this.state;
    if (index) {
      const fileTreeTemp = JSON.parse(JSON.stringify(fileTree));
      const fileArr = FileTree.searchNode(fileRootId, fileTreeTemp).child;
      let fileStart = 0;
      for (let i = 0; i < fileArr.length; i++) {
        if (fileArr[i].folder) {
          fileStart += 1;
        } else break;
      }
      const topItem = fileArr.splice(fileStart + index, 1);
      fileArr.splice(fileStart, 0, topItem[0]);
      ProjectService.updateProjectFileTree(pid, JSON.stringify(fileTreeTemp))
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
  }

  // 隐藏弹出框
  hideAlert() {
    this.setState({
      showCreateFile: false,
      showDleteFile: false,
      showMoveFile: false,
      // newFileInputText: "",
      currentFileId: undefined,
      currentFileFolderId: undefined
    });
  }

  // 改变布局方式
  changeLayoutToList() {
    this.setState({
      itemLayOut: false
    });
  }

  changeLayoutToItem() {
    this.setState({
      itemLayOut: true
    });
  }

  render() {
    const {
      pid,
      fileRootId,
      currentRootName,
      fileOption,
      itemLayOut,
      filesList,
      fileTree,
      showCreateFile,
      showDleteFile,
      showMoveFile,
      fileUrl,
      loading,
      uploading
    } = this.state;
    const BatchBtStyle = !filesList.FileList.length
      ? {
          visibility: "hidden"
        }
      : {
          visibility: "visible"
        };

    return !loading ? (
      <div className="projectDetail-container">
        <GoBack />
        <div className="projectDetail-content">
          <div className="projectDetail-header projectDetail-allFile-header">
            <div className="projectDetail-header-left">
              <div className="title">{currentRootName}</div>
              <div className="projectDetail-header-left-select">
                <Select items={fileOption} onChange={this.startCreateFile} />
              </div>
            </div>
            <div className="projectDetail-header-right projectDetail-allFile-header-right">
              <div style={BatchBtStyle}>
                <Icon
                  type={itemLayOut ? "FileItemsSel" : "FileItems"}
                  onClick={this.changeLayoutToItem}
                />
              </div>
              <div style={BatchBtStyle}>
                <Icon
                  type={itemLayOut ? "FileLists" : "FileListSel"}
                  onClick={this.changeLayoutToList}
                />
              </div>
              <div>
                <div style={BatchBtStyle}>
                  <Button text="批量管理" to={`../batchFile/${fileRootId}`} />
                </div>
              </div>
            </div>
          </div>
          {itemLayOut ? (
            <div className="projectDetail-file-items peojectDetail-allFile-items">
              {filesList.FolderList.map(el => (
                <div className="file-item" key={el.id}>
                  <FolderItem
                    folderItem={el}
                    pid={pid}
                    moveFile={this.moveFile}
                    deleteFile={this.startDeleteFile}
                  />
                </div>
              ))}
              {filesList.FileList.map(el => (
                <div className="file-item" key={el.id}>
                  <FileItem
                    fileItem={el}
                    pid={pid}
                    moveFile={this.moveFile}
                    deleteFile={this.startDeleteFile}
                  />
                </div>
              ))}
              {uploading ? (
                <div className="file-item">
                  <div className="uploading">
                    <Spin />
                    <div className="text">上传中</div>
                  </div>
                </div>
              ) : null}
              {!filesList.FolderList.length && !filesList.FileList.length ? (
                <div className="tip">什么都没有哦～</div>
              ) : null}
            </div>
          ) : (
            <div className="projectDetail-allFile-list">
              {filesList.FileList.length ? (
                <div className="projectDetail-allFile-list-title">
                  <div className="projectDetail-allFile-list-name">
                    文件名称
                  </div>
                  <div className="projectDetail-allFile-list-uploader">
                    上传者
                  </div>
                  <div className="projectDetail-allFile-list-time">
                    上传时间
                  </div>
                  <div className="projectDetail-allFile-list-url">路径</div>
                </div>
              ) : null}
              {filesList.FileList.map((el, index) => (
                <div key={el.id}>
                  <FileList
                    item={el}
                    index={index}
                    fileUrl={fileUrl}
                    moveFile={this.moveFile}
                    deleteFile={this.startDeleteFile}
                    fileToTop={this.fileToTop}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        {/* 创建文件弹出框 */}
        {showCreateFile && (
          <AlertCreateFolder
            type="文件"
            cancel={this.hideAlert}
            confirmCreate={this.confirmCreateFile}
          />
        )}
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
        ) : null}
      </div>
    ) : (
      <Loading />
    );
  }
}

ProjectDetailAllFile.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  })
};

ProjectDetailAllFile.defaultProps = {
  match: {}
};

export default ProjectDetailAllFile;

import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactSVG from "react-svg";
import { Scrollbars } from "react-custom-scrollbars";
import FileTreeComponent from "../../components/fileTree/index";
import { FileTree } from "../../fileTree1";
import GoBack from "../../../../components/common/goBack/index";
import Icon from "../../../../components/common/icon/index";
import Button from "../../../../components/common/button/index";
import Select from "../../../../components/common/select/index";
import FileItem from "../../components/fileItem/index";
import FolderItem from "../../components/folderItem/index";
import FileList from "../../components/fileList/index";
import ProjectService from "../../../../service/project";
import FileService from "../../../../service/file";
import CreateFileAlertIcon from "../../../../assets/svg/commonIcon/editFileAlert.svg";
import "./index.css";
import "../../../../static/css/common.css";

class ProjectDetailAllFile extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    this.state = {
      // 当前项目id
      pid: parseInt(match.params.pid, 0),
      // 当前正在操作的fileid
      currentFileId: undefined,
      // 当前正在操作的fileFolderId
      currentFileFolderId: undefined,
      // 当前视图的文件树节点id
      fileRootId: parseInt(match.params.id, 0),
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
      // 输入的新文件名
      newFileInputText: "",
      // 是否显示删除文件
      showDleteFile: false,
      // 是否显示移动文件
      showMoveFile: false,
      // 移动文件最终选择的id
      finalMoveFileId: 0,
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
    this.changeNewFileInputText = this.changeNewFileInputText.bind(this);
    this.confirmCreateFile = this.confirmCreateFile.bind(this);
    this.startDeleteFile = this.startDeleteFile.bind(this);
    this.confirmDeleteFile = this.confirmDeleteFile.bind(this);
    this.moveFile = this.moveFile.bind(this);
    this.confirmMoveFile = this.confirmMoveFile.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
  }

  componentWillMount() {
    const { fileRootId } = this.state;
    this.updateFilesList(fileRootId);
  }

  componentWillUpdate(nextProps) {
    /* eslint-disable */
    const { location } = this.props;
    /* eslint-disable */
    if (location !== nextProps.location) {
      this.updateFilesList(parseInt(nextProps.match.params.id, 0));
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
          .catch(err => {
            console.error(err);
          });
      }
    }
  }

  // 根据文件树更新当前视图的文件
  updateFilesList(id) {
    const { pid } = this.state;
    const fileRootId = id;
    // 请求树
    FileTree.getFileTree(pid)
      .then(res => {
        this.setState({
          fileTree: res,
          currentRootName: FileTree.searchNode(fileRootId, res).name
        });
        // 算当前路径
        this.getFileUrl(fileRootId, res);
        // 请求filelist
        FileService.getFileList(FileTree.findFileIdList(fileRootId, res))
          .then(res1 => {
            this.setState({
              filesList: res1
            });
            this.hideAlert();
          })
          .catch(res1 => {
            console.error(res1);
          });
      })
      .catch(res => {
        console.error(res);
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
      const formData = new FormData();
      formData.append("project_id", pid);
      formData.append("file", index);
      FileService.uploadFile(formData)
        .then(res => {
          console.log(res);
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
                })
                .catch(res1 => {
                  console.error(res1);
                });
              console.log(data);
            });
          }
        })
        .catch(res => {
          console.error(res);
        });
    }
  }

  // 输入新文件夹名字
  changeNewFileInputText(event) {
    this.setState({
      newFileInputText: event.target.value
    });
  }

  // 点击确认创建文件夹
  confirmCreateFile() {
    const { newFileInputText, pid, fileTree, fileRootId } = this.state;
    if (newFileInputText) {
      // 请求创建
      FileService.createFileFolder(newFileInputText, pid)
        .then(res => {
          // 更新树
          const newNode = {
            folder: true,
            id: res.id,
            name: newFileInputText,
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
            .catch(res1 => {
              console.error(res1);
            });
        })
        .catch(res => {
          console.error(res);
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
        .catch(el => {
          console.error(el);
        });
    }
    // 文件夹
    if (currentFileFolderId) {
      const postData = FileTree.findAllFileList(currentFileFolderId, fileTree);
      console.log(postData);
      FileService.deleteFileFolder(currentFileFolderId, postData)
        .then(() => {
          // 删除成功
          this.deleteFileNode(currentFileFolderId);
        })
        .catch(el => {
          console.error(el);
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
        .catch(el => {
          console.error(el);
        });
    }
  }

  // 开始移动文件
  moveFile(id, str) {
    // 移动文件获文件夹
    if (str === "file" || str === "fileFolder") {
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
    } else {
      this.setState({
        showMoveDoc: true
      });
      if (str === "doc") {
        this.setState({
          currentDocId: id
        });
      } else {
        this.setState({
          currentDocFolderId: id
        });
      }
    }
  }

  // 确认移动文件
  confirmMoveFile() {
    const {
      pid,
      fileTree,
      finalMoveFileId,
      currentFileFolderId,
      currentFileId,
      fileRootId
    } = this.state;
    const moveId = currentFileFolderId || currentFileId;
    const fileTreeTemp = JSON.parse(JSON.stringify(fileTree));
    const newTree = FileTree.moveNode(moveId, finalMoveFileId, fileTreeTemp);
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
        .catch(el => {
          console.error(el);
        });
    }
  }

  // 隐藏弹出框
  hideAlert() {
    this.setState({
      showCreateFile: false,
      showDleteFile: false,
      showMoveFile: false,
      newFileInputText: "",
      currentFileId: undefined,
      currentFileFolderId: undefined,
      finalMoveFileId: 0
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

  cancelMoveFile() {
    this.setState({
      showMoveFile: false
    });
  }

  render() {
    const {
      pid,
      currentRootName,
      fileOption,
      itemLayOut,
      filesList,
      fileTree,
      newFileInputText,
      showCreateFile,
      showDleteFile,
      showMoveFile,
      fileUrl
    } = this.state;
    return (
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
              <div>
                <Icon
                  type={itemLayOut ? "FileItemsSel" : "FileItems"}
                  onClick={this.changeLayoutToItem}
                />
              </div>
              <div>
                <Icon
                  type={itemLayOut ? "FileLists" : "FileListSel"}
                  onClick={this.changeLayoutToList}
                />
              </div>
              <div>
                <Button text="批量管理" to="./file_batch_manage" />
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
            </div>
          ) : (
            <div className="projectDetail-allFile-list">
              <div className="projectDetail-allFile-list-title">
                <div className="projectDetail-allFile-list-name">文件名称</div>
                <div className="projectDetail-allFile-list-uploader">
                  上传者
                </div>
                <div className="projectDetail-allFile-list-time">上传时间</div>
                <div className="projectDetail-allFile-list-url">路径</div>
              </div>
              {filesList.FileList.map(el => (
                <div key={el.id}>
                  <FileList
                    item={el}
                    fileUrl={fileUrl}
                    moveFile={this.moveFile}
                    deleteFile={this.startDeleteFile}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        {/* 创建文件弹出框 */}
        {showCreateFile && (
          <div className="createFileAlert">
            <ReactSVG
              className="create-file-alert-icon"
              path={CreateFileAlertIcon}
            />
            <input
              className="create-file-alert-input"
              type="text"
              placeholder="编辑文件夹名"
              value={newFileInputText}
              onChange={this.changeNewFileInputText}
            />
            <div className="create-file-alert-cancel">
              <Button
                onClick={this.hideAlert}
                text="取消"
                width="65"
                height="32"
                border="1px solid RGBA(217, 217, 217, 1)"
                bgColor="RGBA(255, 255, 255, 1)"
                textColor="RGBA(64, 64, 64, 1)"
                fontSize="14"
              />
            </div>
            <div className="create-file-alert-done">
              <Button
                onClick={this.confirmCreateFile}
                text="确定"
                width="65"
                height="32"
                fontSize="14"
              />
            </div>
          </div>
        )}
        {/* 删除文件弹出框 */}
        {showDleteFile && (
          <div className="deleteFileAlert">
            <div className="delete-file-alert-tip">确认要删除该文件吗</div>
            <div className="delete-file-alert-cancel">
              <Button
                onClick={this.hideAlert}
                text="取消"
                width="65"
                height="32"
                border="1px solid RGBA(217, 217, 217, 1)"
                bgColor="RGBA(255, 255, 255, 1)"
                textColor="RGBA(64, 64, 64, 1)"
                fontSize="14"
              />
            </div>
            <div className="delete-file-alert-done">
              <Button
                onClick={this.confirmDeleteFile}
                text="确定"
                width="65"
                height="32"
                fontSize="14"
              />
            </div>
          </div>
        )}
        {/* 移动文件弹出框 */}
        {showMoveFile && (
          <div className="moveFileAlert">
            <div className="move-file-alert-tip">选择保存路径</div>
            <div className="move-file-tree-container">
              <Scrollbars>
                <FileTreeComponent
                  root={fileTree}
                  select={() => {
                    const fileRootTemp = Object.assign({}, fileTree);
                    fileRootTemp.selected = !fileRootTemp.selected;
                    FileTree.initNodeSelected(fileRootTemp);
                    this.setState({
                      fileTree: fileRootTemp
                    });
                  }}
                  finalSelect={el => {
                    const fileRootTemp = Object.assign({}, fileTree);
                    FileTree.initNodeFinalSelected(fileRootTemp);
                    let fatherId;
                    if (el.selected || el.router.length === 1) {
                      fatherId = el.id;
                    } else {
                      // 取消选中
                      fatherId = el.router[el.router.length - 2];
                    }
                    const fatherNode = FileTree.searchNode(
                      fatherId,
                      fileRootTemp
                    );
                    fatherNode.finalSelected = true;
                    this.setState({
                      fileTree: fileRootTemp,
                      finalMoveFileId: fatherNode.id
                    });
                  }}
                />
              </Scrollbars>
            </div>
            <div className="move-file-alert-cancel">
              <Button
                onClick={this.hideAlert}
                text="取消"
                width="65"
                height="32"
                border="1px solid RGBA(217, 217, 217, 1)"
                bgColor="RGBA(255, 255, 255, 1)"
                textColor="RGBA(64, 64, 64, 1)"
                fontSize="14"
              />
            </div>
            <div className="move-file-alert-done">
              <Button
                onClick={this.confirmMoveFile}
                text="确定"
                width="65"
                height="32"
                fontSize="14"
              />
            </div>
          </div>
        )}
      </div>
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

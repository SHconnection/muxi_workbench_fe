import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";
import { Scrollbars } from 'react-custom-scrollbars';
import GoBack from "../../../components/common/goBack/index";
import Icon from "../../../components/common/icon/index";
import FileTreeComponent from "../components/fileTree/index";
import {Root, FileTree, getRoot} from "../fileTree1";
import Button from "../../../components/common/button/index"
import Select from "../../../components/common/select/index";
import FolderItem from "../components/folderItem/index";
import FileItem from "../components/fileItem/index";
import FolderItemDoc from "../components/folderItemDoc/index";
import DocItem from "../components/docItem/index";
import CreateFileAlertIcon from "../../../assets/svg/commonIcon/editFileAlert.svg";
import "./index.css";
import "../../../static/css/common.css";

class ProjectDetailIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pid: null,
      showCreateFile: false,
      showDleteFile: false,
      showMoveFile: false,
      showCreateDocFile: false,
      projectInfo: {
        name: "项目名称",
        intro: "这是简介这是简介这是简介",
        userCount: 58
      },
      fileRoot: Root,
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
      ],
      // 创建文档夹和创建文档选项
      docOption: [
        {
          id: 0,
          value: "创建文档"
        },
        {
          id: 1,
          value: "创建文件夹"
        }
      ],
      // 文件（夹）列表
      filesList: {
        FolderList: [
          {
            id: 1,
            name: "文件夹1"
          },
          {
            id: 2,
            name: "文件夹2"
          }
        ],
        FileList: [
          {
            id: 3,
            name: "文件1.zip",
            creator: "muxi123",
            url: "/",
            create_time: "2018-9-14"
          },
          {
            id: 4,
            name: "文件2.psd",
            creator: "muxi123",
            url: "/",
            create_time: "2018-9-14"
          },
          {
            id: 5,
            name: "文件3.pdf",
            creator: "muxi222",
            url: "/",
            create_time: "2018-9-14"
          },
          {
            id: 6,
            name: "文件4.txt",
            creator: "muxi666",
            url: "/",
            create_time: "2018-9-14"
          },
          {
            id: 7,
            name: "文件5.rar",
            creator: "muxi213",
            url: "/",
            create_time: "2018-9-14"
          }
        ]
      },
      // 文档（夹）列表
      docList: {
        FolderList: [
          {
            id: 1,
            name: "个人文档文件夹1"
          },
          {
            id: 2,
            name: "个人文档文件夹2"
          },
          {
            id: 3,
            name: "个人文档文件夹3"
          }
        ],
        DocList: [
          {
            id: 1,
            name: "文档1",
            lastcontent: ""
          },
          {
            id: 2,
            name: "文档2",
            lastcontent: ""
          },
          {
            id: 3,
            name: "文档3",
            lastcontent: ""
          },
          {
            id: 4,
            name: "文档4",
            lastcontent: ""
          }
        ]
      }
    };
    this.startCreateFile = this.startCreateFile.bind(this)
    this.cancelCreateFile = this.cancelCreateFile.bind(this)
    this.moveFile = this.moveFile.bind(this)
    this.startDeleteFile = this.startDeleteFile.bind(this)
    this.cancelDeleteFile = this.cancelDeleteFile.bind(this)
    this.cancelMoveFile = this.cancelMoveFile.bind(this)
    this.startCreateDoc = this.startCreateDoc.bind(this)
  }

  componentWillMount() {
    const { match } = this.props;
    this.setState({
      pid: match.params.id
    });
    // console.log(getRoot());
    // const child = {folder: true, id: 211, name: "文件夹2-1-1",child:[]}
    // console.log(FileTree.insertNode(child, 21, getRoot()));
    // console.log(FileTree.deleteNode(21, getRoot()));
    // console.log(FileTree.moveNode(21, 1, getRoot()));
  }

  startCreateFile(index) {
    const { showCreateFile } = this.state
    console.log(index);
    if (index === 1) {
      this.setState({
        showCreateFile: !showCreateFile
      })
    }
  }

  startCreateDoc(index) {
    const { showCreateDocFile } = this.state
    if(index === 0) {
      window.location.href = "/edit"
    }
    if(index === 1) {
      this.setState({
        showCreateFile: !showCreateDocFile,
        showDleteFile: false
      })
    }
  }

  cancelCreateFile() {
    this.setState({
      showCreateFile: false,
      showCreateDocFile: false
    })
  }

  moveFile(id, pid) {
    console.log("id:",id,"pid:",pid);
    this.setState({
      showMoveFile: true
    })
  }

  startDeleteFile(id, pid) {
    console.log("id:",id,"pid:",pid);
    this.setState({
      showDleteFile: true,
      showCreateFile: false
    })
  }

  cancelDeleteFile() {
    this.setState({
      showDleteFile: false
    })
  }

  cancelMoveFile() {
    this.setState({
      showMoveFile: false
    })
  }

  render() {
    const { projectInfo, 
      fileOption,
      docOption,
      filesList,
      docList,
      pid,
      showCreateFile,
      showCreateDocFile,
      showDleteFile,
      showMoveFile,
      fileRoot
      } = this.state;
      
    return (
      <div className="projectDetail-container">
        <GoBack />
        <div className="projectDetail-content">
          <div className="projectDetail-header">
            <div className="projectDetail-header-left">
              <div className="projectDetail-header-intro">
                <div className="title">{projectInfo.name}</div>
                <div className="tip">{projectInfo.intro}</div>
              </div>
            </div>
            <div className="projectDetail-header-right">
              <div className="projectDetail-header-icon-container">
                <Icon
                  text={`${projectInfo.userCount}`}
                  tip="成员"
                  url="/member"
                />
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
            <div className="projectDetail-file-header">
              <div className="projectDetail-file-title">文件</div>
              <div className="projectDetail-file-select">
                <Select items={fileOption} onChange={this.startCreateFile} />
              </div>
            </div>
            <div className="projectDetail-file-items">
              {
                filesList.FolderList.map(
                  el => (
                    <div className="file-item" key={el.id}>
                      <FolderItem folderItem={el} pid={pid} moveFile={this.moveFile} deleteFile={this.startDeleteFile} /> 
                    </div>
                  )
                )
              }
              {
                filesList.FileList.map(
                  el =>  (
                    <div className="file-item" key={el.id}>
                      <FileItem fileItem={el} pid={pid} moveFile={this.moveFile} deleteFile={this.startDeleteFile} /> 
                    </div>
                  )
                )
              }
            </div>
            <div className="projectDetail-file-footer">
              <Link to={`/project/${pid}/allFile`} className="fakeBtn">
                查看所有文件
              </Link>
            </div>
          </div>
          
          <div className="projectDetail-file-container">
            <div className="projectDetail-file-header">
              <div className="projectDetail-file-title">文档</div>
              <div className="projectDetail-file-select">
                <Select items={docOption} onChange={this.startCreateDoc} />
              </div>
            </div>
            <div className="projectDetail-file-items">
              {/* {
                filesList.FolderList.map(
                  el => (
                    <div className="file-item" key={el.id}>
                      <FolderItem folderItem={el} pid={pid} moveFile={this.moveFile} deleteFile={this.startDeleteFile} /> 
                    </div>
                  )
                )
              }
              {
                filesList.FileList.map(
                  el =>  (
                    <div className="file-item" key={el.id}>
                      <FileItem fileItem={el} pid={pid} moveFile={this.moveFile} deleteFile={this.startDeleteFile} /> 
                    </div>
                  )
                )
              } */}
              {
                docList.FolderList.map(
                  el => (
                    <div className="file-item" key={el.id}>
                      <FolderItemDoc folderItem={el} pid={pid} moveFile={this.moveFile} deleteFile={this.startDeleteFile} />
                    </div>
                  )
                )
              }
              {
                docList.DocList.map(
                  el => (
                    <div className="file-item" key={el.id}>
                      <DocItem folderItem={el} pid={pid} moveFile={this.moveFile} deleteFile={this.startDeleteFile} />
                    </div>
                  )
                )
              }
            </div>
            <div className="projectDetail-file-footer">
              <Link to={`/project/${pid}/allDoc`} className="fakeBtn">
                查看所有文档
              </Link>
            </div>
          </div>
          {
            showCreateFile && (
              <div className="createFileAlert">
                <ReactSVG className="create-file-alert-icon" path={CreateFileAlertIcon} />
                <input className="create-file-alert-input" type="text" placeholder="编辑文件夹名" />
                <div className="create-file-alert-cancel">
                  <Button onClick={this.cancelCreateFile} text="取消" width="65" height="32" border="1px solid RGBA(217, 217, 217, 1)" bgColor="RGBA(255, 255, 255, 1)" textColor="RGBA(64, 64, 64, 1)" fontSize="14" />
                </div>
                <div className="create-file-alert-done">
                  <Button onClick={() => {}} text="确定" width="65" height="32" fontSize="14" />
                </div>
              </div>
            )
          }
          {
            showDleteFile && (
              <div className="deleteFileAlert">
                <div className="delete-file-alert-tip">
                  确认要删除该文件吗
                </div>
                <div className="delete-file-alert-cancel">
                  <Button onClick={this.cancelDeleteFile} text="取消" width="65" height="32" border="1px solid RGBA(217, 217, 217, 1)" bgColor="RGBA(255, 255, 255, 1)" textColor="RGBA(64, 64, 64, 1)" fontSize="14" />
                </div>
                <div className="delete-file-alert-done">
                  <Button onClick={() => {}} text="确定" width="65" height="32" fontSize="14" />
                </div>
              </div>
            )
          }
          {
            showMoveFile && (
              <div className="moveFileAlert">
                <div className="move-file-alert-tip">选择保存路径</div>
                <div className="move-file-tree-container">
                  <Scrollbars>
                    <FileTreeComponent 
                      root={fileRoot} 
                      select={() => {
                        const fileRootTemp = Object.assign({}, fileRoot)
                        fileRootTemp.selected = !fileRootTemp.selected
                        FileTree.initNodeSelected(fileRootTemp)
                        this.setState({
                          fileRoot: fileRootTemp
                        })
                      }}
                      finalSelect={el => {
                        const fileRootTemp = Object.assign({}, fileRoot)
                        FileTree.initNodeFinalSelected(fileRootTemp)
                        let fatherId
                        if (el.selected || el.router.length === 1) {
                          fatherId = el.id
                        }
                        else {
                          // 取消选中
                          fatherId = el.router[el.router.length-2]
                        }
                        const fatherNode = FileTree.searchNode(fatherId, fileRootTemp)
                        fatherNode.finalSelected = true
                        this.setState({
                          fileRoot: fileRootTemp
                        })
                      }}
                    />
                  </Scrollbars>
                </div>
                <div className="move-file-alert-cancel">
                  <Button onClick={this.cancelMoveFile} text="取消" width="65" height="32" border="1px solid RGBA(217, 217, 217, 1)" bgColor="RGBA(255, 255, 255, 1)" textColor="RGBA(64, 64, 64, 1)" fontSize="14" />
                </div>
                <div className="move-file-alert-done">
                  <Button onClick={() => {}} text="确定" width="65" height="32" fontSize="14" />
                </div>
              </div>
            )
          }
          {
            showCreateDocFile && (
              <div className="createFileAlert">
                <ReactSVG className="create-file-alert-icon" path={CreateFileAlertIcon} />
                <input className="create-file-alert-input" type="text" placeholder="编辑文件夹名" />
                <div className="create-file-alert-cancel">
                  <Button onClick={this.cancelCreateFile} text="取消" width="65" height="32" border="1px solid RGBA(217, 217, 217, 1)" bgColor="RGBA(255, 255, 255, 1)" textColor="RGBA(64, 64, 64, 1)" fontSize="14" />
                </div>
                <div className="create-file-alert-done">
                  <Button onClick={() => {}} text="确定" width="65" height="32" fontSize="14" />
                </div>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

ProjectDetailIndex.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  })
};

ProjectDetailIndex.defaultProps = {
  match: {}
};

export default ProjectDetailIndex;

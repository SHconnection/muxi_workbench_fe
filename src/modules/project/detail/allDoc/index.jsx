import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactSVG from "react-svg";
import { Scrollbars } from 'react-custom-scrollbars';
import FileTreeComponent from "../../components/fileTree/index";
import FileTree from "../../fileTree";
import GoBack from "../../../../components/common/goBack/index";
import Icon from "../../../../components/common/icon/index";
import Button from "../../../../components/common/button/index";
import Select from "../../../../components/common/select/index";
import FolderItemDoc from "../../components/folderItemDoc/index";
import DocItem from "../../components/docItem/index";
import FileList from "../../components/fileList/index";
import CreateFileAlertIcon from "../../../../assets/svg/commonIcon/editFileAlert.svg";
import "./index.css";
import "../../../../static/css/common.css";

class ProjectDetailAllFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pid: null,
      itemLayOut: true, 
      showCreateFile: false,
      showDleteFile: false,
      showMoveFile: false,
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
      },
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
      
    };
    this.changeLayoutToItem = this.changeLayoutToItem.bind(this);
    this.changeLayoutToList = this.changeLayoutToList.bind(this);
    this.startCreateDoc = this.startCreateDoc.bind(this);
    this.cancelCreateFile = this.cancelCreateFile.bind(this);
    this.startDeleteFile = this.startDeleteFile.bind(this);
    this.cancelDeleteFile = this.cancelDeleteFile.bind(this);
    this.moveFile = this.moveFile.bind(this);
    this.cancelMoveFile = this.cancelMoveFile.bind(this);
  }

  componentWillMount() {
    const { match } = this.props;
    this.setState({
      pid: match.params.id
    });
    console.log(match);
  }

  startCreateFile(index) {
    const { showCreateFile } = this.state
    console.log(index);
    if (index === 1) {
      this.setState({
        showCreateFile: !showCreateFile,
        showDleteFile: false
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
    })
  }

  startDeleteFile(id) {
    console.log(id);
    this.setState({
      showDleteFile: true
    })
  }

  cancelDeleteFile() {
    this.setState({
      showDleteFile: false
    })
  }

  changeLayoutToItem() {
    this.setState({
      itemLayOut: true
    })
  }

  changeLayoutToList() {
    this.setState({
      itemLayOut: false
    })
  }

  moveFile(id, pid) {
    console.log("id:",id,"pid:",pid);
    this.setState({
      showMoveFile: true
    })
  }

  cancelMoveFile() {
    this.setState({
      showMoveFile: false
    })
  }

  render() {
    const { pid, 
      docOption, 
      itemLayOut, 
      docList, 
      showCreateFile, 
      showDleteFile, 
      showMoveFile 
    } = this.state;
    return (
      <div className="projectDetail-container">
        <GoBack />
        <div className="projectDetail-content">
          <div className="projectDetail-header projectDetail-allFile-header">
            <div className="projectDetail-header-left">
              <div className="title">所有文档</div>
              <div className="projectDetail-header-left-select">
                <Select items={docOption} onChange={this.startCreateDoc} />
              </div>
            </div>
            <div className="projectDetail-header-right projectDetail-allFile-header-right">
              <div>
                <Icon type={itemLayOut ? "FileItemsSel" : "FileItems"} onClick={this.changeLayoutToItem} />
              </div>
              <div>
                <Icon type={itemLayOut ? "FileLists" : "FileListSel"} onClick={this.changeLayoutToList} />
              </div>
              <div>
                <Button text="批量管理" to="./file_batch_manage" />
              </div>
            </div>
          </div>
          {
            itemLayOut ? (
              <div className="projectDetail-file-items peojectDetail-allFile-items">
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
            ) : (
              <div className="projectDetail-allFile-list">
                <div className="projectDetail-allFile-list-title">
                  <div className="projectDetail-allFile-list-name">文件名称</div>
                  <div className="projectDetail-allFile-list-uploader">上传者</div>
                  <div className="projectDetail-allFile-list-time">上传时间</div>
                  <div className="projectDetail-allFile-list-url">路径</div>
                </div>
                {
                  docList.DocList.map(el => (
                    <div key={el.id}>
                      <FileList item={el} moveFile={this.moveFile} deleteFile={this.startDeleteFile} />
                    </div>
                  ))
                }
              </div>
            )
          }
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
                  <FileTreeComponent root={FileTree.root} />
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

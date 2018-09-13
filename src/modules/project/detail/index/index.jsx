import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";
import Icon from "../../../../components/common/icon/index";
import Button from "../../../../components/common/button/index"
import Select from "../../../../components/common/select/index";
import FileIcon from "../../components/fileIcon/index";
import CreateFileAlertIcon from "../../../../assets/svg/commonIcon/editFileAlert.svg"
import "./index.css";
import "../../../../static/css/common.css";

class ProjectDetailIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pid: null,
      showCreateFile: false,
      showDleteFile: false,
      projectInfo: {
        name: "项目名称",
        intro: "这是简介这是简介这是简介",
        userCount: 58
      },
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
      folderList: {
        fList: [
          {
            kind: 2,
            id: 0,
            name: "文件夹1"
          },
          {
            kind: 1,
            id: 1,
            name: "文件夹2.zip"
          },
          {
            kind: 1,
            id: 2,
            name: "文件3.psd"
          },
          {
            kind: 1,
            id: 3,
            name: "文件4.pdf"
          },
          {
            kind: 1,
            id: 4,
            name: "文件夹5.txt"
          },
          {
            kind: 1,
            id: 5,
            name: "文件夹6.rar"
          }
        ],
        mList: [
          {
            kind: 2,
            id: 0,
            name: "文件夹1"
          },
          {
            kind: 1,
            id: 1,
            name: "文档1"
          },
          {
            kind: 2,
            id: 2,
            name: "文件夹2"
          },
          {
            kind: 2,
            id: 3,
            name: "文件夹3"
          },
          {
            kind: 2,
            id: 4,
            name: "文件夹4"
          }
        ]
      }
    };
    this.startCreateFile = this.startCreateFile.bind(this)
    this.cancelCreateFile = this.cancelCreateFile.bind(this)
    this.moveFile = this.moveFile.bind(this)
    this.startDeleteFile = this.startDeleteFile.bind(this)
    this.cancelDeleteFile = this.cancelDeleteFile.bind(this)
  }

  componentWillMount() {
    const { match } = this.props;
    this.setState({
      pid: match.params.id
    });
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

  cancelCreateFile() {
    this.setState({
      showCreateFile: false,
    })
  }

  moveFile(id) {
    console.log(id);
  }

  startDeleteFile(id) {
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

  render() {
    const { projectInfo, fileOption, folderList, pid, showCreateFile, showDleteFile } = this.state;
    return (
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
          <div className="peojectDetail-file-header">
            <div className="title littleSize">文件</div>
            <div className="projectDetail-file-select">
              <Select items={fileOption} onChange={this.startCreateFile} />
            </div>
          </div>
          <div className="projectDetail-file-items">
            {folderList.fList.map(el => (
              <div className="file-item" key={el.id}>
                <FileIcon name={el.name} id={el.id} pid={pid} kind={el.kind} moveFile={this.moveFile} deleteFile={this.startDeleteFile} />
              </div>
            ))}
          </div>
          <div className="projectDetail-file-footer">
            <Link to={`/project/${pid}/allFile`} className="fakeBtn">
              查看所有文件
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

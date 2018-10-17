import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MessageService from "../../../../service/message";
import fileService from "../../../../service/file";
import { FileTree } from "../../fileTree1";
import Goback from "../../../../components/common/goBack/index";
import FileIcon from "../../components/fileIcon/index";
import "../../../../static/css/common.css";
import "./index.css"


class DocPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pid: undefined,
      id: undefined,
      isFocus: false,
      fileInfo: {
        name: "",
        url: ""
      },
      createTime: "",
      creator: "",
      fileUrl: []
    };
    this.getFileInfo = this.getFileInfo.bind(this);
    this.isFocus = this.isFocus.bind(this);
    this.getFileTree = this.getFileTree.bind(this);
    this.getFileUrl = this.getFileUrl.bind(this);
    this.focusFile = this.focusFile.bind(this);

  }

  componentWillMount() {
    const { match } = this.props
    this.setState({
      pid: parseInt(match.params.pid, 0),
      id: parseInt(match.params.id, 0)
    })
    this.getFileInfo()
    this.getFileTree()
    this.isFocus()
  }

  // 请求该文件的详情信息
  getFileInfo() {
    const { match } = this.props;
    const postData = {
      folder: [],
      file: [parseInt(match.params.id, 0)]
    }
    fileService.getFileList(postData)
      .then(res => {
        const { creator } = res.FileList[0]
        const reg = /^(\d{4})-(\d{1,2})-(\d{1,2})$/
        const timeArr = res.FileList[0].create_time.slice(0, 10).match(reg)
        const timeStr = `${timeArr[1]}年${timeArr[2]}月${timeArr[3]}日`
        this.setState({
          fileInfo: res.FileList[0],
          createTime: timeStr,
          creator
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

  // 请求该文件所在的树
  getFileTree() {
    const { match } = this.props
    const pid = parseInt(match.params.pid, 0)
    const id = parseInt(match.params.id, 0)
    FileTree.getFileTree(pid)
      .then(el => {
        this.getFileUrl(id, el)
      })
      .catch(error => {
        console.error(error)
      })
  }

  // 算出文件的路径
  getFileUrl(id, tree) {
    // 找到文件所在节点
    const node = FileTree.searchNode(id, tree)
    if (node) {
      if (node.router.length) {
        const fileIdUrl = JSON.parse(JSON.stringify(node.router))
        fileIdUrl.pop()
        fileIdUrl.shift()
        const postData = {
          folder: fileIdUrl.map(el => parseInt(el, 0)),
          file: []
        }
        fileService.getFileList(postData)
          .then(res => {
            let fileUrl = `路径：${tree.name}`
            if (res.FolderList.length) {
              fileUrl += `${res.FolderList.map(el => ` - ${el.name}`).reduce((el1, el2) => el1 + el2)}`
            }
            this.setState({
              fileUrl
            })
          })
          .catch(err => {
            console.error(err)
          })
      }
    }
  }

  // 查看我是否关注
  isFocus() {
    const { match } = this.props;
    const { isFocus } = this.state
    MessageService.getMyAttentionFiles(match.params.id)
    .then(res => {
      console.log(res)
    })
    .catch(error => {
      console.error(error)
    })
  }

  // 关注文件
  focusFile() {
    const { id } = this.state
    MessageService.notFocusOnFile(id)
    .then(res => {
      console.log(res)
    })
    .catch(error => {
      console.error(error)
    })
  }

  render() {
    const {
      fileInfo,
      fileUrl,
      creator,
      createTime
    } = this.state
    return (
      <div className="projectDetail-container">
        <Goback />
        <div className="filePreview-content">
          <div className="filePreview-header-url">
            {fileUrl}
          </div>
          {/*  头部 */}
          <div className="filePreview-header">
            {/* 头部左边 */}
            <div className="filePreview-header-left">
              <FileIcon fileItem={fileInfo} />
              <div className="filePreview-header-fileInfo">
                <div className="filePreview-header-fileName">
                  {fileInfo.name}
                </div>
                <div className="filePreview-header-fileUpdator">
                  {creator}
                  &nbsp;
                  {createTime}
                  上传
                </div>
                <a className="filePreview-onLine" href={fileInfo.url} target="_blank" rel="noopener noreferrer">
                  在线预览
                </a>
              </div>
            </div>
            {/* 头部右边 */}
            <div className="filePreview-header-right">
              <div onClick={this.focusFile} onMouseDown={() => {}} role="presentation">关注</div>
              {/* <div>编辑</div> */}
              <a
                href={`${fileInfo.url}?attname=${fileInfo.name}`}
                download={fileInfo.name}
              >
                下载
              </a>
            </div>
          </div>
          <hr className="status-detail-line" />
        </div>
      </div>
    );
  }
}

DocPreview.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  })
};

DocPreview.defaultProps = {
  match: {}
};

export default DocPreview;

import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactSVG from "react-svg";
import { Link } from "react-router-dom";
import fileService from "../../../../service/file";
import { FileTree } from "../../fileTree1";
import Goback from "../../../../components/common/goBack/index";
import FolderIcon from "../../../../assets/svg/fileIcon/folder.svg";
import PdfIcon from "../../../../assets/svg/fileIcon/pdf.svg";
import PsdIcon from "../../../../assets/svg/fileIcon/psd.svg";
import TxtIcon from "../../../../assets/svg/fileIcon/txt.svg";
import ZipIcon from "../../../../assets/svg/fileIcon/zip.svg";
import RarIcon from "../../../../assets/svg/fileIcon/rar.svg";
import DefaultIcon from "../../../../assets/svg/fileIcon/default.svg";
import "../../../../static/css/common.css";

const IconMap = {
  folder: FolderIcon,
  pdf: PdfIcon,
  PDF: PdfIcon,
  psd: PsdIcon,
  zip: ZipIcon,
  rar: RarIcon,
  PSD: PsdIcon,
  txt: TxtIcon,
  TXT: TxtIcon,
  ZIP: ZipIcon,
  RAR: RarIcon,
  default: DefaultIcon
};

class DocPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pid: undefined,
      id: undefined,
      fileInfo: {},
      isImage: false,
      imgStyle: "",
      suffix: "",
      createTime: "",
      creator: "",
      fileUrl: []
    };
    this.getFileInfo = this.getFileInfo.bind(this);
    this.getFileTree = this.getFileTree.bind(this);
    this.getFileUrl = this.getFileUrl.bind(this);
  }

  componentWillMount() {
    const { match } = this.props
    this.setState({
      pid: parseInt(match.params.pid, 0),
      id: parseInt(match.params.id, 0)
    })
    this.getFileInfo()
    this.getFileTree()
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
        const { creator, name, url } = res.FileList[0]
        let suffix = name.split(".")[1] || "default";
        if (suffix === "jpg" || suffix === "png") {
          const imgStyle = {
            width: "135px",
            height: "86px",
            background: `url(${url}) no-repeat center / contain`
          }
          this.setState({
            isImage: true,
            imgStyle
          });
        }
        if (IconMap[suffix] == null) {
          suffix = "default";
        }
        const reg = /^(\d{4})-(\d{1,2})-(\d{1,2})$/
        const timeArr = res.FileList[0].create_time.slice(0, 10).match(reg)
        const timeStr = `${timeArr[1]}年${timeArr[2]}月${timeArr[3]}日`
        this.setState({
          fileInfo: res.FileList[0],
          suffix,
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

  render() {
    const {
      fileInfo,
      isImage,
      imgStyle,
      suffix,
      fileUrl,
      creator,
      createTime
    } = this.state
    return (
      <div className="projectDetail-container">
        <Goback />
        <div className="projectDetail-content">
          {/*  头部 */}
          <div className="filePreview-header">
            <div className="filePreview-header-left">
              <div className="filePreview-header-url">
                {fileUrl}
              </div>
              <div className="filePreview-header-icon">
                {!isImage && (
                  <ReactSVG className="fileIcon-img" path={IconMap[suffix]} />
                )}
                {isImage && (
                  <div className="fileIcon-img">
                    <div style={imgStyle} />
                  </div>
                )}
              </div>
              
              
              <br />
              {fileInfo.name}
              <br />
              {creator}
              &nbsp;
              {createTime}
              上传
            </div>
            <div className="filePreview-header-right">
              <span>关注</span>
              <span>下载</span>
            </div>
          </div>

        </div>
        <hr className="status-detail-line" />
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

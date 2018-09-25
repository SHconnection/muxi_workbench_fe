import React, {Component} from 'react';
import ReactSVG from "react-svg";
import PropTypes from "prop-types";
import "./index.css";
import FolderIcon from "../../../../assets/svg/fileIcon/folder.svg";
import PdfIcon from "../../../../assets/svg/fileIcon/pdf.svg";
import PsdIcon from "../../../../assets/svg/fileIcon/psd.svg";
import TxtIcon from "../../../../assets/svg/fileIcon/txt.svg";
import ZipIcon from "../../../../assets/svg/fileIcon/zip.svg";
import RarIcon from "../../../../assets/svg/fileIcon/rar.svg";
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
  RAR: RarIcon
}

class FileItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  enter() {
    this.setState({
      hover: true,
    })
  }

  leave() {
    this.setState({
      hover: false,
    })
  }

  deleteFile() {
    const { fileItem, deleteFile, pid } = this.props
    deleteFile(fileItem.id, pid)
  }

  moveFile() {
    const { fileItem, moveFile, pid } = this.props
    moveFile(fileItem.id, pid)
  }

  render() {
    const { fileItem } = this.props
    const { hover } = this.state
    
    const suffix = fileItem.name.split('.')[1] || "folder"
    return (
      <div className="fileIcon-container" onMouseEnter={this.enter.bind(this)} onMouseLeave={this.leave.bind(this)}>
        <div className="fileItem-content">
          <ReactSVG className="fileIcon-img" path={IconMap[suffix]} />
          <div className="fileIcon-text">{fileItem.name}</div>
        </div>
        
        {hover && 
          (
            <div className="fileIcon-footer" onMouseLeave={this.leave.bind(this)}>
              <a className="fileIcon-downland" href={fileItem.url} download={fileItem.name}>下载</a>
              <div onClick={this.moveFile.bind(this)} onKeyDown={() => {}} role="presentation">移动</div>
              <div onClick={this.deleteFile.bind(this)} onKeyDown={() => {}} role="presentation">删除</div>
            </div>
          )
        }
      </div>
    )
  }
}

FileItem.propTypes = {
  fileItem: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    name: PropTypes.string,
    creator: PropTypes.string,
    url: PropTypes.string,
    create_time: PropTypes.string
  }),
  pid: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  moveFile: PropTypes.func,
  deleteFile: PropTypes.func
}

FileItem.defaultProps = {
  fileItem: {
    id: "",
    name: "",
    creator: "",
    url: "",
    create_time: ""
  },
  pid: "",
  moveFile: () => {},
  deleteFile: () => {}
}

export default FileItem;
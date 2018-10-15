import React, {Component} from 'react';
import ReactSVG from "react-svg";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./index.css";
import FolderIcon from "../../../../assets/svg/fileIcon/folder.svg";
import PdfIcon from "../../../../assets/svg/fileIcon/pdf.svg";
import PsdIcon from "../../../../assets/svg/fileIcon/psd.svg";
import TxtIcon from "../../../../assets/svg/fileIcon/txt.svg";
import ZipIcon from "../../../../assets/svg/fileIcon/zip.svg";
import RarIcon from "../../../../assets/svg/fileIcon/rar.svg";
// import DocFolder from "../../../../assets/svg/fileIcon/docFolder.svg";
// import Doc from "../../../../assets/svg/fileIcon/doc.svg";
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
}

// const FileIcon = props => {
  // const { name, id, pid } = props;
  // const suffix = name.split('.')[1] || "folder";
  // return (
  //   <Link className="fileIcon-container" to={`/project/${pid}/file/${id}`}>
  //     <ReactSVG className="fileIcon-img" path={IconMap[suffix]} />
  //     <div className="fileIcon-text">{name}</div>
  //   </Link>
  // )
// }

class FileIcon extends Component {
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
    const { id, deleteFile } = this.props
    deleteFile(id)
  }

  moveFile() {
    const { id, moveFile } = this.props
    moveFile(id)
  }

  render() {
    const { name, id, pid, kind } = this.props;
    const { hover } = this.state
    const suffix = name.split('.')[1] || "folder";
    return (
      <div className="fileIcon-container" onMouseEnter={this.enter.bind(this)} onMouseLeave={this.leave.bind(this)}>
        <Link className="fileIcon-content" to={`/project/${pid}/file/${id}`}>
          <ReactSVG className="fileIcon-img" path={IconMap[suffix]} />
          <div className="fileIcon-text">{name}</div>
        </Link>
        {hover && 
          (
            <div className="fileIcon-footer" onMouseLeave={this.leave.bind(this)}>
              {(kind === 1) && (<div>下载</div>) }
              <div onClick={this.moveFile.bind(this)} onKeyDown={() => {}} role="presentation">移动</div>
              <div onClick={this.deleteFile.bind(this)} onKeyDown={() => {}} role="presentation">删除</div>
            </div>
          )
        }
      </div>
      
    )
  }
}

FileIcon.propTypes = {
  name: PropTypes.string,
  kind: PropTypes.number,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  pid: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  moveFile: PropTypes.func,
  deleteFile: PropTypes.func
};

FileIcon.defaultProps = {
  name: "",
  kind: 0,
  id: "",
  pid: "",
  moveFile: () => {},
  deleteFile: () => {}
};

export default FileIcon
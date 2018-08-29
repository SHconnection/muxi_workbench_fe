import React, {Component} from 'react';
import ReactSVG from "react-svg";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./index.css";
import FolderIcon from "../../../../assets/svg/fileIcon/folder.svg"
import PdfIcon from "../../../../assets/svg/fileIcon/pdf.svg"
import PsdIcon from "../../../../assets/svg/fileIcon/psd.svg"
import TxtIcon from "../../../../assets/svg/fileIcon/txt.svg"
import ZipIcon from "../../../../assets/svg/fileIcon/zip.svg"
import RarIcon from "../../../../assets/svg/fileIcon/rar.svg"

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

  onMouseEnter(e){
    console.log("haha")
    this.setState({
      hover: true,
    });
  }

  onMouseLeave(){
    this.setState({
      hover: false,
    })
  }

  enter(event) {
    this.setState({
      hover: true,
    })
  }

  leave(event) {
    this.setState({
      hover: false,
    })
  }

  render() {
    const { name, id, pid } = this.props;
    const { hover } = this.state
    const suffix = name.split('.')[1] || "folder";
    return (
      <div onMouseEnter={this.enter.bind(this)} onMouseLeave={this.leave.bind(this)}>
        <Link className="fileIcon-container" to={`/project/${pid}/file/${id}`}>
          <ReactSVG className="fileIcon-img" path={IconMap[suffix]} />
          <div className="fileIcon-text">{name}</div>
        </Link>
        {hover && 
          (
            <div className="fileIcon-footer">移动</div>
          )
        }
      </div>
      
    )
  }
}

FileIcon.propTypes = {
  name: PropTypes.string,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  pid: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

FileIcon.defaultProps = {
  name: "",
  id: "",
  pid: ""
};

export default FileIcon
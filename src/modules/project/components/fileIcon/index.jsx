import React, { Component } from "react";
import ReactSVG from "react-svg";
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
};

let imgStyle;

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
      // isImage: false
    };
  }

  render() {
    const { fileItem } = this.props;
    let suffix = fileItem.name.split(".")[1];
    if (suffix === "jpg" || suffix === "png") {
      imgStyle = {
        width: "135px",
        height: "86px",
        background: `url(${fileItem.url}) no-repeat center / contain`
      };
      return (
        <div className="fileIcon-container">
          <div className="fileIcon-img">
            <div style={imgStyle} />
          </div>
        </div>
      );
    }
    if (IconMap[suffix] == null) {
      suffix = "default";
    }
    return (
      <div className="fileIcon-container">
        <div className="fileIcon-img">
          <ReactSVG className="fileIcon-img" path={IconMap[suffix]} />
        </div>
      </div>
    );
  }
}

FileIcon.propTypes = {
  fileItem: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string
  })
};

FileIcon.defaultProps = {
  fileItem: {
    name: "",
    url: ""
  }
};

export default FileIcon;

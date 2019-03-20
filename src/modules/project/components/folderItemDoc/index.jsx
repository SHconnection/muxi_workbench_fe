import React, { Component } from "react";
import ReactSVG from "react-svg";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import DocFolderIcon from "assets/svg/fileIcon/docFolder.svg";
import "./index.scss";
import "static/css/common.scss";

class FolderItemDoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  enter() {
    this.setState({
      hover: true
    });
  }

  leave() {
    this.setState({
      hover: false
    });
  }

  deleteFile() {
    const { folderItem, deleteFile, pid } = this.props;
    deleteFile(folderItem.id, "docFolder", pid);
  }

  moveFile() {
    const { folderItem, moveFile, pid } = this.props;
    moveFile(folderItem.id, "docFolder", pid);
  }

  render() {
    const { folderItem, pid } = this.props;
    const { hover } = this.state;
    return (
      <div
        onMouseEnter={this.enter.bind(this)}
        onMouseLeave={this.leave.bind(this)}
      >
        <Link
          className="doc-fileIcon-content"
          to={`/project/${pid}/docFolder/${folderItem.id}`}
        >
          <ReactSVG className="doc-fileIcon-img" path={DocFolderIcon} />
          <div className="fileIcon-text">{folderItem.name}</div>
        </Link>
        {hover && (
          <div
            className="folderIcon-footer"
            onMouseLeave={this.leave.bind(this)}
          >
            <div
              onClick={this.moveFile.bind(this)}
              onKeyDown={() => {}}
              role="presentation"
            >
              移动
            </div>
            <div
              onClick={this.deleteFile.bind(this)}
              onKeyDown={() => {}}
              role="presentation"
            >
              删除
            </div>
          </div>
        )}
      </div>
    );
  }
}

FolderItemDoc.propTypes = {
  folderItem: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  pid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  moveFile: PropTypes.func,
  deleteFile: PropTypes.func
};

FolderItemDoc.defaultProps = {
  folderItem: {
    name: "",
    id: ""
  },
  pid: "",
  moveFile: () => {},
  deleteFile: () => {}
};

export default FolderItemDoc;

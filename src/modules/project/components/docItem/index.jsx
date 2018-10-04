import React, { Component } from "react";
import ReactSVG from "react-svg";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import DocIcon from "../../../../assets/svg/fileIcon/doc.svg";
import "./index.css";
import "../../../../static/css/common.css";

class DocItem extends Component {
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
    deleteFile(folderItem.id, pid);
  }

  moveFile() {
    const { folderItem, moveFile, pid } = this.props;
    moveFile(folderItem.id, pid);
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
          className="docItem-content"
          to={`/project/${pid}/doc/${folderItem.id}`}
        >
          <ReactSVG className="doc-fileIcon-img" path={DocIcon} />
          <div className="fileIcon-text">{folderItem.name}</div>
        </Link>
        {hover && (
          <div className="fileIcon-footer" onMouseLeave={this.leave.bind(this)}>
            <a
              className="fileIcon-downland"
              href={folderItem.name}
              download={folderItem.name}
            >
              下载
            </a>
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

DocItem.propTypes = {
  folderItem: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    lastcontent: PropTypes.string
  }),
  pid: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  moveFile: PropTypes.func,
  deleteFile: PropTypes.func
};

DocItem.defaultProps = {
  folderItem: {
    id: "",
    name: "",
    lastcontent: ""
  },
  pid: "",
  moveFile: () => {},
  deleteFile: () => {}
};

export default DocItem;

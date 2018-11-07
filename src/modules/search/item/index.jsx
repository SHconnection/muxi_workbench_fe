import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import FileIcon from "../../project/components/fileIcon/index";
import FileService from "../../../service/file";
import "./index.css";

class SearchItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileInfo: {
        name: "",
        url: ""
      }
    };
    this.getFileInfo = this.getFileInfo.bind(this);
  }

  componentWillMount() {
    const { item } = this.props;
    if (item.kind === 1) {
      this.getFileInfo(); // 请求文件信息以得到详细信息 url
    }
  }

  // 请求该文件的详情信息
  getFileInfo() {
    const { item } = this.props;
    const id = item.sourceID;
    const postData = {
      folder: [],
      file: [id]
    };
    FileService.getFileList(postData)
      .then(res => {
        this.setState({
          fileInfo: res.FileList[0]
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const { item } = this.props;
    const { fileInfo } = this.state;
    return (
      <div className="search-item-content">
        {!item.kind ? (
          <div className="search-item-content">
            <div className="search-item-name">{item.recordName}</div>
            <div className="search-item-text">
              {item.creator}
              &nbsp;&#160;-&nbsp;&#160;
              {item.intro}
            </div>
          </div>
        ) : (
          <div className="search-item-content">
            <FileIcon fileItem={fileInfo} />
            <Link
              to={`/project/${item.projectID}/file/${item.sourceID}`}
              className="search-item-filename"
            >
              {item.recordName}
            </Link>
            <div className="search-item-filecreator">{item.creator}</div>
          </div>
        )}
      </div>
    );
  }
}
SearchItem.propTypes = {
  item: PropTypes.shape({})
};
SearchItem.defaultProps = {
  item: {}
};
export default SearchItem;

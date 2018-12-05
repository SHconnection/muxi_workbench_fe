import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import FileIcon from "../../project/components/fileIcon/index";
import WrongPage from "../../../components/common/wrongPage/wrongPage";
import FileService from "../../../service/file";
import "./index.css";

class SearchItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileInfo: {
        name: "",
        url: ""
      },
      docConetnt: "",
      wrong: {}
    };
    this.getFileInfo = this.getFileInfo.bind(this);
    this.getDocConnent = this.getDocConnent.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentWillMount() {
    const { item } = this.props;
    if (item.kind === 1) {
      this.getFileInfo(); // 请求文件信息以得到详细信息 url
    } else {
      // 获取文档内容
      this.getDocConnent();
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
      .catch(error => {
        this.setState({ wrong: error });
      });
  }

  // 请求文档的内容
  getDocConnent() {
    const { item } = this.props;
    const id = item.sourceID;
    FileService.getDocConnent(id)
      .then(res => {
        this.setState({
          docConetnt: res.content
        });
      })
      .catch(error => {
        this.setState({ wrong: error });
      });
  }

  cancel() {
    this.setState({ wrong: {} });
  }

  render() {
    const { item } = this.props;
    const { fileInfo, docConetnt, wrong } = this.state;
    return (
      <div className="search-item-content">
        {!item.kind ? (
          <div className="search-item-content">
            <Link
              to={`/project/${item.projectID}/doc/${item.sourceID}`}
              className="search-item-name"
            >
              {item.recordName}
            </Link>
            <div className="search-item-text">
              {item.creator}
              &nbsp;&#160;-&nbsp;&#160;
              {docConetnt}
            </div>
          </div>
        ) : (
          <div className="search-item-file">
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
        <WrongPage info={wrong} cancel={this.cancel} />
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

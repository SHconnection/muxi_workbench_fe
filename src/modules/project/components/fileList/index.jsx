import React from "react";
import PropTypes from "prop-types";
import "./index.css";

function FileList(props) {
  const { item, downloadFile, deleteFile, moveFile, fileToTop} = props
  return (
    <div className="project-fileList-container">
      <div className="project-fileList-left">
        <div className="project-fileList-name">{item.name}</div>
        <div className="project-fileList-uploader">{item.uploader}</div>
        <div className="project-fileList-time">{item.time}</div>
        <div className="project-fileList-url">{item.url}</div>
      </div>
      <div className="project-fileList-right">
        <div onClick={() => {downloadFile(item.id)}} onKeyDown={() => {}} role="presentation">下载</div>
        <div onClick={() => {deleteFile(item.id)}} onKeyDown={() => {}} role="presentation">删除</div>
        <div>移动</div>
        <div>置顶</div>
      </div>
    </div>
  )
}

FileList.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    uploader: PropTypes.string,
    time: PropTypes.string,
    url: PropTypes.string,
  }),
  downloadFile: PropTypes.func,
  deleteFile: PropTypes.func,
}

FileList.defaultProps = {
  item: {
    id: null,
    name: "",
    uploader: "",
    time: "",
    url: ""
  },
  downloadFile: () => {},
  deleteFile: () => {}
}

export default FileList;

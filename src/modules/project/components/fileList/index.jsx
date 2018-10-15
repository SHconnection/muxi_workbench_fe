import React from "react";
import PropTypes from "prop-types";
import "./index.css";

function FileList(props) {
  const { item, deleteFile, moveFile, fileToTop} = props
  return (
    <div className="project-fileList-container">
      <div className="project-fileList-left">
        <div className="project-fileList-name">{item.name}</div>
        <div className="project-fileList-uploader">{item.creator}</div>
        <div className="project-fileList-time">{item.create_time}</div>
        <div className="project-fileList-url">{item.url}</div>
      </div>
      <div className="project-fileList-right">
        <a className="project-fileList-download" href={item.url} download={item.name}>下载</a>
        {/* <div onClick={() => {downloadFile(item.id)}} onKeyDown={() => {}} role="presentation">下载</div> */}
        <div onClick={() => {deleteFile(item.id)}} onKeyDown={() => {}} role="presentation">删除</div>
        <div onClick={() => {moveFile(item.id)}} onKeyDown={() => {}} role="presentation">移动</div>
        <div onClick={() => {fileToTop(item.id)}} onKeyDown={() => {}} role="presentation">置顶</div>
      </div>
    </div>
  )
}

FileList.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    creator: PropTypes.string,
    create_time: PropTypes.string,
    url: PropTypes.string,
  }),
  downloadFile: PropTypes.func,
  deleteFile: PropTypes.func,
  moveFile: PropTypes.func,
  fileToTop: PropTypes.func
}

FileList.defaultProps = {
  item: {
    id: null,
    name: "",
    creator: "",
    create_time: "",
    url: ""
  },
  downloadFile: () => {},
  deleteFile: () => {},
  moveFile: () => {},
  fileToTop: () => {}
}

export default FileList;

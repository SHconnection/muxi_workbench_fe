import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

function FileList(props) {
  const { item, index, fileUrl, deleteFile, moveFile, fileToTop } = props;
  const createTimeArray = item.create_time.split(/\D/);
  return (
    <div className="project-fileList-container">
      <div className="project-fileList-left">
        <div title={item.name} className="project-fileList-name">
          {item.name}
        </div>
        <div className="project-fileList-uploader">{item.creator}</div>
        <div className="project-fileList-time">
          {`${createTimeArray[0]}/${createTimeArray[1]}/${createTimeArray[2]}`}
        </div>
        <div title={fileUrl} className="project-fileList-url">
          {fileUrl}
        </div>
      </div>
      <div className="project-fileList-right">
        <a
          className="project-fileList-download"
          href={`${item.url}?attname=${item.name}`}
          download={item.name}
        >
          下载
        </a>
        {/* <div onClick={() => {downloadFile(item.id)}} onKeyDown={() => {}} role="presentation">下载</div> */}
        <div
          onClick={() => {
            deleteFile(item.id);
          }}
          onKeyDown={() => {}}
          role="presentation"
        >
          删除
        </div>
        <div
          onClick={() => {
            moveFile(item.id);
          }}
          onKeyDown={() => {}}
          role="presentation"
        >
          移动
        </div>
        <div
          onClick={() => {
            fileToTop(index);
          }}
          onKeyDown={() => {}}
          role="presentation"
        >
          置顶
        </div>
      </div>
    </div>
  );
}

FileList.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    creator: PropTypes.string,
    create_time: PropTypes.string,
    url: PropTypes.string
  }),
  index: PropTypes.number,
  fileUrl: PropTypes.string,
  deleteFile: PropTypes.func,
  moveFile: PropTypes.func,
  fileToTop: PropTypes.func
};

FileList.defaultProps = {
  item: {
    id: null,
    name: "",
    creator: "",
    create_time: "",
    url: ""
  },
  index: 0,
  fileUrl: "",
  deleteFile: () => {},
  moveFile: () => {},
  fileToTop: () => {}
};

export default FileList;

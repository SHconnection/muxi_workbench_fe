import React, { Component } from "react";
import PropTypes from "prop-types";
import "./index.css";
import "../../../../static/css/common.css";

class FileListBatch extends Component {
  constructor(props) {
    super(props);
    const { item } = this.props;
    this.state = {
      createTimeArray: item.create_time.split(/\D/)
    };
    // this.check = this.check.bind(this)
  }

  // check(id, index) {
  //   // const { checked } = this.state
  //   const { check } = this.props
  //   // this.setState({
  //   //   checked: !checked
  //   // })
  //   console.log(index)
  //   check(id, index)
  // }

  render() {
    const { item, index, fileUrl, check } = this.props;
    const { createTimeArray } = this.state;
    return (
      <div className="project-fileList-container">
        <div className="project-fileList-left">
          <div title={item.name} className="project-fileList-name">
            {item.name}
          </div>
          <div className="project-fileList-uploader">{item.creator}</div>
          <div className="project-fileList-time">
            {`${createTimeArray[0]}/${createTimeArray[1]}/${
              createTimeArray[2]
            }`}
          </div>
          <div title={fileUrl} className="project-fileList-url">
            {fileUrl}
          </div>
        </div>
        <div
          className="project-fileList-batch-right"
          // onClick={() => {check(item.id, index)}}
          // onKeyDown={() => {}}
          // role="presentation"
        >
          <input
            type="checkbox"
            checked={item.checked}
            onChange={() => {
              check(item.id, index);
            }}
            id={`fileCheck-${item.id}`}
          />
          <label htmlFor={`fileCheck-${item.id}`}>{}</label>
        </div>
      </div>
    );
  }
}

FileListBatch.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    creator: PropTypes.string,
    create_time: PropTypes.string,
    url: PropTypes.string,
    checked: PropTypes.bool
  }),
  index: PropTypes.number,
  fileUrl: PropTypes.string,
  check: PropTypes.func
};

FileListBatch.defaultProps = {
  item: {
    id: null,
    name: "",
    creator: "",
    create_time: "",
    url: "",
    checked: false
  },
  index: 0,
  fileUrl: "",
  check: () => {}
};

export default FileListBatch;

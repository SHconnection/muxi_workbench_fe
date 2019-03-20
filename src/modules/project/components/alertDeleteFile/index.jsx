import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "components/common/button/index";
import "static/css/common.scss";

class AlertDeleteFile extends Component {
  constructor(props) {
    super(props);
    this.cancel = this.cancel.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
  }

  cancel() {
    const { cancel } = this.props;
    cancel();
  }

  confirmDelete() {
    const { confirmDelete } = this.props;
    confirmDelete();
  }

  render() {
    const { type } = this.props;
    return (
      <div className="alertLayer">
        <div className="deleteFileAlert">
          <div className="delete-file-alert-tip">{`确认要删除该${type}吗`}</div>
          <div className="delete-file-alert-cancel">
            <Button
              onClick={this.cancel}
              text="取消"
              width="65"
              height="32"
              border="1px solid RGBA(217, 217, 217, 1)"
              bgColor="RGBA(255, 255, 255, 1)"
              textColor="RGBA(64, 64, 64, 1)"
              fontSize="14"
            />
          </div>
          <div className="delete-file-alert-done">
            <Button
              onClick={this.confirmDelete}
              text="确定"
              width="65"
              height="32"
              fontSize="14"
            />
          </div>
        </div>
      </div>
    );
  }
}

AlertDeleteFile.propTypes = {
  type: PropTypes.string,
  cancel: PropTypes.func,
  confirmDelete: PropTypes.func
};

AlertDeleteFile.defaultProps = {
  type: "文件",
  cancel: () => {},
  confirmDelete: () => {}
};

export default AlertDeleteFile;

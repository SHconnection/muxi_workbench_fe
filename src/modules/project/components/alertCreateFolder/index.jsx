import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactSVG from "react-svg";
import Button from "../../../../components/common/button/index";
import CreateFileAlertIcon from "../../../../assets/svg/commonIcon/editFileAlert.svg";
import "../../../../static/css/common.css";

class AlertCreateFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      InputText: ""
    };
    this.cancel = this.cancel.bind(this);
    this.confirmCreate = this.confirmCreate.bind(this);
    this.changeInputText = this.changeInputText.bind(this);
  }

  cancel() {
    const { cancel } = this.props;
    cancel();
  }

  confirmCreate() {
    const { InputText } = this.state;
    const { confirmCreate } = this.props;
    confirmCreate(InputText);
  }

  // 输入新文件夹名字
  changeInputText(event) {
    this.setState({
      InputText: event.target.value
    });
  }

  render() {
    const { InputText } = this.state;
    const { type } = this.props;
    return (
      <div className="alertLayer">
        <div className="createFileAlert">
          <ReactSVG
            className="create-file-alert-icon"
            path={CreateFileAlertIcon}
          />
          <input
            className="create-file-alert-input"
            type="text"
            placeholder={`编辑${type}夹名`}
            value={InputText}
            onChange={this.changeInputText}
          />
          <div className="create-file-alert-cancel">
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
          <div className="create-file-alert-done">
            <Button
              onClick={this.confirmCreate}
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

AlertCreateFolder.propTypes = {
  type: PropTypes.string,
  cancel: PropTypes.func,
  confirmCreate: PropTypes.func
};

AlertCreateFolder.defaultProps = {
  type: "文件",
  cancel: () => {},
  confirmCreate: () => {}
};

export default AlertCreateFolder;

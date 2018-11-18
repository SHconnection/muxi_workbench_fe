import React, { Component } from "react";
import PropTypes from "prop-types";
import { Scrollbars } from "react-custom-scrollbars";
import Button from "../../../../components/common/button/index";
import { FileTree } from "../../fileTree1";
import FileTreeComponent from "../fileTree/index";
import "../../../../static/css/common.css";

class AlertMoveFile extends Component {
  constructor(props) {
    super(props);
    const { fileTree } = this.props;
    this.state = {
      fileTree,
      finalMoveFileId: 0
    };
    this.cancel = this.cancel.bind(this);
    this.confirmMoveFile = this.confirmMoveFile.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { fileTree } = nextProps;
    this.setState({
      fileTree
    });
  }

  cancel() {
    const { cancel } = this.props;
    cancel();
  }

  confirmMoveFile() {
    const { finalMoveFileId } = this.state;
    const { confirmMoveFile } = this.props;
    confirmMoveFile(finalMoveFileId);
  }

  render() {
    const { fileTree } = this.state;
    return (
      <div className="alertLayer">
        <div className="moveFileAlert">
          <div className="move-file-alert-tip">选择保存路径</div>
          <div className="move-file-tree-container">
            <Scrollbars>
              <FileTreeComponent
                root={fileTree}
                select={() => {
                  const fileRootTemp = Object.assign({}, fileTree);
                  fileRootTemp.selected = !fileRootTemp.selected;
                  FileTree.initNodeSelected(fileRootTemp);
                  this.setState({
                    fileTree: fileRootTemp
                  });
                }}
                finalSelect={el => {
                  const fileRootTemp = Object.assign({}, fileTree);
                  FileTree.initNodeFinalSelected(fileRootTemp);
                  let fatherId;
                  if (el.selected || el.router.length === 1) {
                    fatherId = el.id;
                  } else {
                    // 取消选中
                    fatherId = el.router[el.router.length - 2];
                  }
                  const fatherNode = FileTree.searchNode(
                    fatherId,
                    fileRootTemp
                  );
                  fatherNode.finalSelected = true;
                  this.setState({
                    fileTree: fileRootTemp,
                    finalMoveFileId: fatherNode.id
                  });
                }}
              />
            </Scrollbars>
          </div>
          <div className="move-file-alert-cancel">
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
          <div className="move-file-alert-done">
            <Button
              onClick={this.confirmMoveFile}
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

AlertMoveFile.propTypes = {
  fileTree: PropTypes.shape({
    name: PropTypes.string,
    child: PropTypes.array
  }),
  cancel: PropTypes.func,
  confirmMoveFile: PropTypes.func
};

AlertMoveFile.defaultProps = {
  fileTree: {},
  cancel: () => {},
  confirmMoveFile: () => {}
};

export default AlertMoveFile;

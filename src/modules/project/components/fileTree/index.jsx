import React, { Component } from "react";
import ReactSVG from "react-svg";
import PropTypes from "prop-types";
import FolderIcon from "assets/svg/commonIcon/fileTreeFolder.svg";
import FolderIconToggel from "assets/svg/commonIcon/fileTreeFolderToggel.svg";
import TriangelLeft from "assets/svg/commonIcon/fileTreeTriangelLeft.svg";
import TriangelDown from "assets/svg/commonIcon/fileTreeTriangelDown.svg";
import "./index.scss";

function initNodeSelected(node) {
  const nodeTemp = node;
  for (let i = 0; i < nodeTemp.child.length; i += 1) {
    nodeTemp.child[i].selected = false;
    if (nodeTemp.child[i].child && nodeTemp.child[i].child.length) {
      initNodeSelected(nodeTemp.child[i]);
    }
  }
}

class FileTreeComponent extends Component {
  constructor(props) {
    super(props);
    const { root } = this.props;
    this.state = {
      fileRoot: root
    };
    this.changeVisible = this.changeVisible.bind(this);
    this.select = this.select.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { root } = nextProps;
    this.setState({
      fileRoot: root
    });
  }

  changeVisible() {
    const { select, root, finalSelect } = this.props;
    select(root);
    finalSelect(root);
  }

  select(node) {
    const { fileRoot } = this.state;
    const fileRootTemp = Object.assign({}, fileRoot);
    for (let i = 0; i < fileRootTemp.child.length; i += 1) {
      if (fileRootTemp.child[i].id === node.id) {
        fileRootTemp.child[i].selected = !fileRootTemp.child[i].selected;
        initNodeSelected(fileRootTemp.child[i]);
      } else {
        fileRootTemp.child[i].selected = false;
      }
    }
    this.setState({
      fileRoot: fileRootTemp
    });
  }

  render() {
    const { root, finalSelect } = this.props;
    const { fileRoot } = this.state;
    let childNodes;
    if (fileRoot.child) {
      childNodes = root.child.map(node => {
        if (node.folder) {
          return (
            <div key={node.id}>
              <FileTreeComponent
                root={node}
                select={this.select}
                finalSelect={finalSelect}
              />
            </div>
          );
        }
        return null;
      });
    }

    if (root.selected) {
      return (
        <div className="file-tree-container">
          <div
            className={
              root.finalSelected
                ? "final-selected file-tree-root"
                : "file-tree-root"
            }
            onClick={this.changeVisible}
            onKeyDown={() => {}}
            role="presentation"
          >
            {/* {true && (<p>hh</p>)} */}
            <ReactSVG className="file-tree-triangel" path={TriangelDown} />
            <ReactSVG
              className="file-tree-folder-icon"
              path={FolderIconToggel}
            />
            <div className="file-tree-name">{root.name}</div>
          </div>
          <div className="file-tree-child">{childNodes}</div>
        </div>
      );
    }
    return (
      <div className="file-tree-container">
        <div
          className={
            root.finalSelected
              ? "final-selected file-tree-root"
              : "file-tree-root"
          }
          onClick={this.changeVisible}
          onKeyDown={() => {}}
          role="presentation"
        >
          <ReactSVG className="file-tree-triangel" path={TriangelLeft} />
          <ReactSVG className="file-tree-folder-icon" path={FolderIcon} />
          <div className="file-tree-name">{root.name}</div>
        </div>
      </div>
    );
  }
}

FileTreeComponent.propTypes = {
  root: PropTypes.shape({
    folder: PropTypes.bool,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    child: PropTypes.array,
    selected: PropTypes.bool,
    finalSelected: PropTypes.bool
  }),
  select: PropTypes.func,
  finalSelect: PropTypes.func
};

FileTreeComponent.defaultProps = {
  root: {
    folder: false,
    id: 0,
    name: "",
    child: [],
    selected: false,
    // 是否展开
    finalSelected: false
    // 最终选择
  },
  select: () => {},
  finalSelect: () => {}
};

export default FileTreeComponent;

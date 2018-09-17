import React, { Component } from 'react';
import ReactSVG from "react-svg";
import PropTypes from "prop-types";
import FolderIcon from "../../../../assets/svg/commonIcon/fileTreeFolder.svg";
import FolderIconToggel from "../../../../assets/svg/commonIcon/fileTreeFolderToggel.svg";
import TriangelLeft from "../../../../assets/svg/commonIcon/fileTreeTriangelLeft.svg";
import TriangelDown from "../../../../assets/svg/commonIcon/fileTreeTriangelDown.svg";
import "./index.css";

class FileTreeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
    this.changeVisible = this.changeVisible.bind(this)
    this.hideChild = this.hideChild.bind(this)
    this.showChild = this.showChild.bind(this)
  }

  changeVisible() {
    const { visible } = this.state
    const { select, root } = this.props
    select(root)
    this.setState({
      visible: !visible
    })
  }

  hideChild() {
    const { root } = this.props
    const { visible } = this.state
    this.setState({
      visible: false
    })
    console.log(root.name, visible);
  }

  showChild() {
    const { root } = this.props
    const { visible } = this.state
    this.setState({
      visible: true
    })
    console.log(root.name, visible);
  }

  render() {
    const { select, root } = this.props
    const { visible } = this.state
    
    let childNodes;
    if(root.child) {
      childNodes = root.child.map(node => {
        if (node.folder) {
          return (
            <div key={node.id}>
              <FileTreeComponent root={node} select={select} />
            </div>
          )
        }
        return null
      })
    }
    
    if(visible) {
      return (
        <div className="file-tree-container">
          <div className="file-tree-root" onClick={this.changeVisible} onKeyDown={() => {}} role="presentation">
            <ReactSVG className="file-tree-triangel" path={TriangelDown} />
            <ReactSVG className="file-tree-folder-icon" path={FolderIconToggel} />
            <div className="file-tree-name">{root.name}</div>
          </div>
          <div className="file-tree-child">
            {childNodes}
          </div>
        </div>
      )
    }
    return (
      <div className="file-tree-container">
        <div className="file-tree-root" onClick={this.changeVisible} onKeyDown={() => {}} role="presentation">
          <ReactSVG className="file-tree-triangel" path={TriangelLeft} />
          <ReactSVG className="file-tree-folder-icon" path={FolderIcon} />
          <div className="file-tree-name">{root.name}</div>
        </div>
      </div>
    )
  }
}

FileTreeComponent.propTypes = {
  root: PropTypes.shape({
    folder: PropTypes.bool,
    id: PropTypes.number,
    name: PropTypes.string,
    child: PropTypes.array
  }),
  select: PropTypes.func
};

FileTreeComponent.defaultProps = {
  root: {
    folder: false,
    id: 0,
    name: "",
    child: []
  },
  select: () => {}
};

export default FileTreeComponent;
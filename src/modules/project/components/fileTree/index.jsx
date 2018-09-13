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
    const { root } = this.props
    const { visible } = this.state
    
    let childNodes;
    if(root.child.folder) {
      childNodes = root.child.folder.map(node => (
        <div key={node.id}>
          <FileTreeComponent root={node} />
        </div>
      ))
    }
    
    if(visible) {
      return (
        <div className="file-tree-container">
          <div className="file-tree-root" onClick={this.changeVisible} onKeyDown={() => {}} role="presentation">
            <ReactSVG className="file-tree-triangel-left" path={TriangelDown} />
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
          <ReactSVG className="file-tree-triangel-left" path={TriangelLeft} />
          <ReactSVG className="file-tree-folder-icon" path={FolderIcon} />
          <div className="file-tree-name">{root.name}</div>
        </div>
      </div>
    )
  }
}

FileTreeComponent.propTypes = {
  root: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    child: PropTypes.shape({
      folder: PropTypes.array,
      file: PropTypes.array
    })
  })
};

FileTreeComponent.defaultProps = {
  root: {
    id: 0,
    name: "",
    child: {
      folder: [],
      file: []
    }
  }
};

export default FileTreeComponent;
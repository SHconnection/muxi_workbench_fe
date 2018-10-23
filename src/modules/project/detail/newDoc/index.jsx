import React, { Component } from "react";
import PropTypes from "prop-types";
import { FileTree } from "../../fileTree1";
import Edit from "../../../status/markdown/edit1";
import FileService from "../../../../service/file";
import ProjectService from "../../../../service/project";
import "../../../../static/css/common.css";
import "./index.css";

class NewDoc extends Component {
  constructor(props) {
    super(props)
    const { match } = this.props
    this.state = {
      docTree: {},
      pid: parseInt(match.params.pid, 0),
      docRootId: parseInt(match.params.id, 0)
    }
    this.save = this.save.bind(this)
    this.getDocTree = this.getDocTree.bind(this);
  }

  componentWillMount() {
    this.getDocTree()
  }

  // 获取最新文档树
  getDocTree() {
    const { pid } = this.state
    FileTree.getDocTree(pid)
      .then(res => {
        this.setState({
          docTree: res
        });
      })
      .catch(res => {
        console.error(res);
      });
  }

  save(title, content) {
    const { docTree, pid, docRootId } = this.state
    const postData = {
      mdname: title,
      content,
      project_id: pid
    }
    FileService.createDoc(postData)
    .then(res => {
      // 创建成功
      const newNode = {
        folder: false,
        id: res.fid,
        name: title
      }
      const newTree = FileTree.insertNode(newNode, docRootId, docTree)
      if (newTree) {
        ProjectService.updateProjectDocTree(
          pid,
          JSON.stringify(newTree)
        )
        .then(() => {
          window.history.back()
        })
        .catch(error => {
          console.error(error)
        })
      }
      
    })
    .catch(error => {
      console.error(error)
    })
  }

  render() {
    return (
      <Edit content="" title="" save={this.save} />
    );
  }
}

NewDoc.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  })
};

NewDoc.defaultProps = {
  match: {}
};
export default NewDoc;

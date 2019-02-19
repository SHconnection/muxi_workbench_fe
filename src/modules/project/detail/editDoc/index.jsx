import React, { Component } from "react";
import PropTypes from "prop-types";
import Edit from "../../../status/markdown/edit1";
import FileService from "../../../../service/file";
import WrongPage from "../../../../components/common/wrongPage/wrongPage";
import "../../../../static/css/common.css";
import "./index.css";

class EditDoc extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    this.state = {
      // docTree: {},
      id: parseInt(match.params.id, 0),
      title: "",
      content: "",
      wrong: {}
    };
    this.save = this.save.bind(this);
    // this.getDocTree = this.getDocTree.bind(this);
    this.getDocContent = this.getDocContent.bind(this);
    // this.cancel = this.cancel.bind(this);
  }

  componentDidMount() {
    // this.getDocTree()
    this.getDocContent();
  }

  // 获取文档详细内容
  getDocContent() {
    const { id } = this.state;
    FileService.getDocConnent(id)
      .then(res => {
        this.setState({
          title: res.name,
          content: res.content
        });
      })
      .catch(error => {
        this.setState({ wrong: error });
      });
  }

  // 获取最新文档树
  // getDocTree() {
  //   const { pid } = this.state
  //   FileTree.getDocTree(pid)
  //     .then(res => {
  //       this.setState({
  //         docTree: res
  //       });
  //     })
  //     .catch(error => {
  //        this.setState({ wrong: error });
  //     });
  // }

  save(title, content) {
    const { id } = this.state;
    const postData = {
      DocName: title,
      content
    };
    FileService.updateDoc(id, postData)
      .then(() => {
        // 保存成功
        window.history.back();
      })
      .catch(error => {
        this.setState({ wrong: error });
      });
  }

  cancel() {
    this.setState({
      wrong: {}
    });
  }

  render() {
    const { title, content, wrong } = this.state;
    return (
      <div>
        <Edit content={content} title={title} save={this.save} />
        <WrongPage info={wrong} cancel={this.cancel} />
      </div>
    );
  }
}

EditDoc.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  })
};

EditDoc.defaultProps = {
  match: {}
};
export default EditDoc;

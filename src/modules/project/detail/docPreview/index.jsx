import React, { Component } from "react";
import PropTypes from "prop-types";
import Delete from "../../../setting/components/delete/delete";
import Goback from "../../../../components/common/goBack/index";
import fileService from "../../../../service/file";
import "../../../../static/css/common.css";

class DocPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteX: false,
      name: "",
      creator: "",
      content: "",
      lasteditor: "",
      createTime: ""
    };
  }

  componentWillMount() {
    const { match } = this.props;
    const { sid } = match.params.id;
    fileService.getDocConnent(sid).then(doc => {
      if (doc) {
        const title = doc.name;
        const writer = doc.creator;
        const value = doc.content;
        const change = doc.lasteditor;
        const time = doc.create_time;
        this.setState({
          name: title,
          creator: writer,
          content: value,
          lasteditor: change,
          createTime: time
        });
      }
    });
  }

  del() {
    this.setState({
      deleteX: true
    });
  }

  transferMsgDel(deleteX) {
    this.setState({ deleteX });
  }

  // componentWillMount() {
  //   const { match } = this.props;
  //   this.setState({
  //     pid: match.params.pid,
  //     id: match.params.id
  //   });
  //   console.log(match);
  // }

  render() {
    const {
      deleteX,
      name,
      creator,
      content,
      lasteditor,
      createTime
    } = this.state;
    return (
      <div className="subject">
        <div className="project-doc-head">
          <Goback width="33px" height="33px" />
          <div className="projuect-doc-second">
            <span className="project-doc-title">{name}</span>
            <span className="project-doc-name">{creator}</span>
            <span className="project-doc-changer">{lasteditor}</span>
            <span className="project-doc-changer">(最新编辑)</span>
            <span className="project-doc-path">项目路径</span>
            <div className="project-doc-time">{createTime}</div>
          </div>
          <div className="project-doc-change">
            <div className="project-doc-edit">编辑</div>
            <span
              className="status-detail-delete"
              onClick={() => {
                this.del();
              }}
              onKeyDown={this.handleKeyDown}
              role="button"
              tabIndex={0}
            >
              删除
            </span>
            <Delete
              name="确认要删除该进度文档吗？"
              deleteX={deleteX}
              transferMsg={this.transferMsgDel}
              staDel
            />
          </div>
        </div>
        <div className="status-details">{content}</div>
        <hr className="status-detail-line" />
      </div>
    );
  }
}

DocPreview.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  })
};

DocPreview.defaultProps = {
  match: {}
};

export default DocPreview;

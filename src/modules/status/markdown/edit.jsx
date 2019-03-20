import React, { Component } from "react";
import PropTypes from "prop-types";
// import LiveMarkdownTextarea  from './editor';
// import { MarkdownPreview } from "react-marked-markdown";
import Goback from "components/common/goBack/index";
import Button from "components/common/button";
// import MarkdownPreview from './marked/preview';
// import MarkdownInput from "./marked/input";
import "static/css/common.scss";
import StatusService from "service/status";
// import CustomEditor from "./editor";
import { Store } from "store";
import SlateEditor from "./slate/slateEditor";
import "./edit.scss";
import "service/cookie";

class edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      title: "",
      textnone: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    if (match.path === `/edit`);
    else {
      StatusService.getStatuDetail(match.params.id)
        .then(doc => {
          if (doc) {
            const value = doc.content;
            const name = doc.title;
            this.setState({
              title: name,
              content: value
            });
          }
        })
        .catch(error => {
          Store.dispatch({
            type: "substituteWrongInfo",
            payload: error
          });
        });
    }
  }

  onChange(event) {
    this.setState({
      content: event.target.value
    });
  }

  handleChange(event) {
    this.setState({
      title: event.target.value
    });
  }

  save(title) {
    const { match } = this.props;
    const content = localStorage.getItem("content");
    if (title === "" || content === "") {
      this.setState({
        textnone: true
      });
      return;
    }
    if (match.path === "/edit") {
      StatusService.addNewStatu(title, content).catch(error => {
        Store.dispatch({
          type: "substituteWrongInfo",
          payload: error
        });
      });
      window.history.back();
    } else {
      StatusService.changeStatu(match.params.id, title, content).catch(
        error => {
          Store.dispatch({
            type: "substituteWrongInfo",
            payload: error
          });
        }
      );
      window.history.back();
    }
  }

  render() {
    const { title, textnone, content } = this.state;
    return (
      <div className="subject edit-marginHeader">
        <div className="head">
          <div className="last">
            <Goback width="33px" height="33px" />
          </div>
          <input
            className="write-input"
            type="text"
            value={title}
            onChange={this.handleChange}
            placeholder="请输入标题"
          />
          {textnone && (
            <span className="status-ifnone">*标题和内容不能为空！</span>
          )}
          <div className="status-save-bt">
            <Button
              onClick={() => {
                this.save(title);
              }}
              text="保存并返回"
            />
          </div>
        </div>
        <div className="status-markdown">
          <SlateEditor content={content} />
        </div>
      </div>
    );
  }
}

edit.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  })
};

edit.defaultProps = {
  match: {}
};
export default edit;

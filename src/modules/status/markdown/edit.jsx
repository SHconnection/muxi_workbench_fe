import React, { Component } from "react";
import PropTypes from "prop-types";
// import LiveMarkdownTextarea  from './editor';
import { MarkdownPreview } from "react-marked-markdown";
import Goback from "../../../components/common/goBack/index";
import Button from "../../../components/common/button";
// import MarkdownPreview from './marked/preview';
import MarkdownInput from "./marked/input";
import "../../../static/css/common.css";
import StatusService from "../../../service/status";
// import CustomEditor from "./editor";
import "./edit.css";
import "../../../service/cookie";

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

  componentWillMount() {
    const { match } = this.props;
    if (match.path === `/edit`);
    else {
      StatusService.getStatuDetail(match.params.id).then(doc => {
        if (doc) {
          const value = doc.content;
          const name = doc.title;
          this.setState({
            title: name,
            content: value
          });
        }
      });
    }
  }

  componentDidUpdate() {
    const obj = document.querySelector(".field");
    const back = document.querySelector(".preview");
    obj.addEventListener("scroll", () => {
      document.querySelector(".preview").scrollTop = obj.scrollTop;
    });
    back.addEventListener("scroll", () => {
      document.querySelector(".field").scrollTop = back.scrollTop;
    });
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

  save(title, content) {
    const { match } = this.props;
    if (title === "" || content === "") {
      this.setState({
        textnone: true
      });
      return;
    }
    if (match.path === "/edit") {
      StatusService.addNewStatu(title, content);
      window.history.back();
    } else {
      StatusService.changeStatu(match.params.id, title, content);
      window.history.back();
    }
  }

  render() {
    const { content, title, textnone } = this.state;
    return (
      <div className="subject">
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
                this.save(title, content);
              }}
              text="保存并返回"
            />
          </div>
        </div>
        <div className="status-markdown">
          <MarkdownInput
            className="field column"
            onChange={this.onChange}
            value={content}
            onScroll={this.handleScroll}
          />

          <MarkdownPreview
            value={content}
            className="column preview"
            markedOptions={{
              baseUrl: null,
              headerIds: true,
              gfm: true,
              tables: true,
              breaks: false,
              pedantic: false,
              sanitize: true,
              smartLists: true,
              smartypants: true
            }}
          />
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

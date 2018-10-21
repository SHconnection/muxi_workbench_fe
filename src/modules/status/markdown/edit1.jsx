import React, { Component } from "react";
import PropTypes from "prop-types";
import { MarkdownPreview } from "react-marked-markdown";
import Goback from "../../../components/common/goBack/index";
import Button from "../../../components/common/button";
import MarkdownInput from "./marked/input";
import "../../../static/css/common.css";
import "./edit.css";
import "../../../service/cookie";

class Edit extends Component {
  constructor(props) {
    super(props);
    const { content, title } = this.props
    this.state = {
      content,
      title
    };
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {}

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

  render() {
    const { content, title } = this.state
    const { save } = this.props
    return (
      <div>
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
          <div className="status-save-bt">
            <Button
              onClick={() => {
                save(title, content);
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
              baseUrl: true,
              headerIds: true,
              gfm: true,
              tables: true,
              breaks: false,
              pedantic: false,
              sanitize: true,
              smartLists: true,
              smartypants: false
            }}
          />
        </div>
      </div>
    );
  }
}

Edit.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  }),
  content: PropTypes.string,
  title: PropTypes.string,
  save: PropTypes.func
};

Edit.defaultProps = {
  match: {},
  content: "",
  title: "",
  save: () => {}
};
export default Edit;

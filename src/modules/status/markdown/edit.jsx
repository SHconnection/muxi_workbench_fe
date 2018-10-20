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
      title: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
    this.content = React.createRef;
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

    // let currentTab = 0
    // // const c=document.getElementById('status-markdown')
    // const l=document.getElementById('left')
    // const r=document.getElementById('right')

    // const scale =  r.offsetHeight /  l.offsetHeight;

    // l.addEventListener('scroll', ()=>{
    //   if (currentTab !== 1) return
    //   r.scrollTop = l.scrollTop * scale
    // })
    // r.addEventListener('scroll', ()=>{
    //   if (currentTab !== 2) return
    //   l.scrollTop = r.scrollTop / scale
    // })
    // l.addEventListener('mouseover', ()=>{
    //   // 1 表示表示当前鼠标位于 .left元素范围内
    //   currentTab = 1
    // })
    // r.addEventListener('mouseover', ()=>{
    //   // 2 表示表示当前鼠标位于 .right元素范围内
    //    currentTab = 2
    // })
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
    if (match.path === "/edit") {
      StatusService.addNewStatu(title, content);
      window.history.back();
    } else {
      StatusService.changeStatu(match.params.id, title, content);
      window.history.back();
    }
  }

  render() {
    const { content, title } = this.state;
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
          {/* <LiveMarkdownTextarea
            content={content}
            placeholder="Enter your comment here."
            className="row"
            inputClassName="field column"
            previewClassName="column preview"
          /> */}

          <MarkdownInput
            onChange={this.onChange}
            value={content}
            className="field column"
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

edit.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  })
};

edit.defaultProps = {
  match: {}
};
export default edit;

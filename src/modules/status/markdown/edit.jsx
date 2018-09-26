import React, { Component } from "react";
import PropTypes from "prop-types";
// import ProseMirror from "react-prosemirror";
import Goback from "../../../components/common/goBack/index";
import Button from "../../../components/common/button";
import "../../../static/css/common.css";
import StatusService from "../../../service/status";
import "./edit.css";
import "../../../service/cookie";

// class CustomEditor extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: ""
//     };
//   }
//   onChange(value) {
//     this.setState({value:value})
//   }

//   render() {
//     return <ProseMirror value={this.state.value} onChange={this.onChange} options={{docFormat: 'html'}} />
//   }
// }

class edit extends Component {
  static SaveAndBack(content, title) {
    StatusService.addNewStatu(title, content);
    window.history.back();
  }

  constructor(props) {
    super(props);
    this.state = {
      content: "",
      title: ""
    };
    this.SaveAndBack = this.SaveAndBack.bind(this);
  }

  componentWillMount() {
    const { match } = this.props;
    if (match.params === "/edit");
    else {
      const { sid } = match.params.id;
      const arr = StatusService.getStatuDetail(sid);
      this.setState({
        title: arr.title,
        content: arr.content
      });
    }
  }

  onChange(title) {
    this.setState({
      title
    });
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
            onChange={this.onChange}
            placeholder="请输入标题"
          />
          <div className="status-save-bt">
            <Button
              onClick={() => this.SaveAndBack(content, title)}
              text="保存并返回"
            />
          </div>
        </div>
        {/* <div className="status-markdown"><CustomEditor /></div> */}
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

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
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      title: ""
    };
    this.handleChange = this.handleChange.bind(this);
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

  handleChange(event) {
    this.setState({
      title: event.target.value
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
            onChange={this.handleChange}
            placeholder="请输入标题"
          />
          <div className="status-save-bt">
            <Button
              onClick={() => {
                StatusService.addNewStatu(title, content);
                window.history.back();
              }}
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

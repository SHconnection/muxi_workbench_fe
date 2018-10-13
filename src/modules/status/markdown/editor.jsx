import React, { Component } from "react";
// import ReactDOM from 'react-dom';
import Simditor from "simditor";
import "simditor/styles/simditor.css";

class CustomEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const textbox = this.textarea;
    this.editor = new Simditor({
      textarea: textbox,
      toolbar: [
        "title",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "color",
        "|",
        "ol", // ordered list
        "ul", // unordered list
        "blockquote",
        "code", // code block
        "table",
        "|",
        "link",
        "image",
        "|",
        "hr", // horizontal ruler
        "indent",
        "outdent",
        "alignment"
        // 'markdown',
      ],
      placeholder: "",
      defaultImage: "",
      pasteImage: true,
      imageButton: "upload",
      upload: {
        url: "", // 上传api的url
        fileKey: "upload_file",
        connectionCount: 3
      }
    });

    const { content } = this.props;
    this.editor.setValue(content);
  }

  render() {
    return (
      <div>
        <textarea
          ref={textarea => {
            this.textarea = textarea;
          }}
        />
      </div>
    );
  }
}

CustomEditor.defaultProps = {
  content: ""
};

export default CustomEditor;

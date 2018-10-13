import React, { Component } from "react";
// import PropTypes from "prop-types";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
// import { addListNodes } from "prosemirror-schema-list";
import { exampleSetup } from "prosemirror-example-setup";
import {
  schema,
  defaultMarkdownParser,
  defaultMarkdownSerializer
} from "prosemirror-markdown";

class CustomEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    // Mix the nodes from prosemirror-schema-list into the basic schema to
    // create a schema with list support.
    // const mySchema = new Schema({
    //   nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
    //   marks: schema.spec.marks
    // });

    window.view = new EditorView(document.querySelector("#editor"), {
      state: EditorState.create({
        doc: defaultMarkdownParser.parse("> sdfsdf"),
        plugins: exampleSetup({ schema })
      })
    });
  }

  render() {
    return (
      <div>
        <div id="editor">fwefewfwefwfwef</div>
        {/* <textarea id="content" /> */}
      </div>
    );
  }
}

CustomEditor.defaultProps = {
  content: ""
};

export default CustomEditor;

// import React, { Component } from "react";
// // import ReactDOM from 'react-dom';
// import Simditor from "simditor";
// import "simditor/styles/simditor.css";

// class CustomEditor extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {};
//   }

//   componentDidMount() {
//     const textbox = this.textarea;
//     this.editor = new Simditor({
//       textarea: textbox,
//       toolbar: [
//         "title",
//         "bold",
//         "italic",
//         "underline",
//         "strikethrough",
//         "color",
//         "|",
//         "ol", // ordered list
//         "ul", // unordered list
//         "blockquote",
//         "code", // code block
//         "table",
//         "|",
//         "link",
//         "image",
//         "|",
//         "hr", // horizontal ruler
//         "indent",
//         "outdent",
//         "alignment"
//         // 'markdown',
//       ],
//       placeholder: "",
//       defaultImage: "",
//       pasteImage: true,
//       imageButton: "upload",
//       upload: {
//         url: "", // 上传api的url
//         fileKey: "upload_file",
//         connectionCount: 3
//       }
//     });

//     const { content } = this.props;
//     this.editor.setValue(content);
//   }

//   render() {
//     return (
//       <div>
//         <textarea
//           ref={textarea => {
//             this.textarea = textarea;
//           }}
//         />
//       </div>
//     );
//   }
// }

// CustomEditor.defaultProps = {
//   content: ""
// };

// export default CustomEditor;

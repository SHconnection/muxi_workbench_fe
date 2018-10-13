// import React, { Component } from "react";
// // import PropTypes from "prop-types";
// import { EditorState } from "prosemirror-state";
// import { EditorView } from "prosemirror-view";
// // import { addListNodes } from "prosemirror-schema-list";
// import { exampleSetup } from "prosemirror-example-setup";
// import {
//   schema,
//   defaultMarkdownParser,
//   defaultMarkdownSerializer
// } from "prosemirror-markdown";

// class CustomEditor extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   componentDidMount() {
//     // Mix the nodes from prosemirror-schema-list into the basic schema to
//     // create a schema with list support.
//     // const mySchema = new Schema({
//     //   nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
//     //   marks: schema.spec.marks
//     // });

//     window.view = new EditorView(document.querySelector("#editor"), {
//       state: EditorState.create({
//         doc: defaultMarkdownParser.parse("> sdfsdf"),
//         plugins: exampleSetup({ schema })
//       })
//     });
//   }

//   render() {
//     return (
//       <div>
//         <div id="editor">fwefewfwefwfwef</div>
//         {/* <textarea id="content" /> */}
//       </div>
//     );
//   }
// }

// CustomEditor.defaultProps = {
//   content: ""
// };

// export default CustomEditor;

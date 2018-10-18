// import React from 'react';
// import PropTypes from 'prop-types';
// import marked from 'marked';

// export default class MarkdownPreview extends React.Component {
//   constructor(props){
//     super(props);

//     let options = {};
//     if (props.markedOptions) {
//       options = props.markedOptions;
//     }

//     marked.setOptions(options);
//   }

//   render() {
//     const { value, className } = this.props;
//     const renderer = new marked.Renderer();
//     renderer.link = (href, title, text) => (
//       `<a target="_blank" rel="noopener noreferrer" href="${href}" title="${title}">${text}</a>`
//     );

//     return (
//       <div
//         className={className}
//       >
//         {marked(value || '', { renderer })}
//       </div>
//     );
//   }
// }

// MarkdownPreview.propTypes = {
//   value: PropTypes.string,
//   className: PropTypes.string,
//   markedOptions: PropTypes.shape({

//   }),
// };

// MarkdownPreview.defaultProps = {
//   value: '',
//   className: '',
//   // markedOptions: {}
// };

import React from "react";
import PropTypes from "prop-types";

export default class MarkdownInput extends React.Component {
  constructor(props) {
    super(props);
    this.textareaRef = React.createRef();
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {}

  handleKeyDown(e) {
    if (e.keyCode === 9) {
      e.preventDefault();
      const s = this.textareaRef.current.selectionStart;
      const before = e.target.value.substring(
        0,
        this.textareaRef.current.selectionStart
      );
      const after = e.target.value.substring(
        this.textareaRef.current.selectionEnd
      );
      e.target.value = `${before}  ${after}`;
      // console.log(e.target.value);
      this.textareaRef.current.selectionEnd = s + 2;
    }
  }

  render() {
    const { onChange, value, placeholder, className } = this.props;
    return (
      <textarea
        // id="textarea"
        onKeyDown={this.handleKeyDown}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        ref={this.textareaRef}
        className={className}
      />
    );
  }
}

MarkdownInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string
};

MarkdownInput.defaultProps = {
  onChange: () => {},
  value: "",
  placeholder: "",
  className: ""
};

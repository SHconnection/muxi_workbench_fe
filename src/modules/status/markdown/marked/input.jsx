import React from "react";
import PropTypes from "prop-types";

export default class MarkdownInput extends React.Component {
  constructor(props) {
    super(props);
    this.textareaRef = React.createRef;
  }

  componentDidMount() {}

  render() {
    const { onChange, value, placeholder, className } = this.props;
    return (
      <textarea
        // id = "textarea"
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

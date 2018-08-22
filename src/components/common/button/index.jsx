import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./index.css";

const Button = ({ width, height, text, to, onClick }) => {
  const style = {
    width: `${width}px`,
    height: `${height}px`
  };

  return (
    <div style={style}>
      <div
        className="bt"
        onClick={onClick}
        onKeyDown={() => {}}
        role="presentation"
      >
        {to ? (
          <Link className="bt-text" to={to}>
            {text}
          </Link>
        ) : (
          <div className="bt-text">{text}</div>
        )}
      </div>
    </div>
  );
};

Button.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  text: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func
};

Button.defaultProps = {
  width: "96",
  height: "40",
  text: "Button",
  to: "",
  onClick: null
};

export default Button;

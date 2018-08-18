import React from 'react';
import PropTypes from 'prop-types'
import './index.css'

const Button = ({width, height, text}) => {
  
  const style = {
    width: `${width}px`,
    height: `${height}px`,
  }

  return (
    <div style={style}>
      <div className="bt">
        <div className="bt-text">
          {text}
        </div>
      </div>
    </div>
  );
}

Button.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  text: PropTypes.string
}

Button.defaultProps = {
  width: "96",
  height: "40",
  text: "Button"
};

export default Button;
import React from 'react';
import './index.css'

function Button(props) {
  const width = props.width ? props.width + "px" : "96px"
  const height = props.height ? props.height + "px" : "40px"
  const text = props.text ? props.text : "Button"
  const style = {
    width,
    height,
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

export default Button;
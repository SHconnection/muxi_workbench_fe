import React from 'react';
import AvatarSrc from '../../../assets/img/avatar.png'

function Avatar(props) {
  const width = props.width ? props.width + "px" : "44px"
  const height = props.height ? props.height + "px" : "44px"
  const square = props.square ? "0" : "100%"
  const src = props.src ? props.src : AvatarSrc
  const style = {
    width,
    height,
    borderRadius: square
  }

  return (
    <img style={style} src={src} alt="avatar" />
  );
}

export default Avatar;
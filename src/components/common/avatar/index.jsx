import React from 'react';
import PropTypes from 'prop-types'
import AvatarSrc from '../../../assets/img/avatar.png'

const Avatar = ({width, height, square, src}) => {
  
  const style = {
    width: `${width}px`,
    height: `${height}px`,
    borderRadius: square ? "0" : "100%"
  }

  return (
    <img style={style} src={src} alt="avatar" />
  );
}

Avatar.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  square: PropTypes.bool,
  src: PropTypes.string
}

Avatar.defaultProps = {
  width: "44",
  height: "44",
  square: false,
  src: AvatarSrc
};

export default Avatar;
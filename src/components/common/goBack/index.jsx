import React from 'react';
// import ReactSVG from 'react-svg'
// import backIcon from '../../../assets/svg/commonIcon/back.svg'
import '../../../static/css/common.css';
import './index.css';

const goBack = href => {
  if (href) {
    window.location.href = href;
  } else {
    window.history.back();
  }
};

const GoBack = ({ href }) => (
  <div
    className="reArrow back-icon"
    onClick={goBack.bind(this, href)}
    onKeyDown={() => {}}
    role="presentation"
  />
);

export default GoBack;

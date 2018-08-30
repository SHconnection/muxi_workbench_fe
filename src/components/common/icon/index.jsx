import React from 'react';
import ReactSVG from "react-svg";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import TrashIcon from "../../../assets/svg/commonIcon/trash.svg"
import SettingIcon from "../../../assets/svg/commonIcon/setting.svg"
import "./index.css"

const IconTypes = {
  trash: TrashIcon,
  setting: SettingIcon
}

const Icon = ({type, text, tip, to}) => {
  if (IconTypes[type]) {
    return (
      <Link className="component-icon-container" to={to}>
        <ReactSVG className="component-icon-svg" path={IconTypes[type]} />
        <div className="component-icon-tip">{tip}</div>
      </Link>
    )
  }
  if (text) {
    return (
      <Link className="component-icon-container" to={to}>
        <div className="component-icon-text">{text}</div>
        <div className="component-icon-tip">{tip}</div>
      </Link>
    )
  }
  return null
}

Icon.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  tip: PropTypes.string,
  to: PropTypes.string
}

Icon.defaultProps = {
  type: "",
  text: "",
  tip: "",
  to: "/"
}


export default Icon;
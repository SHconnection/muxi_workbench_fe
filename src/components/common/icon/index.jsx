import React from "react";
import ReactSVG from "react-svg";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import TrashIcon from "assets/svg/commonIcon/trash.svg";
import SettingIcon from "assets/svg/commonIcon/setting.svg";
import FileItemsSel from "assets/svg/commonIcon/fileItems_sel.svg";
import FileItems from "assets/svg/commonIcon/fileItems.svg";
import FileLists from "assets/svg/commonIcon/fileLists.svg";
import FileListSel from "assets/svg/commonIcon/fileLists_sel.svg";
import "./index.scss";

const IconTypes = {
  trash: TrashIcon,
  setting: SettingIcon,
  FileItemsSel,
  FileItems,
  FileListSel,
  FileLists
};

const Icon = ({ type, text, tip, to, onClick }) => {
  if (tip && to) {
    if (IconTypes[type]) {
      return (
        <Link className="component-icon-container" to={to}>
          <ReactSVG className="component-icon-svg" path={IconTypes[type]} />
          <div className="component-icon-tip">{tip}</div>
        </Link>
      );
    }
    if (text) {
      return (
        <Link className="component-icon-container" to={to}>
          <div className="component-icon-text">{text}</div>
          <div className="component-icon-tip">{tip}</div>
        </Link>
      );
    }
  }
  if (!tip && onClick) {
    if (IconTypes[type]) {
      return (
        <div
          className="component-icon-single"
          onClick={onClick}
          onKeyDown={() => {}}
          role="presentation"
        >
          <ReactSVG className="component-icon-svg" path={IconTypes[type]} />
        </div>
      );
    }
  }
  return null;
};

Icon.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  tip: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func
};

Icon.defaultProps = {
  type: "",
  text: "",
  tip: "",
  to: "/",
  onClick: () => {}
};

export default Icon;

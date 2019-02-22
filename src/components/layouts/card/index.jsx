import React from "react";
import PropTypes from "prop-types";
import "../../../static/css/common.css";

export default function CardContainer(props) {
  const { children } = props;
  return <div className="subject cardContainer">{children}</div>;
}

CardContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

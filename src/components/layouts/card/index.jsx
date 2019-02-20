import React from "react";
import PropTypes from "prop-types";

export default function CardContainer(props) {
  const { children } = props;
  return <div className="cardContainer">{children}</div>;
}

CardContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

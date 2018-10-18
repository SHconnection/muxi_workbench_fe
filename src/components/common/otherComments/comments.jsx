import React from "react";
import ReactSVG from "react-svg";
import PropTypes from "prop-types";
import answer from "../../../assets/svg/commonIcon/answer.svg";
import Avatar from "../avatar/index";
import "./comments.css";

function otherComments(props) {
  const { avatar, name, day, text } = props;
  const regex = /\D/
  const dates = day.split(regex)
  return (
    <div className="othercomments">
      <div className="comments-message">
        <Avatar className="comments-img" src={avatar} width={49} height={49} />
        <div className="comments-userInfo">
          <div className="comments-name">{name}</div>
          <div className="comments-time">{`${dates[0]}/${dates[1]}/${dates[2]}`}</div>
        </div>
        <ReactSVG className="comments-answer" path={answer} />
      </div>
      <div className="status-comments-detail">{text}</div>
    </div>
  );
}
otherComments.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  day: PropTypes.string,
  text: PropTypes.string
};

otherComments.defaultProps = {
  name: "",
  avatar: "",
  day: "0000/00/00",
  text: ""
};

export default otherComments;

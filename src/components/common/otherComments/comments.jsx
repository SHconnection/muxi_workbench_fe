import React from 'react';
import ReactSVG from 'react-svg'
import PropTypes from 'prop-types'
import answer from '../../../assets/svg/commonIcon/answer.svg'
import AvatarImg from "../../../assets/img/avatar.png";
import Avatar from "../avatar/index";
import './comments.css'

function otherComments (props) {
  const {name,day,text} = props
  return(
    <div className="othercomments">
      <div className="comments-message">
        <Avatar className="comments-img" src={AvatarImg} width={49} height={49} />
        <div className="comments-name">{name}</div>
        <div className="comments-time">{day}</div>
        <ReactSVG className="comments-answer" path={answer} />
      </div>
      <div className="status-comments-detail">{text}</div>
    </div>
  )
}
otherComments.propTypes = {
  name: PropTypes.string,
  day: PropTypes.string,
  text: PropTypes.string,
}

otherComments.defaultProps = {
  name: "木小犀",
  day: "0000/00/00", 
  text: "评论",
}
  
export default otherComments;
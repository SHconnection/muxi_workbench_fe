import React from 'react';
import ReactSVG from 'react-svg'
import answer from '../../../assets/svg/commonIcon/answer.svg'
import AvatarImg from "../../../assets/img/avatar.png";
import Avatar from "../avatar/index";
import './comments.css'

const otherComments = () => (
    <div className="othercomments">
      <div className="comments-message">
        <Avatar className="comments-img" src={AvatarImg} width={49} height={49} />
        <div className="comments-name">木小犀</div>
        <div className="comments-time">2018/08/04</div>
        <ReactSVG className="comments-answer" path={answer} />
      </div>
      <div className="status-comments-detail">
        这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论。
      </div>
    </div>
);
  
  export default otherComments;
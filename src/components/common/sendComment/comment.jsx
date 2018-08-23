import React from 'react';
import Button from "../button"
import AvatarImg from "../../../assets/img/avatar.png";
import Avatar from "../avatar/index";
import './comment.css'

const comment = () => (
    <div className="status-comment">
      <div className="send">
        <Avatar className="comment-img" src={AvatarImg} width={49} height={49} />
        <div className="push">
          <textarea className="send-comment" type="text" placeholder="   发表评论..." />
          <div className="comment-bt">
            <Button text="发表" />
          </div>
        </div>
      </div>
    </div>
  );
  
  export default comment;
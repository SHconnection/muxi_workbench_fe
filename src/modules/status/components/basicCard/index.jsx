import React from 'react';
import ReactSVG from 'react-svg'
import PropTypes from 'prop-types'
import thumbs from '../../../../assets/svg/commonIcon/thumbs.svg'
import thumbsUp from '../../../../assets/svg/commonIcon/thumbs_up.svg'
import comment from '../../../../assets/svg/commonIcon/comment.svg'
import AvatarImg from "../../../../assets/img/avatar.png";
import Avatar from "../../../../components/common/avatar/index";
import './index.css'


const Goods = [thumbs,thumbsUp];

function Item(props) {
  const {index, name,time,text,goodNumber,comments} = props
  return (
    <div className="status-item-container">
      <div className="status-head">
        <Avatar className="status-item-img" src={AvatarImg} width="60" height="60" />
        <div className="stauts-second">
          <div className="status-item-name">{name}</div>
          <div className="status-item-time">{time}</div>
        </div>
        <div className="open">展开</div>
      </div>
      <div className="status-item-details">{text}</div>
      <div className="others">
        <ReactSVG className="status-item-good" path={Goods[index]} />
        <div className="status-item-goodnumber">{goodNumber}</div>
        <ReactSVG className="status-item-commet" path={comment} />
        <div className="status-item-comments">{comments}</div>
      </div>
    </div>
  );
}

Item.propTypes = {
  name: PropTypes.string,
  time: PropTypes.string,
  text: PropTypes.string,
  index: PropTypes.number,
  goodNumber: PropTypes.number,
  comments: PropTypes.number,
}

Item.defaultProps = {
  name: "木小犀",
  time: "00:00",
  text: "进度",
  index: 0,
  goodNumber: 0,
  comments: 0,
}

export default Item;

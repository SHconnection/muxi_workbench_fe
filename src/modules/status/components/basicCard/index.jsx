import React, { Component } from "react";
import ReactSVG from "react-svg";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import thumbs from "../../../../assets/svg/commonIcon/thumbs.svg";
import thumbsUp from "../../../../assets/svg/commonIcon/thumbs_up.svg";
import comment from "../../../../assets/svg/commonIcon/comment.svg";
import Avatar from "../../../../components/common/avatar/index";
import StatusService from "../../../../service/status";
import "./index.css";

const Goods = [thumbs, thumbsUp];

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      whetherLike: props.iflike,
      likeNumber: props.likeCount,
      sid: props.sid
    };
    this.changeLike = this.changeLike.bind(this);
  }

  changeLike(sid, whetherLike, likeNumber) {
    if (whetherLike === 0) {
      this.setState({
        whetherLike: 1,
        likeNumber: likeNumber + 1
      });
      StatusService.changeLike(sid, 1);
    } else {
      this.setState({
        whetherLike: 0,
        likeNumber: likeNumber - 1
      });
      StatusService.changeLike(sid, 0);
    }
  }

  render() {
    const { whetherLike, likeNumber, sid } = this.state;
    const { avatar, username, time, content, commentCount } = this.props;
    return (
      <div className="status-item-container">
        <div className="status-head">
          <Avatar
            className="status-item-img"
            src={avatar}
            width="60"
            height="60"
          />
          <div className="stauts-second">
            <div className="status-item-name">{username}</div>
            <div className="status-item-time">{time}</div>
          </div>
          <div className="open">
            <Link to={`/status/${sid}`}>展开</Link>
          </div>
        </div>
        <div className="status-item-content">{content}</div>
        <div className="others">
          <ReactSVG
            className="status-item-good"
            onClick={() => this.changeLike(sid, whetherLike, likeNumber)}
            path={Goods[whetherLike]}
          />
          <div className="status-item-goodnumber">{likeNumber}</div>
          <ReactSVG className="status-item-commet" path={comment} />
          <div className="status-item-comments">{commentCount}</div>
        </div>
      </div>
    );
  }
}

Item.propTypes = {
  sid: PropTypes.number,
  username: PropTypes.string,
  time: PropTypes.string,
  avatar: PropTypes.string,
  content: PropTypes.string,
  iflike: PropTypes.number,
  likeCount: PropTypes.number,
  commentCount: PropTypes.number,
  match: PropTypes.shape({
    url: PropTypes.string
  })
};

Item.defaultProps = {
  sid: 0,
  username: "",
  time: "00:00",
  avatar: "",
  content: "",
  iflike: 0,
  likeCount: 0,
  commentCount: 0,
  match: {
    url: "/status"
  }
};

export default Item;

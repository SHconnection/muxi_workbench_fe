import React, { Component } from "react";
import ReactSVG from "react-svg";
import PropTypes from "prop-types";
import thumbs from "../../../../assets/svg/commonIcon/thumbs.svg";
import thumbsUp from "../../../../assets/svg/commonIcon/thumbs_up.svg";
import comment from "../../../../assets/svg/commonIcon/comment.svg";
import Avatar from "../../../../components/common/avatar/index";
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

  changeLike(whetherLike, likeNumber, sid) {
    if (whetherLike === 0) {
      this.setState({
        whetherLike: 1,
        likeNumber: likeNumber + 1
      });
    } else {
      this.setState({
        whetherLike: 0,
        likeNumber: likeNumber - 1
      });
    }
    fetch(`/status/${sid}/like/`, {
      method: "PUT",
      headers: {
        token: this.token
      },
      body: {
        iflike: whetherLike
      }
    });
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
          {/* <div className="open">展开</div> */}
        </div>
        <div className="status-item-details">{content}</div>
        <div className="others">
          <ReactSVG
            className="status-item-good"
            onClick={() => this.changeLike(whetherLike, likeNumber, sid)}
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
  commentCount: PropTypes.number
};

Item.defaultProps = {
  sid: 0,
  username: "",
  time: "00:00",
  avatar: "",
  content: "",
  iflike: 0,
  likeCount: 0,
  commentCount: 0
};

export default Item;

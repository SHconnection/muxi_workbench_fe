import React, { Component } from "react";
import ReactSVG from "react-svg";
import { Link } from "react-router-dom";
import Goback from "../../../components/common/goBack/index";
import thumbs from "../../../assets/svg/commonIcon/thumbs.svg";
import thumbsUp from "../../../assets/svg/commonIcon/thumbs_up.svg";
import Othercomments from "../../../components/common/otherComments/comments";
import Sendcomment from "../../../components/common/sendComment/comment";
import AvatarImg from "../../../assets/img/avatar.png";
import Cookie from "../../../service/cookie";
import "../../../static/css/common.css";
import Delete from "../../setting/components/delete/delete";
import "./detail.css";

const Goods = [thumbs, thumbsUp];

class detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteX: false,
      sid: 0,
      title: "这是一个标题",
      content:
        "这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本",
      time: "13:25",
      likeCount: 12,
      iflike: 1,
      // userID: 0,
      username: "木小犀",
      commentList: [
        {
          cid: 1,
          username: "木小犀",
          avatar: { AvatarImg },
          time: "2018/08/04",
          content:
            "这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论。"
        },
        {
          cid: 2,
          username: "木小犀",
          avatar: { AvatarImg },
          time: "2018/08/04",
          content:
            "这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论。"
        },
        {
          cid: 3,
          username: "木小犀",
          avatar: { AvatarImg },
          time: "2018/08/04",
          content:
            "这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论。"
        }
      ]
    };
    this.transferMsgDel = this.transferMsgDel.bind(this);
    this.changeLike = this.changeLike.bind(this);
    this.del = this.del.bind(this);
  }

  componentWillMount() {
    const { match } = this.props;
    this.setState({
      sid: match.params.id
    });
  }

  changeLike(iflike, likeCount, sid) {
    if (iflike === 0) {
      this.setState({
        iflike: 1,
        likeCount: likeCount + 1
      });
    } else {
      this.setState({
        iflike: 0,
        likeCount: likeCount - 1
      });
    }
    fetch(`/status/${sid}/like/`, {
      method: "PUT",
      headers: {
        token: Cookie.getCookie("token")
      },
      body: {
        "content type": "appication.json"
      }
    });
  }

  transferMsgDel(deleteX) {
    this.setState({ deleteX });
  }

  del() {
    this.setState({
      deleteX: true
    });
  }

  render() {
    const {
      sid,
      deleteX,
      commentList,
      title,
      content,
      time,
      likeCount,
      iflike,
      username
    } = this.state;
    return (
      <div className="subject">
        <div className="status-detail-head">
          <Goback width="33px" height="33px" />
          <div className="stauts-detail-second">
            <div className="status-detail-title">{title}</div>
            <span className="status-detail-name">{username}</span>
            <span className="status-detail-time">{time}</span>
          </div>
          <div className="status-detail-edit">
            <Link to={`/status/${sid}/reEdit`} className="status-detail-edit">
              编辑
            </Link>
            <span
              className="status-detail-delete"
              onClick={() => {
                this.del();
              }}
              onKeyDown={this.handleKeyDown}
              role="button"
              tabIndex={0}
            >
              删除
            </span>
            <Delete
              name="确认要删除该进度文档吗？"
              deleteX={deleteX}
              transferMsg={this.transferMsgDel}
              staId={sid}
              staDel
            />
          </div>
          <ReactSVG
            className="status-detail-good"
            onClick={() => this.changeLike(iflike, likeCount, sid)}
            path={Goods[iflike]}
          />
          <div className="status-detail-love">{likeCount}</div>
        </div>
        <div className="status-details">{content}</div>
        <hr className="status-detail-line" />
        <div className="status-detail-comments">
          {commentList.map(el => (
            <div key={el.cid}>
              <Othercomments
                avatar={el.avatar}
                name={el.username}
                day={el.time}
                text={el.content}
              />
            </div>
          ))}
        </div>
        <Sendcomment className="sendcomment" />
      </div>
    );
  }
}
export default detail;

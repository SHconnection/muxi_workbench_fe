import React, { Component } from "react";
import ReactSVG from "react-svg";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// import { MarkdownPreview } from "react-marked-markdown";
import Goback from "../../../components/common/goBack/index";
import thumbs from "../../../assets/svg/commonIcon/thumbs.svg";
import thumbsUp from "../../../assets/svg/commonIcon/thumbs_up.svg";
import Button from "../../../components/common/button/index";
import Avatar from "../../../components/common/avatar/index";
import Othercomments from "../../../components/common/otherComments/comments";
import "../../../static/css/common.css";
import Delete from "../../setting/components/delete/delete";
import SlateEditor from "../markdown/slate/slateEditor";
import StatusService from "../../../service/status";
import "./detail.css";

const Goods = [thumbs, thumbsUp];

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteX: false,
      sid: 0,
      title: "",
      content: "",
      time: "",
      likeCount: 0,
      iflike: 0,
      username: "",
      value: "",
      commentList: []
    };
    this.transferMsgDel = this.transferMsgDel.bind(this);
    this.changeLike = this.changeLike.bind(this);
    this.del = this.del.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    const { match } = this.props;
    this.setState({
      sid: match.params.id
    });
    StatusService.getStatuDetail(match.params.id).then(doc => {
      if (doc) {
        const sid1 = doc.sid;
        const name = doc.title;
        const value = doc.content;
        const time1 = doc.time;
        const likeCounts = doc.likeCount;
        const iflike1 = doc.iflike;
        const arr1 = doc.commentList.map(comments => {
          const comment = comments;
          const obj = {};
          obj.cid = comment.cid;
          obj.username = comment.username;
          obj.avatar = comment.avatar;
          obj.time = comment.time;
          obj.content = comment.content;
          return obj;
        });
        this.setState({
          sid: sid1,
          title: name,
          content: value,
          time: time1,
          likeCount: likeCounts,
          iflike: iflike1,
          commentList: arr1
        });
        localStorage.setItem("content", value);
      }
    });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  changeLike(iflike, likeCount, sid) {
    if (iflike === 0) {
      this.setState({
        iflike: 1,
        likeCount: likeCount + 1
      });
      StatusService.changeLike(sid, 1);
    } else {
      this.setState({
        iflike: 0,
        likeCount: likeCount - 1
      });
      StatusService.changeLike(sid, 0);
    }
  }

  sendComment(value, sid) {
    if (!value) {
      return;
    }
    StatusService.postComments(sid, value).then(result => {
      if (result !== null) {
        StatusService.getStatuDetail(sid).then(comments => {
          if (comments) {
            const arr1 = comments.commentList.map(comment => {
              const comment1 = comment;
              const obj = {};
              obj.cid = comment1.cid;
              obj.username = comment1.username;
              obj.avatar = comment1.avatar;
              obj.time = comment1.time;
              obj.content = comment1.content;
              return obj;
            });
            this.setState({
              commentList: arr1,
              value: ""
            });
          }
        });
      }
    });
  }

  del() {
    this.setState({
      deleteX: true
    });
  }

  transferMsgDel(deleteX) {
    this.setState({ deleteX });
  }

  render() {
    const {
      sid,
      deleteX,
      commentList,
      value,
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
          <Goback className="status-detail-back" width="33px" height="33px" />
          <div className="stauts-detail-second">
            <div className="status-detail-title">{title}</div>
            <span className="status-detail-name">{username}</span>
            <span className="status-detail-time">{time}</span>
          </div>
          <div className="status-detail-edit">
            <Link to={`/status/${sid}/reEdit`} className="status-detail-editor">
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
        </div>
        <div className="status-detail-good">
          <div>
            <ReactSVG
              className="status-ifgood"
              onClick={() => this.changeLike(iflike, likeCount, sid)}
              path={Goods[iflike]}
            />
          </div>
          <div className="status-detail-love">{likeCount}</div>
        </div>
        <div className="status-details">
          {/* <MarkdownPreview value={content} /> */}
          <SlateEditor readOnly content={content} />
        </div>
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
        <div className="send">
          <Avatar
            className="comment-img"
            src={localStorage.avatar}
            width={49}
            height={49}
          />
          <div className="push">
            <div>
              <textarea
                className="send-comment"
                type="text"
                value={value}
                onChange={this.handleChange}
                placeholder=" 发表评论..."
              />
            </div>
            <div className="comment-bt">
              <Button
                onClick={() => this.sendComment(value, sid)}
                text="发表"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Detail.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  })
};

Detail.defaultProps = {
  match: {}
};

export default Detail;

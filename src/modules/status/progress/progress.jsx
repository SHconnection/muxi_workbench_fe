import React, { Component } from "react";
import PropTypes from "prop-types";
import StatusItem from "../components/basicCard/index";
import Gotop from "../../../components/common/toTop/top";
import StatusService from "../../../service/status";
import WrongPage from "../../../components/common/wrongPage/wrongPage";
import "./progerss.css";

// let scrollTo = 0;

function getScrollTop() {
  let scrollTop = 0;
  let bodyScrollTop = 0;
  let documentScrollTop = 0;
  if (document.body) {
    bodyScrollTop = document.body.scrollTop;
  }
  if (document.documentElement) {
    documentScrollTop = document.documentElement.scrollTop;
  }
  scrollTop =
    bodyScrollTop - documentScrollTop > 0 ? bodyScrollTop : documentScrollTop;
  return scrollTop;
}
function getScrollHeight() {
  let scrollHeight = 0;
  let bodyScrollHeight = 0;
  let documentScrollHeight = 0;
  if (document.body) {
    bodyScrollHeight = document.body.scrollHeight;
  }
  if (document.documentElement) {
    documentScrollHeight = document.documentElement.scrollHeight;
  }
  scrollHeight =
    bodyScrollHeight - documentScrollHeight > 0
      ? bodyScrollHeight
      : documentScrollHeight;
  return scrollHeight;
}
function getWindowHeight() {
  let windowHeight = 0;
  if (document.compatMode === "CSS1Compat") {
    windowHeight = document.documentElement.clientHeight;
  } else {
    windowHeight = document.body.clientHeight;
  }
  return windowHeight;
}

class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cout: 0,
      page: 1,
      isPersonal: 0,
      statuList: [],
      wrong: {}
    };
    this.getStatusList = this.getStatusList.bind(this);
  }

  // 返回给我总的条数，条数除以20=page

  componentWillMount() {
    const { match } = this.props;
    if (match.url === "/status") {
      StatusService.getStatusList(1)
        .then(status => {
          if (status) {
            const arr1 = status.statuList.map(statu1 => {
              const statu = statu1;
              const obj = {};
              obj.sid = statu.sid;
              obj.username = statu.username;
              obj.avatar = statu.avatar;
              obj.time = statu.time;
              obj.iflike = statu.iflike;
              obj.content = statu.content;
              obj.likeCount = statu.likeCount;
              obj.commentCount = statu.commentCount;
              return obj;
            });
            const count1 = status.count;
            const changePage = status.page;
            this.setState({
              cout: count1,
              page: changePage,
              statuList: arr1,
              isPersonal: 0
            });
          }
        })
        .catch(error => {
          this.setState({ wrong: error });
        });
    } else {
      StatusService.getPersonalStatus(match.params.uid, 1)
        .then(status => {
          if (status) {
            const arr1 = status.statuList.map(statu1 => {
              const statu = statu1;
              const obj = {};
              obj.sid = statu.sid;
              obj.username = statu.username;
              obj.avatar = statu.avatar;
              obj.time = statu.time;
              obj.iflike = statu.iflike;
              obj.content = statu.content;
              obj.likeCount = statu.likeCount;
              obj.commentCount = statu.commentCount;
              return obj;
            });
            const count1 = status.count;
            const changePage = status.page;
            this.setState({
              cout: count1,
              page: changePage,
              statuList: arr1,
              isPersonal: 1
            });
          }
        })
        .catch(error => {
          this.setState({ wrong: error });
        });
    }
  }

  componentDidMount() {
    window.onscroll = () => {
      if (getScrollTop() + getWindowHeight() === getScrollHeight()) {
        this.getStatusList();
      }
    };
  }

  getStatusList() {
    const { match } = this.props;
    const { page } = this.state;
    if (match.path === "/status") {
      StatusService.getStatusList(page + 1)
        .then(status => {
          if (status) {
            const arr1 = status.statuList.map(statu1 => {
              const statu = statu1;
              const obj = {};
              obj.sid = statu.sid;
              obj.username = statu.username;
              obj.avatar = statu.avatar;
              obj.time = statu.time;
              obj.iflike = statu.iflike;
              obj.content = statu.content;
              obj.likeCount = statu.likeCount;
              obj.commentCount = statu.commentCount;
              return obj;
            });
            const count1 = status.count;
            const changePage = status.page;
            const { statuList } = this.state;
            this.setState({
              cout: count1,
              page: changePage,
              statuList: statuList.concat(arr1),
              isPersonal: 0
            });
          }
        })
        .catch(error => {
          this.setState({ wrong: error });
        });
    } else {
      StatusService.getPersonalStatus(match.params.uid, page + 1)
        .then(status => {
          if (status) {
            const arr1 = status.statuList.map(statu1 => {
              const statu = statu1;
              const obj = {};
              obj.sid = statu.sid;
              obj.username = statu.username;
              obj.avatar = statu.avatar;
              obj.time = statu.time;
              obj.iflike = statu.iflike;
              obj.content = statu.content;
              obj.likeCount = statu.likeCount;
              obj.commentCount = statu.commentCount;
              return obj;
            });
            const count1 = status.count;
            const changePage = status.page;
            const { statuList } = this.state;
            this.setState({
              cout: count1,
              page: changePage,
              statuList: statuList.concat(arr1),
              isPersonal: 0
            });
          }
        })
        .catch(error => {
          this.setState({ wrong: error });
        });
    }
  }

  cancel() {
    this.setState({ wrong: {} });
  }

  render() {
    const { statuList, isPersonal, cout, page, wrong } = this.state;
    const {
      match: { url }
    } = this.props;
    return (
      <div>
        <div className={isPersonal ? "" : "status"}>
          <div className="status-container">
            {statuList.map(card => (
              <div key={card.sid}>
                <StatusItem
                  sid={card.sid}
                  username={card.username}
                  avatar={card.avatar}
                  time={card.time}
                  iflike={card.iflike}
                  content={card.content}
                  likeCount={card.likeCount}
                  commentCount={card.commentCount}
                  isPersonal={url === "/status" ? 0 : 1}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="loadMore">
          {cout / 20 >= page ? "下拉加载更多..." : "最后一页啦"}
        </div>
        <Gotop />
        <WrongPage info={wrong} cancel={this.cancel} />
      </div>
    );
  }
}

Progress.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string
    })
  })
};

Progress.defaultProps = {
  match: {}
};

export default Progress;

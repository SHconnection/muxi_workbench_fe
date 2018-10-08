import React, { Component } from "react";
import PropTypes from "prop-types";
import StatusItem from "../components/basicCard/index";
import Gotop from "../../../components/common/toTop/top";
import StatusService from "../../../service/status";
import "./progerss.css";

class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cout: 0,
      page: 1,
      isPersonal: 0,
      statuList: []
    };
  }

  // 返回给我总的条数，条数除以20=page

  componentWillMount() {
    const { match } = this.props;
    if (match.path === "/status") {
      StatusService.getStatusList(1).then(status => {
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
          const count = status.cout;
          const changePage = status.page;
          this.setState({
            cout: count,
            page: changePage,
            statuList: arr1,
            isPersonal: 0
          });
        }
      });
    } else {
      const { uid } = match.params;
      StatusService.getPersonalStatus(uid, 1).then(status => {
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
          const count = status.cout;
          const changePage = status.page;
          this.setState({
            cout: count,
            page: changePage,
            statuList: arr1,
            isPersonal: 1
          });
        }
      });
    }
  }

  componentDidMount() {
    const { page, cout } = this.state;
    window.addEventListener("scroll", () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        this.getStatusList(page, cout);
      }
    });
  }

  getStatusList(page, cout) {
    const { match } = this.props;
    if (match.path === "/status") {
      if (cout / 20 > page) {
        StatusService.getStatusList(page + 1).then(status => {
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
            const count = status.cout;
            const changePage = status.page;
            this.setState({
              cout: count,
              page: changePage,
              statuList: arr1,
              isPersonal: 0
            });
          }
        });
      }
    } else {
      const { uid } = match.params;
      if (cout / 20 > page) {
        StatusService.getPersonalStatus(uid, page + 1).then(status => {
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
            const count = status.cout;
            const changePage = status.page;
            this.setState({
              cout: count,
              page: changePage,
              statuList: arr1,
              isPersonal: 0
            });
          }
        });
      }
    }
  }

  render() {
    const { statuList, isPersonal } = this.state;
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
                />
              </div>
            ))}
          </div>
        </div>
        <div className="loadMore">下拉加载更多...</div>
        <Gotop />
      </div>
    );
  }
}

Progress.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  })
};

Progress.defaultProps = {
  match: {}
};

export default Progress;

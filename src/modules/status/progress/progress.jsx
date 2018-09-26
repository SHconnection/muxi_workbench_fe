import React, { Component } from "react";
import PropTypes from "prop-types";
import StatusItem from "../components/basicCard/index";
import Gotop from "../../../components/common/toTop/top";
import StatusService from "../../../service/status";
import MessageService from "../../../service/message"
import "./progerss.css";

class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cout: 0,
      page: 0,
      isPersonal: 0,
      isLoadingMore: false,
      statuList: []
    };
  }

  // 返回给我总的条数，条数除以20=page

  componentWillMount() {
      const { match } = this.props;
      if (match.params === "/status") 
      {
        const arr = StatusService.getStatusList(0);
        this.setState({
          cout: arr.cout,
          page: arr.page,
          statuList: arr.statuList,
          isPersonal: 0
        });
      } else {
        const arr = MessageService.getPersonalAttention();
        this.setState({
          cout: arr.cout,
          page: arr.page,
          statuList: arr.statuList,
          isPersonal: 1
        });
      }
  }

  componentDidMount() {
    const wrapper = this.refs.wrapper;
    const getStatusList = this.getStatusList();
    const that = this; // 为解决不同context的问题
    let timeCount;

    function callback() {
      const top = wrapper.getBoundingClientRect().top;
      const windowHeight = window.screen.height;

      if (top && top < windowHeight) {
        // 当 wrapper 已经被滚动到页面可视范围之内触发
        getStatusList(that);
      }
    }
    window.addEventListener(
      "scroll",
      () => {
        if (this.state.isLoadingMore) {
          return;
        }

        if (timeCount) {
          clearTimeout(timeCount);
        }

        timeCount = setTimeout(callback, 50);
      },
      false
    );
  }

  getStatusList(page, cout) {
    if (cout / 20 > page) {
      const arr = StatusService.getStatusList(page + 1);
      this.setState({
        cout: arr.cout,
        page: arr.page,
        statuList: arr.statuList
      });
    }
  }

  render() {
    const { statuList, page, cout, isPersonal } = this.state;
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
        <div
          className="loadMore"
          ref="wrapper"
          onClick={this.getStatusList.bind(page, cout)}
        >
          加载更多...
        </div>
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

/* eslint-disable import/no-unresolved */
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  getContainerHeight,
  getScrollHeight,
  getScrollTop
} from "common/scroll";

import StatusItem from "../components/basicCard/index";
import Gotop from "../../../components/common/toTop/top";
import WrongPage from "../../../components/common/wrongPage/wrongPage";
import "./progerss.css";

class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.count,
      page: props.page,
      isPersonal: props.isPersonal,
      statuList: props.statuList,
      wrong: {}
    };
    this.scroll = this.scroll.bind(this);
    this.getstatuList = props.getstatuList;
  }

  // 返回给我总的条数，条数除以20=page

  componentDidMount() {
    this.getstatuList();
    const appContainer = document.querySelector(".app-container");
    if (appContainer) appContainer.addEventListener("scroll", this.scroll);
  }

  componentWillReceiveProps(nextProps) {
    const { page, count } = this.state;
    if (page !== nextProps.page) {
      this.setState({
        page: nextProps.page,
        statuList: nextProps.statuList
      });
    }
    if (count !== nextProps.count) {
      this.setState({
        count: nextProps.count,
        isPersonal: nextProps.isPersonal
      });
    }
  }

  componentWillUnmount() {
    const appContainer = document.querySelector(".app-container");
    if (appContainer) appContainer.removeEventListener("scroll", this.scroll);
  }

  scroll() {
    if (getScrollTop() + getContainerHeight() === getScrollHeight()) {
      this.getstatuList(true);
    }
  }

  cancel() {
    this.setState({ wrong: {} });
  }

  render() {
    const { statuList, isPersonal, count, page, wrong } = this.state;
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
                  isPersonal={isPersonal}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="loadMore">
          {count / 20 >= page ? "下拉加载更多..." : "最后一页啦"}
        </div>
        <Gotop />
        <WrongPage info={wrong} cancel={this.cancel} />
      </div>
    );
  }
}

Progress.propTypes = {
  count: PropTypes.number,
  page: PropTypes.number,
  isPersonal: PropTypes.number,
  statuList: PropTypes.instanceOf(Array),
  getstatuList: PropTypes.func
};

Progress.defaultProps = {
  count: 0,
  page: 0,
  isPersonal: 0,
  statuList: [],
  getstatuList: {}
};

export default Progress;

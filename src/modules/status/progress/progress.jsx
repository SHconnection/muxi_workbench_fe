/* eslint-disable import/no-unresolved */
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  getContainerHeight,
  getScrollHeight,
  getScrollTop
} from "common/scroll";
import Loading from "components/common/loading/index";
import Gotop from "components/common/toTop/top";
import CardContainer from "components/layouts/card/index";
import StatusItem from "../components/basicCard/index";
import "./progerss.css";

class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.count,
      page: props.page,
      isPersonal: props.isPersonal,
      statuList: props.statuList
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

  static getDerivedStateFromProps(nextProps, prevState) {
    const { page, count } = prevState;
    if (page !== nextProps.page) {
      return {
        page: nextProps.page,
        statuList: nextProps.statuList,
        isPersonal: nextProps.isPersonal
      };
    }
    if (count !== nextProps.count) {
      return {
        count: nextProps.count,
        isPersonal: nextProps.isPersonal
      };
    }
    return {
      isPersonal: nextProps.isPersonal
    };
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

  render() {
    const { statuList, isPersonal, count, page } = this.state;
    const { loading } = this.props;

    return loading ? (
      isPersonal ? (
        <Loading loading offsetTop={{ top: "235px", height: "55%" }} />
      ) : (
        <CardContainer>
          <Loading loading />
        </CardContainer>
      )
    ) : (
      <div>
        <div className={isPersonal ? "" : "status"}>
          <div className="status-container">
            {statuList.map((card, index) => (
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
                  isFirstItem={!index}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="loadMore">
          {count / 20 >= page ? "下拉加载更多..." : "最后一页啦"}
        </div>
        <Gotop />
      </div>
    );
  }
}

Progress.propTypes = {
  count: PropTypes.number,
  page: PropTypes.number,
  isPersonal: PropTypes.number,
  statuList: PropTypes.instanceOf(Array),
  getstatuList: PropTypes.func,
  loading: PropTypes.bool
};

Progress.defaultProps = {
  count: 0,
  page: 0,
  isPersonal: 0,
  statuList: [],
  getstatuList: {},
  loading: false
};

export default Progress;

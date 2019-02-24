/* eslint-disable import/no-unresolved */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import Loading from "components/common/loading";
import {
  getContainerHeight,
  getScrollHeight,
  getScrollTop
} from "common/scroll";

import FeedItem from "./components/feedList/index";
import Gotop from "../../components/common/toTop/top";
import WrongPage from "../../components/common/wrongPage/wrongPage";

import "../../static/css/common.css";
import "./dynamic.css";

const createweek = [
  " 周日",
  " 周一",
  " 周二",
  " 周三",
  " 周四",
  " 周五",
  " 周六"
];
const today = new Date().toLocaleDateString();
const yesterday = new Date(
  new Date().getTime() - 24 * 60 * 60 * 1000
).toLocaleDateString();

class Dynamic extends Component {
  static chargeday(timeDay) {
    if (today === timeDay) {
      return "今";
    }
    if (yesterday === timeDay) {
      return "昨";
    }
    return timeDay.slice(-5) + createweek[new Date(timeDay).getDay()];
  }

  constructor(props) {
    super(props);
    const { feedList } = props;
    const { wrong } = feedList;
    this.state = {
      wrong,
      loading: false
    };
    this.getFeedList = this.getFeedList.bind(this);
    this.getPersonalList = this.getPersonalList.bind(this);
    this.scroll = this.scroll.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    if (match.path === "/feed") {
      this.getFeedList();
    } else {
      this.getPersonalList(match.params.uid);
    }
    const appContainer = document.querySelector(".app-container");
    if (appContainer) appContainer.addEventListener("scroll", this.scroll);
  }

  componentWillUnmount() {
    const appContainer = document.querySelector(".app-container");
    if (appContainer) appContainer.removeEventListener("scroll", this.scroll);
  }

  getFeedList() {
    const { loading } = this.state;
    if (loading) return;
    this.setState({
      loading: true
    });
    const { dispatch, feedList } = this.props;
    const { pageNum, dataList } = feedList;
    dispatch({
      type: "feedList/getFeedList",
      payload: pageNum,
      dataList
    });
  }

  getPersonalList(uid) {
    const { loading } = this.state;
    if (loading) return;
    this.setState({
      loading: true
    });
    const { dispatch, feedList } = this.props;
    const { dataList, pageNum } = feedList;
    dispatch({
      type: "feedList/getPersonalFeed",
      payload: { uid, pageNum },
      dataList
    });
  }

  scroll() {
    const { feedList, match } = this.props;
    const { isPersonal } = feedList;
    if (getScrollTop() + getContainerHeight() >= getScrollHeight()) {
      if (!isPersonal) {
        this.getFeedList();
      } else {
        this.getPersonalList(match.params.uid);
      }
    }
  }

  cancel() {
    this.setState({ wrong: {} });
  }

  render() {
    const { feedList } = this.props;
    const { dataList, hasNext, pageNum } = feedList;
    const { wrong, loading } = this.state;
    return (
      <div className="feed">
        <Loading loading={loading && pageNum === 0} />
        <div>
          <div className="feed-list">
            {dataList.map((feed, index) => (
              <div key={feed.feedid}>
                {(index === 0 ||
                  dataList[index - 1].timeday !== feed.timeday) && (
                  <div
                    className={
                      today === feed.timeday || yesterday === feed.timeday
                        ? "feed-today"
                        : "feed-day"
                    }
                  >
                    {Dynamic.chargeday(feed.timeday)}
                  </div>
                )}
                <FeedItem
                  timeDay={feed.timeday}
                  timeHour={feed.timehm}
                  avatarUrl={feed.user.avatar_url}
                  uid={feed.user.id}
                  userName={feed.user.name}
                  action={feed.action}
                  kind={feed.source.kind_id}
                  sourceName={feed.source.object_name}
                  sourceID={feed.source.object_id}
                  sourcePro={feed.source.project_id}
                  proName={feed.source.project_name}
                  ifSplit={feed.ifsplit}
                />
              </div>
            ))}
          </div>
          <div className="loadMore">
            {hasNext ? "下拉加载更多..." : "我是有底线的"}
          </div>
        </div>
        <Gotop className="go-top" />
        <WrongPage info={wrong} cancel={this.cancel} />
      </div>
    );
  }
}

Dynamic.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }),
  wrong: PropTypes.shape({
    msg: PropTypes.string
  }),
  dispatch: PropTypes.func
};

Dynamic.defaultProps = {
  match: {},
  wrong: {},
  dispatch: () => {}
};

const mapStateToProps = state => ({
  feedList: state.feedList
});

export default connect(mapStateToProps)(Dynamic);

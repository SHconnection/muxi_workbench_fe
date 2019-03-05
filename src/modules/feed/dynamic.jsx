/* eslint-disable import/no-unresolved */
import React, { Component } from "react";
import PropTypes from "prop-types";
import Loading from "components/common/loading";
import {
  getContainerHeight,
  getScrollHeight,
  getScrollTop
} from "common/scroll";
import { Store } from "store";
import FeedItem from "./components/feedList/index";
import Gotop from "../../components/common/toTop/top";
import FeedService from "../../service/feed";
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
    this.state = {
      hasNext: true,
      pageNum: 0,
      dataList: [],
      loading: true
    };
    this.scroll = this.scroll.bind(this);
  }

  componentDidMount() {
    this.getFeedList();
    const appContainer = document.querySelector(".app-container");
    if (appContainer) appContainer.addEventListener("scroll", this.scroll);
  }

  componentWillUnmount() {
    const appContainer = document.querySelector(".app-container");
    if (appContainer) appContainer.removeEventListener("scroll", this.scroll);
  }

  getFeedList() {
    const { match } = this.props;
    const { pageNum, hasNext } = this.state;
    if (match.path === "/feed") {
      if (hasNext) {
        FeedService.getFeedList(pageNum + 1)
          .then(feeds => {
            if (feeds) {
              const arr1 = feeds.dataList.map(feed1 => {
                const feedList = feed1;
                const obj = {};
                obj.timeDay = feedList.timeday;
                obj.timeHour = feedList.timehm;
                obj.ifSplit = feedList.ifsplit;
                obj.action = feedList.action;
                obj.feedid = feedList.feedid;
                obj.sourceName = feedList.source.object_name;
                obj.kind = feedList.source.kind_id;
                obj.sourceID = feedList.source.object_id;
                obj.sourcePro = feedList.source.project_id;
                obj.avatarUrl = feedList.user.avatar_url;
                obj.uid = feedList.user.id;
                obj.proName = feedList.source.object_name;
                obj.userName = feedList.user.name;
                return obj;
              });
              const page1 = feeds.pageNum;
              const next = feeds.hasNext;
              const { dataList } = this.state;
              this.setState({
                hasNext: next,
                pageNum: page1,
                dataList: dataList.concat(arr1),
                loading: false
              });
            }
          })
          .catch(error => {
            Store.dispatch({
              type: "substituteWrongInfo",
              payload: error
            });
          });
      }
    } else {
      const { uid } = match.params;
      if (hasNext) {
        FeedService.getPersonalFeed(uid, pageNum + 1)
          .then(feeds => {
            if (feeds) {
              const arr1 = feeds.dataList.map(feed1 => {
                const feedList = feed1;
                const obj = {};
                obj.timeDay = feedList.timeday;
                obj.timeHour = feedList.timehm;
                obj.ifSplit = feedList.ifsplit;
                obj.action = feedList.action;
                obj.feedid = feedList.feedid;
                obj.sourceName = feedList.source.object_name;
                obj.kind = feedList.source.kind_id;
                obj.sourceID = feedList.source.object_id;
                obj.sourcePro = feedList.source.project_id;
                obj.avatarUrl = feedList.user.avatar_url;
                obj.uid = feedList.user.id;
                obj.proName = feedList.source.object_name;
                obj.userName = feedList.user.name;
                return obj;
              });
              const page1 = feeds.pageNum;
              const next = feeds.hasNext;
              const { dataList } = this.state;
              this.setState({
                hasNext: next,
                pageNum: page1,
                dataList: dataList.concat(arr1),
                loading: false
              });
            }
          })
          .catch(error => {
            Store.dispatch({
              type: "substituteWrongInfo",
              payload: error
            });
          });
      }
    }
  }

  scroll() {
    if (getScrollTop() + getContainerHeight() >= getScrollHeight()) {
      this.getFeedList();
    }
  }

  render() {
    const { hasNext, dataList, loading } = this.state;
    return (
      <div className="feed">
        {loading ? (
          <Loading />
        ) : (
          <div>
            <div className="feed-list">
              {dataList.map((feed, index) => (
                <div key={feed.feedid}>
                  {(index === 0 ||
                    dataList[index - 1].timeDay !== feed.timeDay) && (
                    <div
                      className={
                        today === feed.timeDay || yesterday === feed.timeDay
                          ? "feed-today"
                          : "feed-day"
                      }
                    >
                      {Dynamic.chargeday(feed.timeDay)}
                    </div>
                  )}
                  <FeedItem
                    timeDay={feed.timeDay}
                    timeHour={feed.timeHour}
                    avatarUrl={feed.avatarUrl}
                    uid={feed.uid}
                    userName={feed.userName}
                    action={feed.action}
                    kind={feed.kind}
                    sourceName={feed.sourceName}
                    sourceID={feed.sourceID}
                    sourcePro={feed.sourcePro}
                    proName={feed.proName}
                    ifSplit={feed.ifSplit}
                  />
                </div>
              ))}
            </div>
            <div className="loadMore">
              {hasNext ? "下拉加载更多..." : "我是有底线的"}
            </div>
            <Gotop className="go-top" />
          </div>
        )}
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
  })
};

Dynamic.defaultProps = {
  match: {}
};

export default Dynamic;

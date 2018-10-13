import React, { Component } from "react";
import PropTypes from "prop-types";
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
      page: 1,
      count: 0,
      feedList: [],
      isPersonal: 0
    };
  }

  componentWillMount() {
    const { match } = this.props;
    if (match.path === "/feed") {
      FeedService.getFeedList(1).then(feeds => {
        if (feeds) {
          const arr1 = feeds.feed_stream.map(feed1 => {
            const feedList = feed1;
            const obj = {};
            obj.uid = feedList.uid;
            obj.timeDay = feedList.time_d;
            obj.timeHour = feedList.time_s;
            obj.avatarUrl = feedList.avatar_url;
            obj.action = feedList.action;
            obj.kind = feedList.kind;
            obj.sourceID = feedList.sourceID;
            obj.divider = feedList.divider;
            obj.dividerID = feedList.divider_id;
            obj.dividerName = feedList.divider_name;
            return obj;
          });
          const page1 = feeds.page;
          const count1 = feeds.count;
          this.setState({
            page: page1,
            count: count1,
            feedList: arr1
          });
        }
      });
    } else {
      FeedService.getPersonalFeed(match.params.id, 1).then(feed => {
        if (feed) {
          const arr1 = feed.feed_stream.map(feed1 => {
            const feedList = feed1;
            const obj = {};
            obj.uid = feedList.uid;
            obj.timeDay = feedList.time_d;
            obj.timeHour = feedList.time_s;
            obj.avatarUrl = feedList.avatar_url;
            obj.action = feedList.action;
            obj.kind = feedList.kind;
            obj.sourceID = feedList.sourceID;
            obj.divider = feedList.divider;
            obj.dividerID = feedList.divider_id;
            obj.dividerName = feedList.divider_name;
            return obj;
          });
          const page1 = feed.page;
          const count1 = feed.count;
          this.setState({
            feedList: arr1,
            count: count1,
            page: page1,
            isPersonal: 1
          });
        }
      });
    }
  }

  componentDidMount() {
    const { page, count } = this.state;
    window.addEventListener("scroll", () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        this.getFeedList(page, count);
      }
    });
  }

  getFeedList(page, count) {
    if (count / 40 > page) {
      FeedService.getFeedList(page + 1).then(feeds => {
        if (feeds) {
          const arr1 = feeds.feed_stream.map(feed1 => {
            const feedList = feed1;
            const obj = {};
            obj.uid = feedList.uid;
            obj.timeDay = feedList.time_d;
            obj.timeHour = feedList.time_s;
            obj.avatarUrl = feedList.avatar_url;
            obj.action = feedList.action;
            obj.kind = feedList.kind;
            obj.sourceID = feedList.sourceID;
            obj.divider = feedList.divider;
            obj.dividerID = feedList.divider_id;
            obj.dividerName = feedList.divider_name;
            return obj;
          });
          const page1 = feeds.page;
          const count1 = feeds.count;
          this.setState({
            feedList: arr1,
            count: count1,
            page: page1
          });
        }
      });
    }
  }

  render() {
    console.log(this.props.match);
    const { feedList, count, page, isPersonal } = this.state;
    return (
      <div className="feed">
        <div className={isPersonal ? "" : "subject"}>
          <div className="feed-list">
            {feedList.map((feed, index) => (
              <div key={feed.uid}>
                {(index === 0 ||
                  feedList[index - 1].timeDay !== feed.timeDay) && (
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
                  action={feed.action}
                  kind={feed.kind}
                  sourceID={feed.sourceID}
                  divider={feed.divider}
                  dividerID={feed.dividerID}
                  dividerName={feed.dividerName}
                />
              </div>
            ))}
          </div>
          <div className="loadMore">
            {count / 40 <= page ? "最后一页啦" : "下拉加载更多..."}
          </div>
        </div>
        <Gotop className="go-top" />
      </div>
    );
  }
}

Dynamic.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.number
    })
  })
};

Dynamic.defaultProps = {
  match: {}
};

export default Dynamic;

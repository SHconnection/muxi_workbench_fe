/* eslint-disable import/no-unresolved */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loading from "components/common/loading";
import {
  getContainerHeight,
  getScrollHeight,
  getScrollTop
} from "common/scroll";
import { Store } from "store";
import Gotop from "components/common/toTop/top";
import FeedService from "service/feed";
import ProjectService from "service/project";
import FeedItem from "./components/feedList/index";
import "static/css/common.scss";
import "./dynamic.scss";

const createweek = [
  " 周日",
  " 周一",
  " 周二",
  " 周三",
  " 周四",
  " 周五",
  " 周六"
];
let today = new Date().toLocaleDateString();
let yesterday = new Date(
  new Date().getTime() - 24 * 60 * 60 * 1000
).toLocaleDateString();
const tmp = today.split("/");
const temp = yesterday.split("/");

if (tmp[1].length !== 2) {
  tmp[1] = `0${tmp[1]}`;
}
if (tmp[2].length !== 2) {
  tmp[2] = `0${tmp[2]}`;
}
if (temp[1].length !== 2) {
  temp[1] = `0${temp[1]}`;
}
if (temp[2].length !== 2) {
  temp[2] = `0${temp[2]}`;
}

today = tmp.join("/");
yesterday = temp.join("/");

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
    const { match, storeId: userID } = this.props;
    const { pageNum, hasNext } = this.state;
    if (hasNext) {
      if (match.path === "/feed") {
        FeedService.getFeedList(pageNum + 1)
          .then(feeds => {
            if (feeds) {
              ProjectService.getAllProjectList(userID).then(res => {
                const project = res
                  .map(el => el.list)
                  .reduce((el1, el2) => el1.concat(el2), [])
                  .map(el => {
                    const item = el.projectName;
                    return item;
                  });
                const proName = feeds.dataList.map(
                  feed => feed.source.project_name
                );
                const kind = feeds.dataList.map(feed => feed.source.kind_id);
                let k = -1;
                for (let i = 0; i < proName.length; i++) {
                  if (
                    project.indexOf(proName[i]) === -1 &&
                    kind[i] !== 1 &&
                    kind[i] !== 6
                  ) {
                    k++;
                    feeds.dataList.splice(i - k, 1);
                  }
                }
                const { dataList } = this.state;
                this.setState({
                  hasNext: feeds.hasNext,
                  pageNum: feeds.pageNum,
                  dataList: dataList.concat(feeds.dataList),
                  loading: false
                });
              });
            }
          })
          .catch(error => {
            Store.dispatch({
              type: "substituteWrongInfo",
              payload: error
            });
          });
      } else {
        const { uid } = match.params;
        FeedService.getPersonalFeed(uid, pageNum + 1)
          .then(feeds => {
            if (feeds) {
              const { dataList } = this.state;
              this.setState({
                hasNext: feeds.hasNext,
                pageNum: feeds.pageNum,
                dataList: dataList.concat(feeds.dataList),
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
  }),
  storeId: PropTypes.number
};

Dynamic.defaultProps = {
  match: {},
  storeId: 0
};

const mapStateToProps = state => ({
  storeId: state.id
});

export default connect(mapStateToProps)(Dynamic);

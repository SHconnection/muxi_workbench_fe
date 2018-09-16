import React, { Component } from "react";
import FeedItem from "./components/feedList/index";
import Gotop from "../../components/common/toTop/top";
import FeedService from "../../service/feed"
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
    return timeDay.slice(-4) + createweek[new Date(timeDay).getDay()];
  }
  // create today yesterday

  constructor(props) {
    super(props);
    this.state = {
      feedList: [],
      page: 0,
      count: 0
    };
  }


  // componentWillMount(){
  //   const arr =  FeedService.getFeedList(0);
  //   this.setState({
  //     cout: arr.cout,
  //     page: arr.page,
  //     statuList: arr.statuList
  //   });
  // }

  render() {
    const { feedList, page, count} = this.state;
    return (
      <div className="feed">
        <div className="subject">
          <div className="feed-list">
            {feedList.map((feed, index) => (
              <div key={feed.id}>
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
                {/* function */}
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
          <div className="loadMore" ref="wrapper" onClick={this.getFeedList.bind(page,count)}>加载更多...</div>
        </div>
        <Gotop className="go-top" />
      </div>
    );
  }
  getFeedList(page,count){
    if(count/40 > page){
      const arr =  FeedService.getFeedList(page + 1);
      this.setState({
        page: arr.page,
        count: arr.count,
        statuList: arr.statuList
      })
    }
    else{
      return "已经到底啦"
    }
  }

  componentDidMount() {
    const wrapper = this.refs.wrapper;
    const getStatusList = this.getStatusList;
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
    window.addEventListener('scroll', function () {
      if (this.state.isLoadingMore) {
        return ;
      }

      if (timeCount) {
        clearTimeout(timeCount);
      }

      timeCount = setTimeout(callback, 50);
    }.bind(this), false);
  }
}

export default Dynamic;
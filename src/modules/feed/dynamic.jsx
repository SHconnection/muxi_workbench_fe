import React, { Component } from "react";
import PropTypes from "prop-types";
import FeedItem from "./components/feedList/index"; import Gotop from "../../components/common/toTop/top"; import FeedService from "../../service/feed";
import "../../static/css/common.css";
import "./dynamic.css";
const createweek = [ " 周⽇日",
" 周⼀一",
" 周⼆二",
" 周三", " 周四", " 周五", " 周六"
];
const today = new Date().toLocaleDateString(); const yesterday = new Date(
new Date().getTime() - 24 * 60 * 60 * 1000 ).toLocaleDateString();
class Dynamic extends Component { static chargeday(timeDay) {
if (today === timeDay) { return "今";
}
if (yesterday === timeDay) {
return "昨"; }
return timeDay.slice(-4) + createweek[new Date(timeDay).getDay()]; }
constructor(props) { super(props); this.state = {
feedList: [],
page: 0,
count: 0
// isLoadingMore: 0
}; }
componentWillMount() { const { match } = this.props; if (match.path === "/feed") {
FeedService.getFeedList(1).then(feeds => {
 if (feeds) {
const arr1 = feeds.feed_stream.map(feed1 => {
const feedList = feed1;
const obj = {};
obj.uid = feedList.uid;
obj.time_d = feedList.time_d;
obj.time_s = feedList.time_s; obj.avatar_url = feedList.avatar_url; obj.action = feedList.action;
obj.kind = feedList.kind;
obj.sourceID = feedList.sourceID; obj.divider = feedList.divider; obj.dividerID = feedList.divider_id; obj.dividerName = feedList.divider_name; return obj;
});
const page1 = feeds.page; const count1 = feeds.count; this.setState({
feedList: arr1, count: count1, page: page1
}); }
});
} else {
FeedService.getPersonalFeed(1).then(feed => { if (feed) {
const arr1 = feed.feed_stream.map(feed1 => { const feedList = feed1;
const obj = {};
obj.uid = feedList.uid;
obj.time_d = feedList.time_d;
obj.time_s = feedList.time_s; obj.avatar_url = feedList.avatar_url; obj.action = feedList.action;
obj.kind = feedList.kind;
obj.sourceID = feedList.sourceID; obj.divider = feedList.divider; obj.dividerID = feedList.divider_id; obj.dividerName = feedList.divider_name; return obj;
});
const page1 = feed.page; const count1 = feed.count; this.setState({
feedList: arr1, count: count1, page: page1

 }); }
}); }
}
componentDidMount() {
const wrapper = this.refs.wrapper;
const getFeedList = this.getFeedList(); const that = this; // 为解决不不同context的问题 let timeCount;
function callback() {
const top = wrapper.getBoundingClientRect().top; const windowHeight = window.screen.height;
if (top && top < windowHeight) {
// 当 wrapper 已经被滚动到⻚页⾯面可视范围之内触发 getFeedList(that);
} }
window.addEventListener( "scroll",
() => {
if (this.state.isLoadingMore) { return;
}
if (timeCount) { clearTimeout(timeCount);
}
timeCount = setTimeout(callback, 50); },
false );
}
getFeedList(page, count) { if (count / 40 >= page) {
FeedService.getFeedList(page + 1).then(feeds => { if (feeds) {
const arr1 = feeds.feed_stream.map(feed1 => { const feedList = feed1;
const obj = {};
obj.uid = feedList.uid;
obj.time_d = feedList.time_d; obj.time_s = feedList.time_s;

 obj.avatar_url = feedList.avatar_url; obj.action = feedList.action;
obj.kind = feedList.kind;
obj.sourceID = feedList.sourceID; obj.divider = feedList.divider; obj.dividerID = feedList.divider_id; obj.dividerName = feedList.divider_name; return obj;
});
const page1 = feeds.page; const count1 = feeds.count; this.setState({
feedList: arr1, count: count1, page: page1
}); }
}); }
}
render() {
const { feedList, page, count } = this.state; return (
<div className="feed"> <div className="subject">
<div className="feed-list"> {feedList.map((feed, index) => (
<div key={feed.id}> {(index === 0 ||
feedList[index - 1].timeDay !== feed.timeDay) && ( <div
className={
today === feed.timeDay || yesterday === feed.timeDay
? "feed-today"
: "feed-day" }
> {Dynamic.chargeday(feed.timeDay)}
</div> )}
<FeedItem timeDay={feed.timeDay} timeHour={feed.timeHour} avatarUrl={feed.avatarUrl} uid={feed.uid} action={feed.action} kind={feed.kind} sourceID={feed.sourceID}

divider={feed.divider} dividerID={feed.dividerID} dividerName={feed.dividerName}
/> </div>
))} </div> <div
className="loadMore"
ref="wrapper" onClick={this.getFeedList.bind(page, count)}
> 加载更更多...
</div>
</div>
<Gotop className="go-top" />
</div> );
} }
Dynamic.propTypes = { match: PropTypes.shape({
url: PropTypes.string })
};
Dynamic.defaultProps = { match: {}
};
export default Dynamic;